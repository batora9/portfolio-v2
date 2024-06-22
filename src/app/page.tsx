import clsx from "clsx";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.heroImage}></div>
      </div>
      <div className={styles.contents}>
        <div className={styles.profile}>
          <div className={styles.profileContent}>
            <h2>Profile</h2>
            <p>Webエンジニアを目指している学生です。</p>
          </div>
        </div>
        <div className={styles.skillsList}>
          <div className={styles.skillListContent}>
            <h2>Skills</h2>
            <ul>
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>React</li>
              <li>Next.js</li>
            </ul>
          </div>
        </div>
        <div className={styles.articlesList}>
          <div className={styles.articlesListContent}>
            <h2>Articles</h2>
          </div>
        </div>
        <div className={styles.worksList}>
          <div className={styles.worksListContent}>
            <h2>Works</h2>
          </div>
        </div>
      </div>
    </main>
  );
}
