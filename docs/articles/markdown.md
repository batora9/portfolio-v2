---
title: ブログで使うMarkdown記法まとめ
createdAt: '2023-01-05'
updatedAt: '2024-07-10'
description: 'batoran.comで今後使う/使いたいMarkdown記法をまとめました'
published: true
---

> 一部CSSで未実装な部分もあります(今後実装予定WIP)

# Markdown記法まとめ

## 見出し
入力例
```text
# 見出し1です
## 見出し2です
### 見出し3です
#### 見出し4です
```

実行結果
# 見出し1です
## 見出し2です
### 見出し3です
#### 見出し4です

## 太字・斜体・訂正線
入力例
```text
これは **太字** です。
これは __太字__ です。
これは *斜体* です。
これは _斜体_ です。
これは ~~訂正線~~です。
```

実行結果
これは **太字** です。
これは __太字__ です。
これは *斜体* です。
これは _斜体_ です。
これは ~~訂正線~~です。

## リンク

タイトルはリンク上にマウスホバーすることで表示される
入力例
```text
[GitHub](https://github.com "タイトル")
```
実行結果<br>
[GitHub](https://github.com "タイトル")

## 引用

入力例
```text
> これは引用です。
> これは引用です。これは引用です。
```

実行結果
> これは引用です。
> これは引用です。これは引用です。

## コードブロック

入力例
~~~text
```c
 void hello()
  {
      console.log("Hello World!");
  }
```
~~~

実行結果
```c
 void hello()
  {
      console.log("Hello World!");
  }
```

`diff_`とつけることでコードの比較ができる
入力例
~~~text
```diff_c
  - console.log("Hello");
  + console.log("World!");
```
~~~

実行結果
```diff_c
  - console.log("Hello");
  + console.log("World!");
```
## インラインコード

入力例
```これは `code` です```

実行結果
これは `code` です

## テキストカラー

入力例
```これは<span style="color: red; ">赤文字</span>です```

実行結果
これは<span style="color: red; ">赤文字</span>です

## チェックリスト

入力例
```text
- [ ] これからやるタスク
- [x] 完了したタスク
```

実行結果
- [ ] これからやるタスク
- [x] 完了したタスク

## 箇条書き

入力例
```text
- リスト１
- リスト２

または

* リスト１
* リスト２
```

実行結果
- リスト１
- リスト２

または

* リスト１
* リスト２

## 番号付きリスト
同じ数字でも自動的に番号付けされる

入力例
```text
1. 番号リストA
1. 番号リストB
  1. 番号リストB-1
  1. 番号リストB-2
1. 番号リストC
```

実行結果
1. 番号リストA
1. 番号リストB
  1. 番号リストB-1
  1. 番号リストB-2
1. 番号リストC

## 折りたたみ

入力例
```text
<details><summary>サンプルコード</summary>

```rb
puts 'Hello, World'
```
</details>
```

実行結果
<details><summary>サンプルコード</summary>

```rb
puts 'Hello, World'
```
</details>

## TeX
x^2 + y^2 = 1 をインライン表示すると $x^2 + y^2 = 1$ になります。

$$ S=\sum_{n=1}^\infty a_n $$

$$\frac{1}{2} $$

## 注釈

入力例
```text
テキスト[^1]
[^1]: 注釈の内容
```

実行結果
テキスト[^1]
[^1]: 注釈の内容

## テーブル

入力例
```text
|  TH  |  TH  |
| ---- | ---- |
|  TD  |  TD  |
|  TD  |  TD  |
```

実行結果
|  TH  |  TH  |
| ---- | ---- |
|  TD  |  TD  |
|  TD  |  TD  |


## 水平線

入力例
```text
***

*****

---

-------

_ _ _
```

実行結果
***

*****

---

-------

_ _ _

## ダイアグラム

入力例　実行結果
![サンプル](https://wp.notepm.jp/wp-content/uploads/2019/03/plantuml-sample1.png)

使用例： [PlantUMLサンプル集](https://real-world-plantuml.com/)