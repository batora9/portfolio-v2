import styles from './Works.module.css';

export async function Works() {
  return (
    <div className={styles.container}>
      <p className={styles.title}>Recent Works</p>
    </div>
  );
}