import React from "react";
import style from "@/src/styles/home.module.css"; 

export default function Home() {
  return (
    <div className={style.homeContainer}>
      <section className={style.heroSection}>
        <h1 className={style.heroTitle}>Welcome to my Website</h1>
        <p className={style.heroSubtitle}>Feel free to lurk around.</p>
        <a href="/resume" className={style.heroButton}>View My Resume</a>
      </section>

      <section className={style.infoSection}>
        <h2 className={style.sectionTitle}>Learn more about me!</h2>
        <p className={style.sectionDescription}>
          This is my personal website where I share blogs, showcase my resume, and connect with people!
        </p>
      </section>

      <section className={style.infoSection}>
        <h2 className={style.sectionTitle}>Get in Touch</h2>
        <p className={style.sectionDescription}>
        Reach out to me through the <a href="/about" className={style.link}>Contact Me</a> page.
        </p>
      </section>
    </div>
  );
}