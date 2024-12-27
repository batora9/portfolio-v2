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
          <p>埼玉大学工学部情報工学科所属 B2のばとらです。</p>
          <p>小学生から趣味で野球とプログラミングを始め、高校時代まで硬式野球部に所属していました。部活での主将・副主将の経験を活かして主体性・多様性・協働性をモットーに活動しております。</p>
        </div>
        <div className={styles.profileText}>
          埼玉大学プログラミングサークル Maximumの2024年度副会長を務めています。主に、サークルのWebサイトの開発や、活動の一つである「Web研究会」の講師をしています。
        </div>
        <div className={styles.MediaLink}>
          <MediaCard
            href='https://maximum.vc'
            style='centering'
          />
          <MediaCard
            href='https://atcoder.jp/users/batora'
            style='centering'
          />
        </div>
      </div>
    </div>
  );
}