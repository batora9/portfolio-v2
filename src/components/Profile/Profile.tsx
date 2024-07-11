import { MediaCard } from '../MediaCard';
import styles from './Profile.module.css';

export function Profile() {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Profile</p>
      <div className={styles.contents}>
        <div className={styles.text}>
          <p className={styles.name}>ばとら / Batora</p>
        </div>
        <div className={styles.profileText}>
          埼玉大学工学部情報工学科所属 B2のばとらです。 趣味はプログラミング、ボウリング、野球、ゲーム、車などなど...
          最近では、主にWindowsアプリケーションやWebアプリケーションを作ったり、アルゴリズムや競技プログラミングを触る程度に勉強しています。
        </div>
        <div className={styles.profileText}>
          埼玉大学プログラミングサークル Maximumの2024年度副会長を務めています。主に、サークルのWebサイトの開発や、活動の一つである「Web研究会」の講師をしています。
        </div>
        <div className={styles.MediaLink}>
          <MediaCard
            href='https://maximum.vc'
            title='Maximum'
            description='埼玉大学プログラミングサークル「Maximum」の公式サイトです、活動内容や知見を情報発信していきます'
            imageSrc='/icons/maximum.ico'
            imageAlt='Maximum'
          />
          <MediaCard
            href='https://atcoder.jp/users/batora'
            title='batora - AtCoder'
            description='AtCoder is a programming contest site for anyone from beginners to experts. We hold weekly programming contests online.'
            imageSrc='/icons/atcoder.png'
            imageAlt='AtCoder'
          />
        </div>
      </div>
    </div>
  );
}