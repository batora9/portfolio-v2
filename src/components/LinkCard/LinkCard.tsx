import Link, { LinkProps } from 'next/link';
import React from 'react';
import styles from './LinkCard.module.css';

interface CardProps extends Omit<LinkProps, 'href'> {
  href: string;
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export const LinkCard: React.FC<CardProps> = ({
  href,
  title,
  description,
  imageSrc,
  imageAlt,
}) => {
  return (
    <Link href={href} className={styles.link}>
      <div className={styles.card}>
        <img src={imageSrc} alt={imageAlt} className={styles.image} />
        <p className={styles.title}>{title}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </Link>
  );
}

export default LinkCard;