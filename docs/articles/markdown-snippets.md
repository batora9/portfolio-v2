---
title: "VSCode上でMarkdown用のスニペットを作る"
createdAt: "2024-03-05"
updatedAt: "2024-03-05"
description: "Visual Studio CodeでMarkdown形式のファイルでスニペットを使えるようにする"
image: "./frames/frame.png"
---

# きっかけ

ブログをMarkdownで書くようになってからVSCode上でMarkdownを編集することが多くなりました。Markdown記事を書くにあたって下のようなタイトルや記事作成日などのデータを書きます。
![Markdownデータ](/images/markdown-1.png)
このデータは記事を作るときに毎回書くため、スニペット（コードのかたまり）を使って一発で入力できるようにしようということです。

# setting.jsonを編集する

VScodeのユーザー設定ファイル(`setting.json`)を編集します。ファイルの場所はVSCodeがインストールされているOSごとに下記のディレクトリに保存されています。（ファイルがない場合は作成してください）

|OS|ファイルパス|
|---|---|
|Windows|`%APPDATA%\Code\User\settings.json`|
|macOS|`$HOME/Library/Application Support/Code/User/settings.json`|
|Linux|`$HOME/.config/Code/User/settings.json`|

### Markdown用のスニペットを作成できるようにする
`setting.json`ファイルに以下のコードを追記してください。

```bash
  "[markdown]": {
    "editor.quickSuggestions": {
      "other": true,
      "comments": false,
      "strings": true
    },
  },
```

# ユーザースニペットを作成する

### スニペットファイルの作成
VSCode上の歯車からユーザースニペットを選択します。  
`ユーザースニペット` > `新しいグローバルスニペットファイル...`を選択します。
![ユーザースニペット作成](/images/markdown-2.png)
スニペットファイル名の入力欄がでたら`(任意の名前).code-snippets`というファイル名を作成します。  
今回は、`markdown.vscode-snippets.code-snippets`という名前で作成しました。
![ユーザースニペット作成](/images/markdown-3.png)
※このファイルはMarkdown以外の様々な言語に対してのユーザースニペットを作成することができます

### スニペットファイルの編集
各自の用途に合わせてスニペットを設定してください。スニペットの書き方は[VS Codeのユーザースニペット機能の使い方メモ](https://qiita.com/12345/items/97ba616d530b4f692c97#%E3%82%B9%E3%83%8B%E3%83%9A%E3%83%83%E3%83%88%E3%81%AE%E5%AE%9A%E7%BE%A9%E3%81%AE%E4%BB%95%E6%96%B9)を参照してみてください。  
また、スニペットに関しては以下の公式のドキュメントを参照してください。  
https://code.visualstudio.com/docs/editor/userdefinedsnippets  
私は、以下のように編集しました。
```bash
{
	"date": {
		"prefix": "date",
		"body": [
			"---",
			"title: \"$1\"",
			"createdAt: \"$2\"",
			"updatedAt: \"$2\"",
			"description: \"$3\"",
			"published: true",
			"---",
		],
		"description": "Insert date"
	},
}
```
このように正常に追加されました。
![ユーザースニペット作成](/images/markdown-4.png)
あとはMarkdownファイル上で、登録したprefixを入力するとコードを一発で書くことができます！
![ユーザースニペット](/images/markdown-5.png)
↓↓↓
![ユーザースニペット](/images/markdown-6.png)