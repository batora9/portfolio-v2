'use client';
import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import styles from "./Header.module.css";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <Link href="/" className={styles.logolink}>
        <p className={styles.top}>ばとらの部屋</p>
      </Link>
      <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
        <ul>
          <Link href="/" className={styles.link}>HOME</Link>
          <Link href="#profile" className={styles.link}>PROFILE</Link>
          <Link href="#skills" className={styles.link}>SKILLS</Link>
          <Link href="#articles" className={styles.link}>ARTICLES</Link>
          <Link href="#works" className={styles.link}>WORKS</Link>
        </ul>
      </nav>
      <div className={styles.hamburger} onClick={toggleMenu}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>
    </header>
  );
};

export default Header;