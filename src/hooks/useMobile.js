"use client";

import { useState, useEffect } from "react";

export default function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check on initial load
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    
    // Run on mount
    checkMobile();
    
    // Add resize listener
    window.addEventListener("resize", checkMobile);
    
    // Clean up
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, [breakpoint]);
  
  return isMobile;
} 