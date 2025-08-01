"use client";

import { useState, useEffect } from 'react';

/**
 * Custom hook to detect mobile screen sizes
 * @param {number} breakpoint - The breakpoint in pixels (default: 768px)
 * @returns {boolean} - True if screen is mobile size, false otherwise
 */
export function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if screen is mobile
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Check on initial load
    checkIsMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIsMobile);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [breakpoint]);

  return isMobile;
}
