---
title: Windows上で簡易的にLaTeXの環境を構築する
createdAt: '2023-06-22'
updatedAt: '2024-07-11'
description: 'Windows上のVSCode環境でラクにLaTeX環境を構築できます。'
published: true
---

# はじめに

この記事は、Qiitaにも投稿している記事を転載したものです。Qiitaの記事は[こちら](https://qiita.com/batora/items/092360281e12ad828175)です。

# Windows上で簡易的にLaTeXの環境を構築する

VSCodeを用いてWindowsでLaTeXの環境構築の仕方について説明します。この記事では、LaTeXで編集したものをPDF化できるところまでを説明します。また、後述する`settings.json`や`.latexmkrc`の記述については詳しくは説明しません。（詳しく解説している記事がたくさんあるので）

## 目次

1. Visual Studio Codeの導入
2. TexLiveの導入
3. LaTeX Workshopの導入と整備
4. PDF化（ビルド）のやり方 
5. おわりに

## 1. Visual Studio Codeの導入
Visual Studio Code（以下VSCodeとします）のインストールが済んでない方は以下のサイトからインストーラーをダウンロードし指示に従ってください。
https://code.visualstudio.com/


またこちらの記事に詳しい導入方法が記載されています。

https://qiita.com/miriwo/items/306769d90d910944e471

## 2. TexLiveの導入

### インストーラのダウンロード

https://www.tug.org/texlive/acquire-netinstall.html

上のリンクから`install-ti-windows.exe`をダウンロードします。

注）安全が確認されていないという警告がでますが無視して保存してください。

![スクリーンショット 2023-06-22 133028.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3367954/43dd6044-b7e3-fbdd-915a-70be07d75e6b.png)

### インストール手順

以下の手順に従ってインストールします。

![スクリーンショット 2023-06-22 134446.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3367954/61b36a08-cd61-c7fa-a576-6a723c6cbd42.png)

`Install`を選択し`Next>`をクリック

![スクリーンショット 2023-06-22 134459.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3367954/b0c79e2a-175e-4558-6355-1977b81bb6cf.png)

`Install`をクリック

![スクリーンショット 2023-06-22 134535.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3367954/7a4eda02-cfc8-f2b1-c02e-492d371ef332.png)

ここで必要なディスク容量が7948MBと膨大な量なので必要なパッケージのみをインストールすることで軽量化します。（もちろんそのままインストールしても良いですが…）

`高度な設定`をクリック

![スクリーンショット 2023-06-22 134600.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3367954/d39d1f83-8e9e-2fc4-815b-5e23d589a64a.png)

左の`追加コレクション`の横にある`カスタマイズ`をクリック

![スクリーンショット 2023-06-22 134755.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3367954/72dd9b52-0c38-825b-f893-cbc891f0c75d.png)

上の画像のように必要な項目を選んで`OK`をクリックし`インストール`をクリック

こうすることで2435MBまで必要なディスク容量を抑えることができました。

インストール完了まで時間がかかりますが気長に待ちましょう。

## 3. LaTeX Workshopの導入と整備

### LaTeX Workshopのインストール

続いてVSCode上に拡張機能LaTeX Workshopをインストールします。

![スクリーンショット 2023-06-22 144522.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3367954/2f4af3be-2179-6fac-8165-21b2d2a9e6cd.png)

画像のようにVSCodeの左のバーの拡張機能をクリックし検索欄に「LaTeX Workshop」と検索し出てきたものをインストールしてください。（画像は既にインストールしてある状態です）

### `settings.json`の編集

VSCode上で`Ctrl`+`,`キーを押し設定を開きます。検索欄に「settings」と入力し、`settings.jsonで編集`をクリックします。

![スクリーンショット 2023-06-22 150614.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3367954/2383ef6e-2dcf-c126-8c4c-4a26e2469342.png)

`settings.json`の編集タブが開きましたら、内容を以下のように書き換え/書き加えてください。

```json:settings.json
{    
        "latex-workshop.view.pdf.viewer": "tab",
    
        "latex-workshop.latex.tools": [
            {
                "name": "latexmk",
                "command": "latexmk",
                "args":[
                    "%DOCFILE%"
                ]
              },
        ],
    
        "latex-workshop.latex.recipes": [
            {
                "name": "latexmk",
                "tools": ["latexmk"]
              },
        ],
    
        "latex-workshop.latex.autoClean.run": "onFailed",
        "settingsSync.ignoredExtensions": [
            
        ]
}
```

`settings.json`はTeXファイルをPDF化する（ビルドする）際にrecipeとtoolの設定が必要となります。詳しい説明は省略します。

### Latexmkのインストール

「TeX Live Manager」を起動します。

![スクリーンショット 2023-06-22 152241.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3367954/5c48bdbe-35a1-0d4c-4092-3a1ed1267bc7.png)

パッケージリストにある状態で「すべて」を選択し、検索欄に「latexmk」と入力します。下のリストから`latexmk`を選択し「選択項目をインストール」をクリックしてください。

Windows PowerShellで`latexmk -version`と実行し詳細が表示されましたらインストール成功です。

### `.latexmkrc`の作成

メモ帳などの適当なエディターを開き以下のコードを書き込み`.latexmkrc`というファイル名で`C:\Users\[自分のユーザー名]`の場所に保存してください。

```.latexmkrc
#!/usr/bin/env perl

# LaTeX
$latex = 'platex -synctex=1 -halt-on-error -file-line-error %O %S';
$max_repeat = 5;

# BibTeX
$bibtex = 'pbibtex %O %S';
$biber = 'biber --bblencoding=utf8 -u -U --output_safechars %O %S';

# index
$makeindex = 'mendex %O -o %D %S';

# DVI / PDF
$dvipdf = 'dvipdfmx %O -o %D %S';
$pdf_mode = 3;

# preview
$pvc_view_file_via_temporary = 0;
if ($^O eq 'linux') {
    $dvi_previewer = "xdg-open %S";
    $pdf_previewer = "xdg-open %S";
} elsif ($^O eq 'darwin') {
    $dvi_previewer = "open %S";
    $pdf_previewer = "open %S";
} else {
    $dvi_previewer = "start %S";
    $pdf_previewer = "start %S";
}

# clean up
$clean_full_ext = "%R.synctex.gz"
```

`.latexmkrc`ファイルはTeXファイルをPDF化する（ビルドする）際に2回コマンドを打たなければならない手間を解消する役割があります。

## 4. PDF化（ビルド）のやり方

適当なTeXファイルを作成・編集してください。

![スクリーンショット 2023-06-22 153315.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3367954/ffcb54ae-18ab-229d-873d-dd29456c3750.png)

VSCode上のLaTeXタブに移動し`Build LaTeX project`をクリックまたは`Ctrl`+`Alt`+`B`でビルド、`View LaTeX PDF`をクリックすると別タブでPDFファイルとして文書を見ることができます。

![スクリーンショット 2023-06-22 164104.png](https://qiita-image-store.s3.ap-northeast-1.amazonaws.com/0/3367954/3a989647-842b-8c85-82d9-28437fb47863.png)

## 5. おわりに

今回の環境構築は、初心者向けにTeXファイルのPDF化の必要最低限の設定かつ高度な設定についての解説は省略しました。自分の使用用途や授業に応じて自分なりに設定を変えてみてはいかがでしょうか。

## 参考記事

[【大学生向け】LaTeX完全導入ガイド Windows編 (2022年)](https://qiita.com/passive-radio/items/623c9a35e86b6666b89e)

[VSCode で最高の LaTeX 環境を作る](https://qiita.com/rainbartown/items/d7718f12d71e688f3573)

[Latexmkから学ぶPDF化までの処理の流れ](https://qiita.com/Rumisbern/items/d9de41823aa46d5f05a8)

[0からTeX環境を構築する](https://qiita.com/tatmius/items/f63a5c668c4a3dd60e08)

[TeX Live のクソデカ容量を削減したい！](https://blog.loliver.net/2021/11/06/texlive_minimal_install/)
