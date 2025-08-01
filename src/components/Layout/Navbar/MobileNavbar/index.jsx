"use client";

import { MongoDBLogoMark } from '@leafygreen-ui/logo';
import { Body } from '@leafygreen-ui/typography';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';
import Link from 'next/link';
import styles from './MobileNavbar.module.css';
import { useState } from 'react';

export default function MobileNavbar({ navItems, onProfile, onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav as="header" className={styles.navbar}>
        {/* Logo Section */}
        <Link href="/" className={styles.logo}>
          <MongoDBLogoMark color="black" height={25} />
          <Body weight='medium' className={styles.textSize}>Content Lab</Body>
        </Link>

        {/* Mobile Menu Button */}
        <IconButton
          aria-label="Menu"
          onClick={toggleMobileMenu}
          className={styles.mobileMenuButton}
        >
          <Icon glyph="Menu" color="black" />
        </IconButton>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className={styles.mobileMenuWrapper}>
          <div className={styles.mobileMenu}>

            <div className={styles.mobileMenuHeader}>
              <div className={styles.mobileMenuLogo}>
                <MongoDBLogoMark color="black" height={25} />
                <Body weight='medium' className={styles.textSize}>Content Lab</Body>
              </div>

              <IconButton
                aria-label="Close Menu"
                onClick={toggleMobileMenu}
              >
                <Icon glyph="X" color="black" />
              </IconButton>
            </div>

            {/* Navigation links */}
            <div className={styles.mobileNavlinks}>
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className={styles.mobileNavLink}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Body weight='medium' className={styles.textSize}>{item.label}</Body>
                </Link>
              ))}
            </div>

            {/* Action buttons */}
            <div className={styles.mobileActions}>
              <button
                onClick={() => {
                  onProfile();
                  setIsMobileMenuOpen(false);
                }}
                className={styles.mobileActionButton}
              >
                <Icon glyph="Person" color='black'/>
                <Body weight='medium' className={styles.textSize}>Profile</Body>
              </button>

              <button
                onClick={() => {
                  onLogout();
                  setIsMobileMenuOpen(false);
                }}
                className={styles.mobileActionButton}
              >
                <Icon glyph="LogOut" color='black'/>
                <Body weight='medium' className={styles.textSize}>Logout</Body>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}