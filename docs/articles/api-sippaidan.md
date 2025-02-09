---
title: 不本意ながらDoS攻撃をしてしまった失敗談
createdAt: '2025-02-09'
updatedAt: '2025-02-09'
description: 'AtCoder Leaderboardを作ったときにAPIの取扱いに失敗した話'
published: true
---

## はじめに

**この記事は特にWebプログラミング始めたての初心者向けで、私を反面教師としてください**

~~Web上級者の方はコイツバカだなぁと笑って見過ごしてください...(泣~~

私が所属する大学のサークルでは、[AtCoder](https://atcoder.jp)といういわゆる競技プログラミングのコンテストに参加することを活動の一つとしています。

そこで、サークルメンバー(以下部員とする)がより一層切磋琢磨してレートを上げてモチベーションに繋げてほしいな～と思い、そうだ！毎回のコンテストの結果から順位表を作ってみんなに見れる形にしよう！ということで[AtCoder Leaderboard](./maximum-atcoder-leaderboard)を作ろうと計画しました。

しかし、最終的には残念な結果になります

# AtCoderのAPIを取得したい

AtCoderでは公式ではないものの、コンテストページやプロフィールページでURLの末尾に`/json`と追加すると、該当ページのデータをjson形式のファイルで取得することができます。

![](https://storage.googleapis.com/zenn-user-upload/89a558507e40-20250209.png)

何も考えずに、これいいじゃん！と思ってここからAPIを取得する意向を決めました。

# 実装

まずは簡単にシーケンス図で説明をします。今回、APIをFetchする際にCORSの問題が生じてしまい面倒なので自分でプロキシサーバーを立てて仲介するような感じで行います。

![部員のユーザー情報を取得する流れ](/images/maximum-atcoder-leaderboard/project-allview.png)

今回は[Hono](https://hono.dev/)というWebフレームワークを使用し、[Cloudflare Workers](https://www.cloudflare.com/ja-jp/developer-platform/products/workers/)へデプロイをします。

これを踏まえて、コーディングをします。

```ts
app.post("/api/atcoder/users", async (c) => {
  const users = await c.req.json();
  if (!users) return c.text("Bad Request", 400);
  if (!Array.isArray(users)) return c.text("Bad Request", 400);
  if (!users.every((user) => typeof user === "string"))
    return c.text("Bad Request", 400);
  const userData = [];
  for (const user of users) {
    const cache = await c.env.USER_CACHE.get(user);
    if (cache) {
      const { data, timestamp } = JSON.parse(cache);
      if (Date.now() - timestamp < 1000 * 60 * 60) {
        userData.push(data);
        continue;
      }
    }
    const res = await fetch(`https://atcoder.jp/users/${user}/history/json`);
    const data = await res.json();
    userData.push(data);
    await c.env.USER_CACHE.put(user, JSON.stringify({
      data,
      timestamp: Date.now(),
    }));
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  return c.json(userData);
});
```

やっていることとしては、`/api/atcoder/users`というエンドポイントを作成し、フロントエンドから送られてきた部員のリストを1件ずつ`atcoder.jp`へfetchします。

アクセス毎に数十人のリクエストを送っているとフロントエンドでの表示に時間がかかってしまうため、キャッシュを行います。

Cloudflare Workersには[KV](https://developers.cloudflare.com/kv/)というアプリケーションデータをCloudflare上に保存することができるサービスがあるのでそれを使います。

無事プロジェクトを作り終え、サイトを公開しました。

# 事件発生

ある日、サイトを見に行くと順位表が表示されませんでした。なにか仕様が変わったのかなと思いコードを見直したり、Postmanを使って通信の内容を確認しました。

エラーを見た感じどうやらAPIの取得がうまくいっていない...

しかし、ローカルで動かすとちゃんと取得ができている...何故だ？

![](https://storage.googleapis.com/zenn-user-upload/dbc7767fdbbb-20250209.png)

プロキシサーバーからアクセスするとこうなる

![](https://storage.googleapis.com/zenn-user-upload/659cb5bc79d7-20250209.png)

KVのログも見てみると同じようなメッセージ

![](https://storage.googleapis.com/zenn-user-upload/3c7262cbbf73-20250128.png)

よく読んでみると

```plaintext
Request blocked. We can't connect to the server for this app or website at this time. There might be too much traffic or a configuration error. Try again later, or contact the app or website owner.
```

簡単にいうと、**アクセスが多すぎてお前のリクエストはブロックされたよ**って言われてます。

AtCoderのサイトにDos攻撃をしてしまいIPBANされてブラックリスト入りということになります。猛省。

# なにがいけなかったか

私はDoS/DDoS攻撃が知らないエンジニアというわけではありません。あくまで知識としては知ってました。

まあ実際、アクセス拒否食らってるから知ったかぶりをしてたようなもんですが...

### ソースコードの問題

ソースコードを見て気づいた方もいると思いますが問題はここです。

```ts
await new Promise((resolve) => setTimeout(resolve, 300));
```

はい。今思えばこれは良くない。

リクエストの間隔が300msつまり0.3秒に1回のリクエストが送られることになります。

テストの段階で2、3人のデータで行っている分には問題ないと思いますが、実際には30人近くの部員を0.3秒間隔でリクエストを送っていました。**普通に考えてリロードボタンを1秒に3回押しているようなものです！**

ここで少し言い訳タイム。
DoS攻撃ってもっと1秒間に何十回もリクエストを送るものだと思っていたため、こんなもんじゃDoS攻撃にならないでしょと油断していた自分がいました。

## キャッシュの問題

キャッシュにも問題があります。

```ts
if (Date.now() - timestamp < 1000 * 60 * 60) {
  userData.push(data);
  continue;
}
```

AtCoderのコンテストは毎週土曜日に行われるので少なくとも週に1回の更新で済みます。ですが、キャッシュの有効期限を1時間に設定してしまうのもよくありません。

またキャッシュのやりかたも改善できます。

例えば
- アクセスがない時も毎分1人のデータを取得してキャッシュする
- リクエスト間隔を長くし取得できたユーザーから順にフロントエンドで表示させる

などなど？つまりは**一度に大量のアクセスをしないようにする**ということです。（当然）

## APIの仕様の問題

APIの仕様の問題と書きましたが、これは単に非公式のAPIを使ってしまったということです。

事実上AtCoder様からブロックされてしまいましたが、もしこれが公式のAPIで利用規約をちゃんと読み**APIの取得は何件までですよ～** とか記載されていたらちゃんと読んで従うようにしましょう。

また、AtCoderに限った話だと[AtCoder Problems](https://kenkoooo.com/atcoder/#/table/)というサイトがあり、ここでは[APIの仕様書](https://github.com/kenkoooo/AtCoderProblems/blob/master/doc/api.md)も記載されています。なのでもしAtCoderのAPIを使いたい場合はこちらを使うことをお勧めします。

# さいごに

APIは非常に便利ですが、個人でWeb開発を行う際はAPIの使い方に十分気を付けてください。