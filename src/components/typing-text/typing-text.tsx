import React from 'react';
import styles from './page.module.css';

export const TypingText = () => {
  const texts = [
    'Software / Web Engineer'
  ];

  return (
    <section className={styles.main}>
      <span>
        {texts[0]}
      </span>
    </section>
  );
}

export default TypingText;