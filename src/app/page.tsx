import React from 'react';
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Profile } from "../components/Profile";
import { Skills } from "../components/Skills";
import { Articles } from "../components/Articles";
import { Works } from "../components/Works";
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
          <div className={styles.typing}>
            <span>Software / Web Engineer</span>
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
      </div>
      <Footer />
    </main>
  );
}
