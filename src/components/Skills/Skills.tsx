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
          <img src="/icons/go.png" alt="go" className={styles.icon} />
          <img src="/icons/c-sharp.svg" alt="cs" className={styles.icon} />
          <img src="/icons/cpp.svg" alt="cpp" className={styles.icon} />
          <img src="/icons/git.svg" alt="git" className={styles.icon} />
        </div>
        <p>
          主にReactを用いたフロントエンドの開発を得意としています。バックエンドは個人開発でGoを使用した経験があります。(Web開発が中心)
        </p>
        <p>
          サークル活動を通して、競技プログラミング(Algorithms)に取り組んだりメンバーとGitHubを用いた共同開発を行うなど、チーム開発においても経験を積んでいます。
          気まぐれにC#でアプリケーションを作ったり、セキュリティ分野に手を出してみたりしています。
        </p>
      </div>
    </div>
  );
}