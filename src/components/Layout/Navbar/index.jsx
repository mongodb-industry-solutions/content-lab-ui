"use client";

import { MongoDBLogoMark } from '@leafygreen-ui/logo';
import { H1, Subtitle } from '@leafygreen-ui/typography';
import Card from '@leafygreen-ui/card';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import UserProfile from '@/components/Login/UserProfile';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { useState } from 'react';

export default function Navbar({ onLogout }) {
  const navItems = [
    {
      href: '/',
      label: 'Home',
    },
    {
      href: '/topics',
      label: 'Topics',
    },
    {
      href: '/saved',
      label: 'Saved',
    }
  ];

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
  }

  const handleProfile = () => {
    setIsProfileOpen(true);
  }

  return (
    <div className={styles.navbarWrapper}>
      {isProfileOpen && <UserProfile onClose={() => setIsProfileOpen(false)} />}
      <Card as="header" className={styles.navbar}>
        {/* Logo Section */}
        <div className={styles.logo}>
          <MongoDBLogoMark color="black" height={35} />
          <H1 className={styles.logoText}>The Content Lab</H1>
        </div>

        {/* Navigation Links */}
        <div className={styles.navlinks}>
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className={styles.navLink}>
              <Subtitle className={styles.navText}>{item.label}</Subtitle>
            </Link>
          ))}
        </div>

        {/* Profile Icon and Logout Button */}
        <div className={styles.profileAndLogoutContainer}>
          <IconButton
            aria-label="Profile"
            onClick={handleProfile}
          >
            <Icon glyph="Person" color="black" className={styles.profileIcon}/>
          </IconButton>
          <IconButton
            aria-label="Logout"
            onClick={handleLogout}
          >
            <Icon glyph="LogOut" color="black" className={styles.logoutIcon}/>
          </IconButton>
        </div>
        
      </Card>
    </div>
  );
}
