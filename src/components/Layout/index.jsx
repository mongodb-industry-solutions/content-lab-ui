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

  // Check localStorage on component mount 
  useEffect(() => {
    const checkLoginStatus = () => {
      try {
        const selectedUser = localStorage.getItem('selectedUser');
        const userProfile = localStorage.getItem('userProfile');
        
        if (selectedUser && userProfile) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
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
      <main className={styles.main}>
        <div className={styles.container}>
          {children}
        </div>
      </main>
    </div>
  );
} 