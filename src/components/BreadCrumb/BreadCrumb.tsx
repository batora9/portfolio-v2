import React from 'react';
import Link from 'next/link';
import { MdKeyboardArrowRight } from 'react-icons/md';
import styles from './BreadCrumb.module.css';

interface BreadCrumbProps {
  items: { to: string; label: string; style: 'node' | 'leaf' }[];
}

export const BreadCrumb: React.FC<BreadCrumbProps> = ({ items }) => (
  <div className={styles.breadcrumb}>
    {items.map((item, index) => (
      <span key={index}>
        <Link
          href={item.to}
          passHref
          className={item.style === 'leaf' ? styles.leaf : ''}
        >
          {item.label}
        </Link>
        {index < items.length - 1 && <span className={styles.icon}> <MdKeyboardArrowRight /> </span>}
      </span>
    ))}
  </div>
);
