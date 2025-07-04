import React from 'react';
import styles from './Loading.module.css';

export default function Loading() {
    return (
        <div className={styles.loadingGrid}>
            {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className={styles.loadingSkeleton}>
                    <div className={styles.skeletonImage}></div>
                    <div className={styles.skeletonContent}>
                        <div className={styles.skeletonLine}></div>
                        <div className={styles.skeletonLine}></div>
                        <div className={styles.skeletonLineShort}></div>
                    </div>
                </div>
            ))}
        </div>
    );
} 