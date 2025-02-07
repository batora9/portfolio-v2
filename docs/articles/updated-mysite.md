---
title: ポートフォリオサイトをリニューアルしました！
createdAt: '2024-07-16'
updatedAt: '2024-07-16'
description: 'Next.jsとCloudflare Pagesを使ってポートフォリオサイトをリニューアルしました'
published: true
---

# 経緯

以前まで使っていたポートフォリオサイトは、[https://old.batoran.com](https://old.batoran.com)へ移行し、リニューアルしました。以前までのサイトは、Next.js + Tailwind CSSで構築していました。Tailwind CSSを使うよりも素のCSSを書いた方がこれから個人開発やインターンなどで活きていくと思ったことと、単純にデザインを根本から変えたかったので、リニューアルしました。

# 技術スタック

- Next.js (React)
- TypeScript
- CSS
- Cloudflare Pages (Hosting)

## 選定理由

Next.jsを使うことでSSGやSSRのサイトを構築できるためや、Defining Routesを使うことで簡単にルーティングを設定できるためNext.jsを選びました。TypeScriptを選んだのは、なんとな～く選びました(雑)

今までにCSSを書いたことがそれほどなかったので、慣れるためにCSSを書いてみようと思いました。デザインは自分の想像通りのものになったため、かなり気に入っています。

# 機能

## Markdownファイルで記事を管理できる

1つ1つの記事はMarkdownファイルで管理されています。これは、Remark,Rehypeを使うことでMarkdownファイルをHTMLに変換しています。

## シンタックスハイライト

Rehype Pretty Codeを使うことでシンタックスハイライトを実装しました。

`Hello, World!`と表示するコード:
```js
const greeting = 'Hello, World!';

console.log(greeting);
```

## 動きのあるUI

CSSに慣れるために、各種コンポーネントにアニメーションを追加しました。

# 今後の課題

今後の課題として、

- 一部コンポーネントやページのモバイル対応をする
- CSSのコードをリファクタリングする
- タグ機能を追加する
- パンくずリストを追加する
- **ブログ記事を積極的に書いていく**

などなど...まだまだやることがいっぱいといったところです。
