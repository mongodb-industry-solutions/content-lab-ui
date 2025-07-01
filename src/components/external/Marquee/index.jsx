"use client";

import React from "react";
import styles from "./Marquee.module.css";

export function Marquee({
  className = "",
  pauseOnHover = false,
  children,
  ...props
}) {
  const containerClasses = [
    styles.marqueeContainer,
    pauseOnHover ? styles.marqueePauseOnHover : "",
    className
  ].filter(Boolean).join(" ");

  return (
    <div
      {...props}
      className={containerClasses}
    >
      <div className={styles.marqueeTrack}>
        <div className={styles.marqueeContent}>
          {children}
        </div>
        <div className={styles.marqueeContent}>
          {children}
        </div>
      </div>
    </div>
  );
}
