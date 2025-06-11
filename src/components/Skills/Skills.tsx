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
          <img src="/icons/c.png" alt="cs" className={styles.icon} />
          <img src="/icons/c-sharp.svg" alt="cs" className={styles.icon} />
          <img src="/icons/cpp.svg" alt="cpp" className={styles.icon} />
          <img src="/icons/git.svg" alt="git" className={styles.icon} />
        </div>
        <p>
          Web開発を中心に勉強をしております。
        </p>
        <p>
          フロントエンド、バックエンド開発の両方に興味があり、個人開発ではReactやNext.jsを用いたWebアプリケーションの開発を行っています。
          業務では、主にバックエンドの開発を担当しており、Go言語を使ってAPI設計・開発やテスト実装、CI/CDの構築などを行っています。
        </p>
        <p>
          サークル活動を通して、競技プログラミング(Algorithms)に取り組んだりGitHubを用いてサークル公式のWebサイトやポータルサイトで共同開発を行うなど、チーム開発においても経験を積んでいます。
          気まぐれにC#でアプリケーションを作ったり、インフラやセキュリティ分野に手を出してみたりしています。
        </p>
      </div>
    </div>
  );
}