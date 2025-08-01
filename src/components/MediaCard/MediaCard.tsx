import Link, { LinkProps } from 'next/link';
import React from 'react';
import styles from './MediaCard.module.css';

interface CardProps extends Omit<LinkProps, 'href'> {
  href: string;
  style?: 'centering' | 'left';
}

interface OgpJson {
  title: string;
  description: string;
  favicon: string;
  image: string;
}

export const MediaCard: React.FC<CardProps> = async ({
  href,
  style,
}) => {
  // https://ogp-fetcher.batoran.com からogp情報をjson形式で取得
  const ogpUrl = `https://ogp-fetcher.batoran.com/?url=${href}`;
  const ogp = await fetch(ogpUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch OGP data');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error fetching OGP data:', error);
      return {
        title: 'Error fetching OGP data',
        description: '',
        favicon: '',
        image: '',
      } as OgpJson; // デフォルト値を返す
    });

  return (
    <Link href={href} className={style === 'centering' ? styles.centering : styles.left}>
      <div className={styles.card}>
        <div className={styles.content}>
          <p className={styles.title}>{ogp.title}</p>
          <p className={styles.description}>{ogp.description}</p>
          <p className={styles.href}>{href}</p>
        </div>
        <img 
          src={style === 'centering' ? ogp.favicon || ogp.image : ogp.image || ogp.favicon}
          className={styles.image}
        />
      </div>
    </Link>
  );
}
export default MediaCard;