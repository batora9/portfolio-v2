---
title: Live CPS Checker
createdAt: '2018-10-14'
updatedAt: '2024-03-04'
description: '1秒間に何回クリックしているかのCPS(Clicks per Second)をリアルタイムで測定するアプリを作りました。'
image: '/images/live-cps-checker/realtimeCPS.png'
---

1秒間に何回クリックしているかのCPS(Clicks per Second)をリアルタイムで測定するアプリをC#で作りました。

# きっかけ

FPSゲームをしているときにマウスクリックの連打の速さが求められます。**既存のCPSチェッカーは10秒間のうちに何回クリックしたかの合計から平均値を求める**ことで計算をしています（その方式が多いです）

そこでMinecraftのCPS CounterのようなリアルタイムでのCPSを測定するアプリを作ってみました。  
**~~アプリを作った当時、中学生だったのでクオリティは大目に見てください~~**

# 概要

外観はこんな感じです。左上からCPS、合計クリック数、CPSハイスコアとなってます。  
名前がRealtime CPSになっているのはご愛敬…（リアルタイムは和製英語なので）

![realtimeCPS](/images/live-cps-checker/realtimeCPS.png)

ソースコードは[Github](https://github.com/batora9/realtimeCPS)から