'use client';
import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import styles from "./SubHeader.module.css";

export const SubHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logolink}>
        <p className={styles.top}>ばとらの部屋</p>
      </Link>
      <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
        <ul>
          <Link href="/" className={styles.link}>HOME</Link>
          <Link href="./#profile" className={styles.link}>PROFILE</Link>
          <Link href="./#skills" className={styles.link}>SKILLS</Link>
          <Link href="/articles" className={styles.link}>ARTICLES</Link>
          <Link href="mailto:batora.dev@gmail.com" className={styles.link}>CONTACT</Link>
        </ul>
      </nav>
      <div className={styles.hamburger} onClick={toggleMenu}>
        {menuOpen ? <FaTimes className={styles.colorWhite} /> : <FaBars />}
      </div>
    </header>
  );
};

export default SubHeader;