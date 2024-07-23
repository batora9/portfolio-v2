import styles from './Skills.module.css';

export function Skills() {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Skills</p>
      <div className={styles.contents}>
        <div className={styles.langIcons}>
          <img src="/icons/html5.svg" alt="html5" className={styles.icon} />
          <img src="/icons/css3.svg" alt="css3" className={styles.icon} />
          <img src="/icons/javascript.svg" alt="javascript" className={styles.icon} />
          <img src="/icons/typescript.svg" alt="typescript" className={styles.icon} />
          <img src="/icons/c-sharp.svg" alt="cs" className={styles.icon} />
          <img src="/icons/cpp.svg" alt="cpp" className={styles.icon} />
          <img src="/icons/git.svg" alt="git" className={styles.icon} />
        </div>
        <p>
          主に、TypeScriptを使ったWebアプリケーションの開発や、C#を使ったWindowsアプリケーションの開発をしています。また、Goを使ったバックエンドやC++でアルゴリズムの勉強しています。
        </p>
      </div>
    </div>
  );
}