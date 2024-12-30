---
title: プロキシサーバー経由でOGPを取得してブログサイトで表示する
createdAt: "2024-12-28"
updatedAt: "2024-12-31"
description: "自作OGP Fetcherを使ってOGPを取得し、Next.jsでMarkdownからHTMLに変換して表示する際にコンポーネントとして使う方法を紹介します。"
---

# やりたいこと

Next.jsでMarkdown to HTMLブログを作っていると、Markdownでリンクを貼る時に`a`タグとして表示されます。これを、下の画像のようにOGPを取得して表示したいと思いました。

![OGPを取得してコンポーネントで表示する例](/images/ogp-fetcher/ogp-example.png)

# OGPを取得する

まず考えたのは、MarkdownからHTMLに変換する際に、自動でOGPを取得してLinkCardとして表示してくれるようなプラグインがあればいいなと思いました。

<https://github.com/gladevise/remark-link-card>

今回これは使わずに、自作したカードコンポーネントを使ってサイト情報を表示しようと思います。

## プロキシサーバーを作る

外部サイトからmeta情報を取得するためにプロキシサーバーを作ります。ブログサイトと外部サイトの中間にプロキシサーバーを挟むことで、CORSの問題を解決します。

構成は以下の図のようになります。

![OGPを取得してコンポーネントで表示する例](/images/ogp-fetcher/mermaid-ogp-fetcher.svg)

コードの全体像は以下の通りです。

```typescript
// Get the URL from the query string
const url = c.req.query("url");

// Check if the URL is provided
if (!url) {
return c.text("Bad Request: URL is required", 400);
}

try {
const response = await fetch(url);
if (!response.ok) {
    return c.text("Bad Request: Invalid URL", 400);
}

const meta = await response.text();

// Extract the favicon, description, and title from the HTML
const faviconMatch = meta.match(/<link rel="icon" href="(.*?)"/);
const descriptionMatch = meta.match(/<meta name="description" content="(.*?)"/);
const titleMatch = meta.match(/<title>(.*)<\/title>/);
const imageMatch = meta.match(/<meta property="og:image" content="(.*?)"/);

// Get the base URL
const baseUrl = new URL(url);
const faviconUrl = faviconMatch ? new URL(faviconMatch[1], baseUrl).toString() : null;
const imageUrl = imageMatch ? new URL(imageMatch[1], baseUrl).toString() : null;

const result = {
    title: titleMatch ? titleMatch[1] : null,
    description: descriptionMatch ? descriptionMatch[1] : null,
    favicon: faviconUrl,
    image: imageUrl,
};

return c.json(result);
} catch (error) {
console.error("Error fetching URL:", error);
return c.text("Internal Server Error", 500);
}
```

やっていることとしては単純で、指定したURLのサイトからHTMLを取得、metaタグからOGP情報(title, description, favicon, image)を取得してjson形式で返却をしています。

```typescript
// Extract the favicon, description, and title from the HTML
const faviconMatch = meta.match(/<link rel="icon" href="(.*?)"/);
const descriptionMatch = meta.match(/<meta name="description" content="(.*?)"/);
const titleMatch = meta.match(/<title>(.*)<\/title>/);
const imageMatch = meta.match(/<meta property="og:image" content="(.*?)"/);
```

実際にアクセスしてみると、

```json
{
    "title": "ばとらの部屋",
    "description": "ばとらのポートフォリオサイト",
    "favicon": "https://batoran.com/favicon.ico",
    "image": null
}
```

このようにOGP情報を取得できました。

あとは、ブログサイトで自作コンポーネントを使ってOGP情報を表示するだけです。

# 自作コンポーネントでOGPを表示する

自作した`MediaCard`コンポーネントのコードは省略()

このブログサイトはMarkdownをHTMLに変換する際に`unified`の`remark`, `rehype`を使っています。

<https://unifiedjs.com/>

1. `reamark`**でMarkdownをmdast(Mardown抽象構文木)に変換**

(例：`table`や`code`ブロックの変換など)

2. `rehype`**でmdastをhast(HTML抽象構文木)に変換**

(例：`math`ブロックをkatex.jsに対応、見出しにidを付与し目次を作るなど)

3. `Stringify`**でhastをHTML(文字列)に変換**

といったように、MarkdownからHTMLに変換する際にスタイルを適用したい場合や、カスタムプラグインを作りたい場合は、どの段階で処理をするかを考える必要があります。

今回は、`<a>`タグを`<MediaCard>`コンポーネントに変換するために、HTMLをReactに変換できる`rehypeReact`を使います。

```tsx
.use(rehypeReact, {
    Fragment,
    components: {
    a: MediaCard, // <a>タグを<MediaCard>コンポーネントに変換
    },
    createElement,
})
```

これでOKかと思いきや正常に動作しませんでした。理由は、**`<a>`タグが`<p>`タグでラップされている**ため`<p>`タグとして認識してしまっているからです。

![pタグがaタグをラップしている](/images/ogp-fetcher/a-tag.png)

この問題を解決するために、`Paragraph`コンポーネントを新たに作成し、`<p>`タグの内部に`<a>`タグがあるかどうかを判定して`<MediaCard>`コンポーネントに変換するようにしました。

```tsx
import { ReactNode, isValidElement } from 'react';
import { MediaCard } from '@/components/MediaCard';

interface Props {
  children: ReactNode;
}

export const Paragraph = ({ children }: Props) => {
  if (isValidElement(children) && children.type === 'a') {
    // もしpタグchildの要素がaタグで、かつ子要素が1つだけの場合
    // (リスト内のリンクの場合は除外)
    return <MediaCard href={children.props.href} style='left' />;
  }

  return <p>{children}</p>;
};
```

これを`rehypeReact`に適応して完成です。

```tsx
.use(rehypeReact, {
    jsx,
    jsxs,
    Fragment: React.Fragment,
    createElement: React.createElement,
    components: {
    p: Paragraph,
    },
} as any)
```

これで、Markdown内のリンクを`<MediaCard>`コンポーネントに変換してOGP情報を表示することができました。

<https://batoran.com>

---

<http://maximum.vc>

---

というわけでプロキシサーバーを経由してOGPを取得・表示する方法を紹介しました。metaデータからOGP画像を取得するコードはまだ改善が必要であり、画像を取得できない場合もあります。改良ができ次第記事を更新しようと思います。
