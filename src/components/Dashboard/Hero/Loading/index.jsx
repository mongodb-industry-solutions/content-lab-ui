"use client";

/**
 * Loading component for the integrated TopNews
 */

import React from 'react';
import { Body } from '@leafygreen-ui/typography';
import styles from './Loading.module.css';

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <Body className={styles.loadingText}>Loading trending news...</Body>
    </div>
  );
}
