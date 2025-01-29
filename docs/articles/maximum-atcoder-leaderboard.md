---
title: Maximum AtCoder Leaderboardを作りました
createdAt: '2024-10-30'
updatedAt: '2025-01-29'
description: 'Maximum部内のatcoder月間ランキングを表示するサイトを作成しました！'
---

~~サイトは [こちら](#) から見ることができます。~~

※現在サイトに欠陥があったため非公開

**ソースコードは[GitHubリポジトリ](https://github.com/batora9/Maximum-AtCoder-Leaderboard)から見ることができます。**

--- 

![hero](/images/maximum-atcoder-leaderboard/hero.png)

# きっかけ

埼玉大学プログラミングサークル「Maximum」では、活動の1つとして競技プログラミングがあり、部内メンバーは[AtCoder](https://atcoder.jp/)のコンテストに積極的に参加しています。

そこで、メンバーにもっと競争力を持ってもらうために、部内の月間ランキングなんてあったらいいな～と思い開発に取り掛かりました。

# 技術スタック

フロントエンド
- JavaScript (React)

バックエンド
- Node.js (Hono.js)

デプロイ
- Cloudflare Pages (フロントエンド)
- Cloudflare Workers (バックエンド)

# 実装

実装方法は以下の図のようになります。どうやら[AtCoder](https://atcoder.jp)は、各ユーザーのリンクの末尾に`/history/json`を追加することで、これまでに参加したコンテストの詳細やレートの変動などの情報がjson形式で受け取ることができるので、これをプロキシサーバーを介して(CORSの都合上)fetchをすることでAPIとして過去の成績を取得することができます。

![部員のユーザー情報を取得する流れ](/images/maximum-atcoder-leaderboard/project-allview.png)

フロントエンドの処理は省きます

## エラーハンドリング

適切なリクエストを送信するために、フロントから送られてきたユーザーのリスト`users`に対してエラーハンドリングを行います。

```ts
if (!users) return c.text("Bad Request", 400);
if (!Array.isArray(users)) return c.text("Bad Request", 400);
if (!users.every((user) => typeof user === "string"))
  return c.text("Bad Request", 400);
```

- そもそも`users`がundefinedの場合
- `users`が配列ではない場合
- 要素が文字列ではない場合

このような場合には`Bad Request`を返却することにします。

## ユーザー毎にAPIを叩く

各ユーザーに対する処理の全体は以下のようになります。

```ts
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
await new Promise((resolve) => setTimeout(resolve, 1000));
}
```

各リクエストに対して1000msの遅延をしています。

### キャッシュの確認

Cloudflare Workersのキャッシュ先としてKVへの保存を選びました。詳しくは以下のサイトをご覧ください。

<https://yusukebe.com/posts/2022/dcs/>

ユーザーに対してキャッシュが存在するかをKV `USER_CACHE`を確認します。

```ts
const cache = await c.env.USER_CACHE.get(user);
```

キャッシュが存在するときは、有効期限を確認して期限内であればfetchをせずにキャッシュからデータを取ってきてそのままリスト`userData`へ挿入します。

```ts
if (cache) {
    const { data, timestamp } = JSON.parse(cache);
    if (Date.now() - timestamp < 1000 * 60 * 60) {
    userData.push(data);
    continue;
    }
}
```

### KVにキャッシュする

キャッシュが存在しない或いは有効期限が切れているときは、KVに新たにキャッシュを保存します。

```ts
await c.env.USER_CACHE.put(user, JSON.stringify({
    data,
    timestamp: Date.now(),
}));
```

このようにユーザーに対してデータとキャッシュの有効期限を持たせます。
