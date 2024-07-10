import Link, { LinkProps } from 'next/link';
import React from 'react';
import styles from './LinkCard.module.css';
import clsx from 'clsx';

interface CardProps extends Omit<LinkProps, 'href'> {
  href: string;
  variant?: 'article-link' | 'project-link';
  title: string;
  createdAt: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export const LinkCard: React.FC<CardProps> = async ({
  href,
  variant,
  title,
  createdAt,
  description,
  imageSrc,
  imageAlt,
}) => {
  return (
    <Link href={href} className={styles.link}>
      <div className={variant === 'project-link' ? styles.card : clsx(styles.card, styles.cardPadding)}>
        <img 
          src={variant === 'project-link' ? imageSrc : ''}
          alt={variant === 'project-link' ? imageAlt : ''}
          className={variant === 'project-link' ? styles.image : styles.hidden}
        />
        <p className={variant === 'project-link' ? clsx(styles.createdAt, styles.addMargin) : clsx(styles.createdAt, styles.removeMargin)}>{createdAt}</p>
        <p className={variant === 'project-link' ? clsx(styles.title, styles.colorBlack) : clsx(styles.title, styles.addUnderline, styles.removeMargin)}>{title}</p>
        <p className={variant === 'project-link' ? styles.hidden : clsx(styles.description, styles.removeMargin)}>{description}</p>
      </div>
    </Link>
  );
}
export default LinkCard;