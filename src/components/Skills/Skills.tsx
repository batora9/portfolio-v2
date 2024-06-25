import styles from './page.module.css';

export function Skills() {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Skills</p>
      <div className={styles.contents}>
        主に、TypeScriptを使ったWebアプリケーションの開発や、C#を使ったWindowsアプリケーションの開発をしています。また、Goを使ったバックエンドやC++でアルゴリズムの勉強しています。
      </div>
    </div>
  );
}