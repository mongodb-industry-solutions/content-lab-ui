import React from 'react';
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.simpleSkeleton}>
      <div className={styles.skeletonBar}></div>
      <div className={styles.skeletonBar}></div>
      <div className={styles.skeletonBarShort}></div>
    </div>
  );
};

export default Loading; 