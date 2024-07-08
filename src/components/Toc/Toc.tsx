"use client";
import React, { useEffect } from "react";
import tocbot from "tocbot";
import styles from "./Toc.module.css";


export function Toc() {
  useEffect(() => {
    // Tocbotの初期化
    tocbot.init({
      tocSelector: ".toc", // 目次の表示部分のクラス
      contentSelector: ".post", // 目次を生成する対象のクラス
      headingSelector: "h2, h3", // 目次に表示する見出しのタグ
    });

    // コンポーネントがアンマウントされたときにTocbotを破棄
    return () => tocbot.destroy();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>ToC</h2>
      <div className={styles.toc}>{/* 目次の表示部分 */}</div>
    </div>
  );
}
