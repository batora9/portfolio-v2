import Link, { LinkProps } from 'next/link';
import React from 'react';
import styles from './MediaCard.module.css';
import clsx from 'clsx';

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
  console.log("aaaaaaa");
  // https://ogp-fetcher.batoran.com からogp情報をjson形式で取得
  const ogpUrl = `https://ogp-fetcher.batoran.com/?url=${href}`;
  const ogpResponse = await fetch(ogpUrl);
  const ogpJson = await ogpResponse.json();
  const ogp: OgpJson = ogpJson;
  return (
    <Link href={href} className={styles.link}>
      <div className={clsx(styles.card, style === 'centering' ? styles.centering : '')}>
        <div className={styles.content}>
          <p className={styles.title}>{ogp.title}</p>
          <p className={styles.description}>{ogp.description}</p>
          <p className={styles.href}>{href}</p>
        </div>
        <img 
          src={ogp.favicon || ogp.image}
          className={styles.image}
        />
      </div>
    </Link>
  );
}
export default MediaCard;