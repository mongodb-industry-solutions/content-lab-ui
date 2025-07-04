"use client";

import Search from "@/components/Dashboard/Topics/Search";
import Suggestions from "@/components/Dashboard/Topics/Suggestions";
import { Particles } from "@/components/external/Particles";
import styles from "./Topics.module.css";

const TopicsContainer = () => {
  return (
    <div className={styles.topicsContainer}>
      {/* Particles Background */}
      <Particles className={styles.particles} />
      
      {/* Content */}
      <div className={styles.content}>
        <Search />
        <Suggestions />
      </div>
    </div>
  );
};

export default TopicsContainer; 