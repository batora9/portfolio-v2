import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      Init pages.
      <div className={styles.profile}>
        <h2>Profile</h2>
      </div>
      <div className={styles.skillsList}>
        <h2>Skills</h2>
        <ul>
          <li>HTML</li>
          <li>CSS</li>
          <li>JavaScript</li>
          <li>React</li>
          <li>Next.js</li>
        </ul>
      </div>
      <div className={styles.worksList}>
        <h2>Works</h2>
      </div>
    </main>
  );
}
