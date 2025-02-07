---
title: 初めてのポートフォリオサイトをフロントとバックを連携させて作ってみた
createdAt: "2024-01-16"
updatedAt: "2024-07-17"
description: "主にGoを知るきっかけになった開発。ポートフォリオサイトの作成においてバックエンドにも触れてみたいなと思ってGo言語を使ってみました。"
published: true
---

# きっかけ

サークルの先輩方が各自自分のポートフォリオサイトを持っているのを見て自分でも作りたいな～と思いました。

やりたいこととしては、

- とりあえず形にして公開する
- ドメインが欲しい！
- CSS に時間がかかるとイヤだったので Material-UI を使ってみる
- フロントエンドを React、バックエンドを Go 言語を使ってみる
- デプロイは fly.io を使ってみる
- ブログ記事をデータベースで管理してみる

といったことを考えていました。

Go 言語を使ってみたいと思った理由としては、サークル活動の講習会で Go でバックエンド開発をしてみようという講義がきっかけでした。先輩の作ってくれた講義資料は[こちら](https://blog.maximum.vc/blog/2023/webken/12/)から見ることができます。

...がしかし作ってみようとしたもののかなりの重実装になりそうだったので途中で断念しました。**やっぱりバックエンドは難しい。**

# ドメインの取得

やはり、自分のサイトを作る際にドメインがあったほうがいいなと思い、[Cloudflare Pages](https://pages.cloudflare.com/)でドメインを取得しました。年額$10.44 でした。(安い！)

> 現在は、新しいポートフォリオサイトを[batoran.com](https://batoran.com)で公開しています。動作はしませんがアーカイブは[こちら](https://my-portfolio-5zi.pages.dev/)になります。

# フロントエンド

## TypeScript

フロントエンドはコード品質の担保と開発効率の向上から TypeScript を使って開発しました。

TypeScript の存在は初めて知りました。どうやら TypeScript は JavaScript に型定義を追加したもので、型の異なる関数呼び出しや代入をコンパイル時に検出することによりプログラムの品質を高めることができるようです...メモメモ...([とほほの TypeScript 入門](https://www.tohoho-web.com/ex/typescript.html)より)

## Material-UI

デザインは、CSS に時間かけたくないという個人的な(怠惰な)理由から Material-UI を使いました。ここでも初めて UI コンポーネントライブラリを使いました。開発が楽になる一方で、デザインがほかのサイトと被ってしまったり、カスタマイズが難しかったりという問題があるなと感じました。

# バックエンド

## Go言語

Go言語を初めて開発で使いました。

実装した機能は

- ログイン機能(単一認証)
- 記事管理画面
- 記事作成画面からの記事投稿
- 記事削除機能

です。一応形にはなったけど、超最低限度の実装になってしまいました。**(まあ動くけど、見せられるものじゃないよね程度です)**

## デプロイ

自分自身、デプロイってなあに？からのスタートでした。

調べてみると、[fly.io](https://fly.io/)が無料で使えるみたいなので使ってみる。しかし、常時起動できないためサイトを公開したもののサーバーがきちんと起動してない状態になってしまいました。

# 勉強になったこと

## フロントエンドとバックエンドの連携

これも開発を進めてみて知ったことですが、クライアント側がサーバーにGETやPOSTなどのリクエストを送り、それに対しサーバーがデータを返す(レスポンス)というやり取りが行われていることを知りました。

```javascript
// 投稿を作成する関数
const createPost = async (title: string, content: string) => {
  const payload = {
    title,
    content,
  };
  const res = await fetch(import.meta.env.VITE_SERVER_URL + `/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data: Post = await res.json();
  setPosts([...posts, data]);
};
```

こんな感じでヘッダを付与してサーバーにリクエストを送り、サーバーからデータを受け取っています。

## JWTを使った認証

認証はハッシュ化したパスワードを照合する形にしました。

あとは、一定期間のログイン状態を保持したかったため、JWTを使った認証を実装しました。

```go
// ログイン処理を行うハンドラー
func loginHandler(w http.ResponseWriter, r *http.Request) {
    var loginRequest LoginRequest
    err := json.NewDecoder(r.Body).Decode(&loginRequest)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    user, exists := authenticatedUsers[loginRequest.Username]
    if !exists {
        http.Error(w, "Invalid credentials", http.StatusUnauthorized)
        return
    }

    err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(loginRequest.Password))
    if err != nil {
        http.Error(w, "Invalid credentials", http.StatusUnauthorized)
        return
    }

    // ログイン成功時の処理
    // 適切な認証トークンやセッションを生成し、フロントエンドに返す
    // 例えば、JWT (JSON Web Token) を使用するなど
    jwtSecret := os.Getenv("JWT_SECRET")
    jwtToken := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "username": user.Username,
    })
    token, err := jwtToken.SignedString([]byte(jwtSecret))
    if err != nil {
        http.Error(w, "Failed to generate token", http.StatusInternalServerError)
        return
    }

    response := map[string]string{"token": token}
    jsonResponse, _ := json.Marshal(response)
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusOK)
    w.Write(jsonResponse)
}
```

とにかく調べていろいろなサイトを頼りに実装しました...

## データベース

ブログ記事をデータベースで管理するために、SQLite3 を使いました。SQLite3を単体で操作したことはあるものの、Go言語との連携は初めてでした。

```go
const (
  // データベースのファイル名
  dbFileName = "database.db"

  // Postテーブルの作成を行うSQL文
  // IF NOT EXISTSをつけることで、既にテーブルが存在していた場合は作成しない
  createPostTable = `
	  CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
	  )
  `

  // 投稿の作成を行うSQL文
  insertPost = "INSERT INTO posts (title, content, created_at) VALUES (?, ?, ?)"

  // 投稿の取得を行うSQL文
  selectPosts = "SELECT * FROM posts ORDER BY created_at DESC"
)

func init() {
  // データベースとの接続
  db, err := sql.Open("sqlite3", dbFileName)
  if err != nil {
	panic(err) // もし接続に失敗したら、プログラムを強制終了する
  }

  // データベースの接続を閉じる(init()が終了したら閉じる)
  defer db.Close()

  // テーブルの作成
  _, err = db.Exec(createPostTable)
  if err != nil {
	panic(err)
  }
}
```

# まとめ

主にバックエンドの開発について学ぶことができました。認証、データベース、CORSの実装などバックエンドならではの分野を学ぶことができました。

記事の作成から一覧表示、削除までの機能ができただけでも苦労しました。おそらく、最初から目標を高く設定しすぎたのではないかと思います。

まだまだ実力不足・理解不足であるので、今後もっと知識を深め改良できたらいいなと思います。
