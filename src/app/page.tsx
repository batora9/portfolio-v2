import React from 'react';
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Profile } from "../components/Profile";
import { Skills } from "../components/Skills";
import { Articles } from "../components/Articles";
import { Works } from "../components/Works";
import { Timeline } from "../components/Timeline";
import styles from "./page.module.css";
import { MdOutlineExpandMore } from "react-icons/md";
import { SiX, SiGithub } from 'react-icons/si';
import Link from 'next/link';
import TypingAnimation from '@/components/TypingAnimation/TypingAnimation';

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />
      <div className={styles.hero}>
        <img src="./images/hero.png" alt="hero" className={styles.heroImage}/>
        <div className={styles.heroItems}>
          <img src="./images/batora.png" alt="profile" className={styles.heroIcon} />
          <div className={styles.typing}>
            <TypingAnimation texts={['Hello, I am Batora.','Welcome to my website!', 'Software / Web Engineer.']} />
          </div>
          <div className={styles.mediaIcons}>
            <Link href="https://github.com/batora9">
              <SiGithub className={styles.icon} />
            </Link>
            <Link href="https://twitter.com/ismc">
              <SiX className={styles.icon} />
            </Link>
          </div>
        </div>
        <MdOutlineExpandMore className={styles.scrollIcon} />
      </div>
      <div className={styles.contents}>
        <div className={styles.profile} id="profile">
          <Profile />
        </div>
        <div className={styles.skillsList} id="skills">
          <Skills />
        </div>
        <div className={styles.articlesList} id="articles">
          <Articles />
        </div>
        <div className={styles.worksList} id="works">
          <Works />
        </div>
        <div className={styles.timeLine} id="timeline">
          <Timeline />
        </div>
      </div>
      <Footer />
    </main>
  );
}
