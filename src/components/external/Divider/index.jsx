/**
 * Divider component
 */

import React from 'react';
import styles from './Divider.module.css';

export default function Divider({ className, ...props }) {
  return (
    <div className={`${styles.divider} ${className || ''}`} {...props}>
      <div className={styles.line}></div>
    </div>
  );
} 