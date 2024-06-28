import Link, { LinkProps } from 'next/link';
import React from 'react';
import styles from './LinkButton.module.css';

interface ButtonProps extends Omit<LinkProps, 'href'> {
  href: string;
  children: React.ReactNode;
}

export const LinkButton: React.FC<ButtonProps> = ({
  href,
  children,
}) => {
  return (
    <Link href={href} className={styles.link}>
      {children}
    </Link>
  );
}

export default LinkButton;