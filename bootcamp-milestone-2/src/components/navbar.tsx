import React from "react";
import style from "@/src/styles/navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className={style.navbar}>
      <div className={style.container}>
        <h1 className={style.logo}>Camila's Website ( ˶ˆᗜˆ˵ )</h1>
        <nav className={style.navLinks}>
          <Link href="/" className={style.link}>Home</Link>
          <Link href="/blogs" className={style.link}>Blogs</Link>
          <Link href="/resume" className={style.link}>Resume</Link>
          <Link href="/about" className={style.link}>Contact Me</Link>
        </nav>
      </div>
    </header>
  );
}