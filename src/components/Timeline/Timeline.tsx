import styles from "./Timeline.module.css";

export const Timeline = () => {
  // Timelineのデータ
  const data = [
    {
      title: "ICPC 2024 国内予選に出場",
      date: "2024-07",
      description: "MAXIMUM TUNE 6RRで出場し結果は298位",
      icon: "/icons/icpc.png",
    },
    {
      title: "ICPC 2023 国内予選に出場",
      date: "2023-07",
      description: "touch_hogehogeで出場し結果は174位",
      icon: "/icons/icpc.png",
    },
    {
      title: "埼玉大学",
      date: "2023-04",
      description: "埼玉大学工学部情報工学科に進学",
      icon: "/icons/saitama-u.png",
    },
    {
      title: "実用英語技能検定2級を取得",
      date: "2022-11",
    },
    {
      title: "茨城県立土浦第一高等学校を卒業",
      date: "2022-03",
      description: "部活動では硬式野球部の副主将を務める",
      icon: "/icons/tsuchiura-first.png",
    },
  ];

  return (
    <div className={styles.container}>
      <p className={styles.title}>Timeline</p>
        {data.map((item, index) => (
          <div key={index} className={styles.item}>
          <p className={styles.date}>{item.date}</p>
          <div className={styles.icon}>
            {item.icon ? (
              <img src={item.icon} alt="icon" />
            ) : (
              <span className={styles.placeholder} />
            )}
          </div>
          <div className={styles.content}>
            <strong>{item.title}</strong>
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
