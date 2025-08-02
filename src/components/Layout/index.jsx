"use client";

/**
 * Layout component for the dashboard / user selection
 */

import Navbar from "@/components/Layout/Navbar";
import Login from "@/components/Login";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Body } from '@leafygreen-ui/typography';
import styles from './Layout.module.css';

export default function Layout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Always show login on page load/reload
  useEffect(() => {
    setIsLoggedIn(false);
    setIsLoading(false);
  }, []);

  const handleUserSelected = (user) => {
    setIsLoggedIn(true);
    router.push('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('selectedUser');
    localStorage.removeItem('userProfile');
    setIsLoggedIn(false);
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>
          <Body>Loading...</Body>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Login onUserSelected={handleUserSelected} />;
  }
  
  // Show dashboard if logged in
  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <Navbar onLogout={handleLogout} />
      </header>
      <main>
        {children}
      </main>
    </div>
  );
} 