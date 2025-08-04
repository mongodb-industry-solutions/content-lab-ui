"use client";

/**
 * Main Navbar component that renders either Desktop or Mobile navbar
 */

import UserProfile from '@/components/external/UserProfile';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';
import { useState } from 'react';
import { useMobile } from '@/hooks/useMobile';

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
  const isMobile = useMobile();

  const handleLogout = () => {
    onLogout();
  }

  const handleProfile = () => {
    setIsProfileOpen(true);
  }

  return (
    <>
      {isProfileOpen && <UserProfile onClose={() => setIsProfileOpen(false)} />}
      
      {isMobile ? (
        <MobileNavbar 
          navItems={navItems}
          onProfile={handleProfile}
          onLogout={handleLogout}
        />
      ) : (
        <DesktopNavbar 
          navItems={navItems}
          onProfile={handleProfile}
          onLogout={handleLogout}
        />
      )}
    </>
  );
}
