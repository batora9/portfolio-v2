---
title: ISUCON14に参加しました(batora視点)
createdAt: "2024-12-08"
updatedAt: "2024-12-09"
description: "初めてISUCONに参加しました。当日の様子や感想をまとめました。"
---

# ISUCON14に参加しました

今回、初めてISUCONに参加しました。チーム名は「Maxipus」で、サークルメンバーの[yukikamome316](http://github.com/yukikamome316)と、[nakamuraitsuki](https://github.com/nakamuraitsuki)と共に参加しました。

プログラミングサークル「Maximum」からは、他にも「Maxif.」「Maximum-Y.N.K.S」が参加しました。

# 対策

過去のISUCONの問題を題材にして、Maximumサークル内で部内練習会を数回行いました。サークル内で得点の計測用レンタルサーバーを用意し、ベンチマーク測定&部内のLeaderboardを用いて本番形式で行いました。

こんな感じ↓

![isucon practice](/images/isucon14/practice.png)

私は、Goを使ったバックエンドの開発は少ししか経験がなく、インフラ周りの知識もない状態からのスタートでした。部内練習会を通して、pprofを使ったり、スロークエリログを取って問題のあるクエリを見つけ、インデックスを張ったり、N+1問題を解消したりバルクインサートを使ったりと、いろいろな対策を学びました。

# 当日

当日は私の家に集合し、3人でパソコンを広げて準備をしました。私とnakamuraitsukiが初参加だったこともあり、本番で何かあったときにすぐに話し合って対応できるように対面で作業することにしました。

ライブ配信を見て、出題内容をチェック！

https://youtu.be/UFlcAUvWvrY?si=dySfPFYmOh55Vaam

ISURIDE...面白そう！ワクワクといった感じでした(笑)

## 競技開始 ~ 11:30

まずは、競技開始と共に全員がssh接続できることを確認！(←まずここからです)

私はまず簡単そうなデバックモード無効化に取り掛かろうとしたものの...無えなぁ

nakamuraitsukiがpprofを導入し、ベンチマークを取って遅そうなところを探しました。

足早にyukikamome316がスロークエリにインデックスを張り、私はコードを眺めながら怪しそうなところを探しました。

**得点:910→2922**

## 11:30 ~ 13:30

yukikamome316が`getChairStatus`のN+1を解消に取り掛りました。

その間にスロークエリログから`ownerGetChairs`関数内のクソデカクエリが遅いことが分かり取り掛かりました。改善策が分からずGPTに投げたが、それでも点数は伸びず断念。

次に、遅そうな`chairGetNotification`関数を見るとインデックスが張られているにもかかわらず遅いことがわかりました。nakamuraitsukiとクエリを一つ一つ眺めましたが、なぜ遅いのかが分かりませんでした。そこで、`SELECT * FROM users WHERE id = ? FOR SHARE`から共有ロックがかけられていることでトランザクションの待ち時間による遅延が発生しているのではないかと考え一旦消してみましたが、結局点数は伸びず断念。

**得点:2922→3050**

## 13:30 ~ 14:30

yukikamome316がサーバー分割を行おうと試みるもうまくいかず停滞。

## 14:30 ~ 15:30

やはり`chairGetNotification`が遅く、`ride_statuses`を取得するのに冗長なクエリがあるように見え、テーブルの結合などを試みましたが、結局点数は伸びず。

```go
// rides と ride_statuses を結合して最新の状態を取得
query := `
    SELECT rs.id, rs.ride_id, rs.status
    FROM rides AS r
    INNER JOIN ride_statuses AS rs ON r.id = rs.ride_id
    WHERE r.chair_id = ? AND rs.chair_sent_at IS NULL
    ORDER BY rs.created_at ASC
    LIMIT 1;
`
```

しかし、yukikamome316が`chairs`テーブルの複合インデックスの順序を変更、`rides`にカバリングインデックスを貼ったことで点数が伸びました。

**得点:3050→3244**

## 16:00 ~ 17:00

nakamuraitsukiとコードをひたすら眺めていると、各クエリ自体は遅くないが別の関数から多く呼ばれていることで全体として遅くなっているのでは？と考え、キャッシュ化をしようと思いました。

手始めに`chairAuthMiddleware`で`access_token`, `user`を`map`で保持するようにキャッシュ化してみました。

```go
var appUserCache = cache.NewWriteHeavyCache[string, *User]() // キャッシュをグローバルで共有

// ミドルウェア関数の修正
func appAuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		c, err := r.Cookie("app_session")

		if errors.Is(err, http.ErrNoCookie) || c.Value == "" {
			writeError(w, http.StatusUnauthorized, errors.New("app_session cookie is required"))
			return
		}

		// Cookieの値を取得
		accessToken := c.Value

		// キャッシュからユーザー情報を取得
		user, found := appUserCache.Get(accessToken)
		if !found {
			// キャッシュにデータがなければデータベースから取得
			user = &User{}
			err = db.GetContext(ctx, user, "SELECT * FROM users WHERE access_token = ?", accessToken)
			if err != nil {
				if errors.Is(err, sql.ErrNoRows) {
					writeError(w, http.StatusUnauthorized, errors.New("invalid access token"))
					return
				}
				writeError(w, http.StatusInternalServerError, err)
				return
			}

			// キャッシュに保存（TTLは設定しない）
			appUserCache.Set(accessToken, user)
		}

		// コンテキストにユーザー情報を設定
		ctx = context.WithValue(ctx, "user", user)
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
```

この実装を`chairAuthMiddleware`にも適応して測定したところ、得点が伸びました！

**得点:3244→4027**

## 17:00 ~ 18:00

あれこれ細かいことを試してみようと思うが、残り時間が少なく実装→ベンチ測定までできない可能性があるためログ消しに移行。

ログを消したが何故か点数が伸びなかった...しまいには3000点台に戻ってしまった。

結局最後のベンチマーク測定では得点が**3546点で終了**しました。

## 結果

20時でのライブ配信による結果発表で、同サークルの「Maxif.」が総合29位で入賞！となりましたが、Maxipusは21時ごろに公開された順位では**総合423位、学生順位50位**という結果でした。

この順位は、レギュレーション違反による順位の変動前の結果なので目安といった感じです。

![result](/images/isucon14/result.png)

# 感想

初めてのISUCONでしたが、とても楽しかったです。