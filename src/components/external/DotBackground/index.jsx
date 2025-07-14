"use client";

/**
 * Dot background component source: https://magicui.design/docs/components/dot-pattern
 */

import React from 'react';
import styles from './DotBackground.module.css';

export default function DotBackground({ children, className = '' }) {
  return (
    <div className={`${styles.dotBackground} ${className}`}>
      {children}
    </div>
  );
}
