"use client";

import { MongoDBLogoMark } from '@leafygreen-ui/logo';
import { Body } from '@leafygreen-ui/typography';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import Link from 'next/link';
import styles from './DesktopNavbar.module.css';

export default function DesktopNavbar({ navItems, onProfile, onLogout }) {
  return (
    <nav as="header" className={styles.navbar}>
      {/* Logo Section */}
      <Link href="/" className={styles.logo}>
        <MongoDBLogoMark color="black" height={25} />
        <Body weight='medium' className={styles.textSize}>Content Lab</Body>
      </Link>

      {/* Navigation Links */}
      <div className={styles.navlinks}>
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={styles.navLink}>
            <Body weight='medium' className={styles.textSize}>{item.label}</Body>
          </Link>
        ))}
      </div>

      {/* Profile Icon and Logout Button */}
      <div className={styles.profileAndLogoutContainer}>
        <IconButton
          aria-label="Profile"
          onClick={onProfile}
        >
          <Icon glyph="Person" color="black"/>
        </IconButton>
        <IconButton
          aria-label="Logout"
          onClick={onLogout}
        >
          <Icon glyph="LogOut" color="black"/>
        </IconButton>
      </div>
    </nav>
  );
}
