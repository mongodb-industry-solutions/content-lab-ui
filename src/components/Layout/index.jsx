"use client";

import Navbar from "@/components/Layout/Navbar";
import Login from "@/components/Login";
import { useState } from "react";
import styles from './Layout.module.css';

export default function Layout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUserSelected = () => {
    setIsLoggedIn(true);
  }

  if (!isLoggedIn) {
    return <Login onUserSelected={handleUserSelected}/>;
  }
  
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Navbar />
      </header>
      <main className={styles.main}>
        <div className={styles.container}>
          {children}
        </div>
      </main>
    </div>
  );
} 