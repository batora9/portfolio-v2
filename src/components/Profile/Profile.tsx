import styles from './page.module.css';

export function Profile() {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Profile</p>
      <div className={styles.contents}>
        <div className={styles.text}>
          <p className={styles.name}>ばとら / Batora</p>
        </div>
      </div>
      <div className={styles.profileText}>
        関東在住で20歳の情報系の学科所属の大学生です。 趣味はプログラミング、ボウリング、野球、ゲーム、車などなど...
        最近では、主にWindowsアプリケーションやWebアプリケーションを作ったり、アルゴリズムや競技プログラミングを触る程度に勉強しています。
      </div>
    </div>
  );
}