import React from 'react';
import styles from './Loading.module.css';

export default function Loading() {
    return (
        <div className={styles.loadingSkeleton}>
            <div className={styles.skeletonBar}></div>
            <div className={styles.skeletonBar}></div>
            <div className={styles.skeletonBarShort}></div>
        </div>
    )
}