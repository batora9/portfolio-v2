import React from 'react';
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Profile } from "../components/Profile";
import { TypingText } from '../components/typing-text';
import styles from "./page.module.css";
import { MdOutlineExpandMore } from "react-icons/md";
import { SiX, SiGithub } from 'react-icons/si';
import Link from 'next/link';


export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.hero}>
        <img src="./images/hero.png" alt="hero" className={styles.heroImage}/>
        <div className={styles.heroItems}>
          <img src="./images/batora.png" alt="profile" className={styles.heroIcon} />
        </div>
        <MdOutlineExpandMore className={styles.scrollIcon} />
      </div>
      <div className={styles.contents}>
        <div className={styles.profile} id="profile">
          <div className={styles.profileContent}>
            <Profile />
          </div>
        </div>
        <div className={styles.skillsList} id="skills">
          <div className={styles.skillListContent}>
            <h2>Skills</h2>
            <ul>
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>React</li>
              <li>Next.js</li>
            </ul>
          </div>
        </div>
        <div className={styles.articlesList} id="articles">
          <div className={styles.articlesListContent}>
            <h2>Articles</h2>
          </div>
        </div>
        <div className={styles.worksList} id="works">
          <div className={styles.worksListContent}>
            <h2>Works</h2>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
