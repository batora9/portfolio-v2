---
title: OGP Fetcherをアップデートした話
createdAt: '2025-02-10'
updatedAt: '2025-02-10'
description: '以前作ったOGP取得サーバーを改良したので報告です'
published: true
---

# 以前の問題点

最初に作ったOGP Fetcherにはタイトルやサムネイル画像がうまく取得できない問題がありました。詳しいコードは[こちら](./ogp-fetcher)をご覧ください。

![以前のOGPFetcherの問題点](/images/update-ogp-fetcher/old-fetcher-problem.png)

私による脳筋metaタグ抽出の力では、解決できなかったのでcheerioというライブラリを使ってみることにしました。

<https://www.npmjs.com/package/cheerio/v/1.0.0-rc.3>

# cheerioを使ってみる

ドキュメントを読むと使い方が記載されていたので読みます。

```js
// ESM or TypeScript:
import * as cheerio from 'cheerio';

// In other environments:
const cheerio = require('cheerio');

const $ = cheerio.load('<ul id="fruits">...</ul>');

$.html();
//=> <html><head></head><body><ul id="fruits">...</ul></body></html>
```

> First you need to load in the HTML. This step in jQuery is implicit, since jQuery operates on the one, baked-in DOM. With Cheerio, we need to pass in the HTML document.

とのことなので、HTMLを読み込ませます。

```ts
const $ = cheerio.load(meta);
```

> Gets the attribute value for only the first element in the matched set. If you set an attribute's value to , you remove that attribute.

どうやら`.attr( name, value )`という書き方で、属性から値が取り出せるそうなので書いてみる。

```ts
const ogTitle = $('meta[property="og:title"]').attr("content");
const ogDescription = $('meta[property="og:description"]').attr("content");
const ogFavicon = $('link[rel="icon"]').attr("href");
const ogImage = $('meta[property="og:image"]').attr("content");
```

あとはcheerioだけではちゃんと取得できてるか心配なので、これまでの脳筋metaタグ抽出法?と組み合わせてどちらかがOGPを取得できるようにしておきます。つまり二重チェックみたいなことです。

このままでは例えばfaviconやOGP画像を取得した際に`./favicon`のように相対パスで取得されてしまうので、

```ts
// ogFaviconがhttpから始まっていない場合、urlを付与する
if (ogFavicon && !ogFavicon.match(/^http/)) {
    ogFavicon = url + ogFavicon;
}

// ogImageがhttpから始まっていない場合、urlを付与する
if (ogImage && !ogImage.match(/^http/)) {
    ogImage = url + ogImage;
}

const result = {
    title: ogTitle || (titleMatch ? titleMatch[1] : null),
    description: ogDescription || (descriptionMatch ? descriptionMatch[1] : null),
    favicon: ogFavicon || (faviconMatch ? url + faviconMatch[1] : null),
    image: ogImage || (imageMatch ? url + imageMatch[1] : null)
};
```

こうすると絶対パスとして取得できそう。

