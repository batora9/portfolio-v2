import React from 'react';
import Link from 'next/link';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { MdHome } from "react-icons/md";
import styles from './BreadCrumb.module.css';

interface BreadCrumbProps {
  items: { to: string; label: string; style: 'node' | 'leaf' }[];
}

export const BreadCrumb: React.FC<BreadCrumbProps> = ({ items }) => (
  <div className={styles.breadcrumb}>
    {items.map((item, index) => (
      <span key={index} className={styles.item}>
        {index === 0 && <MdHome className={styles.icon} />}
        <Link
          href={item.to}
          passHref
          className={item.style === 'leaf' ? styles.leaf : ''}
        >
          {item.label}
        </Link>
        {index < items.length - 1 && <MdOutlineKeyboardArrowRight className={styles.icon} />}
      </span>
    ))}
  </div>
);
