"use client";

import React from 'react';
import styles from './DotBackground.module.css';

export default function DotBackground({ children, className = '' }) {
  return (
    <div className={`${styles.dotBackground} ${className}`}>
      {children}
    </div>
  );
}
