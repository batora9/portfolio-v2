import Link, { LinkProps } from 'next/link';
import React from 'react';
import styles from './MediaCard.module.css';
import clsx from 'clsx';

interface CardProps extends Omit<LinkProps, 'href'> {
  href: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export const MediaCard: React.FC<CardProps> = async ({
  href,
  title,
  description,
  imageSrc,
  imageAlt,
}) => {
  return (
    <Link href={href} className={styles.link}>
      <div className={styles.card}>
        <div className={styles.content}>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description}</p>
          <p className={styles.href}>{href}</p>
        </div>
        <div className={styles.imageContainer}>
          <img 
            src={imageSrc}
            alt={imageAlt}
            className={styles.image}
          />
        </div>
      </div>
    </Link>
  );
}
export default MediaCard;