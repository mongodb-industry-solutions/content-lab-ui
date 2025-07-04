"use client";

import Card from "@leafygreen-ui/card";
import styles from "./RecQueries.module.css";
import GradientText from "@/components/external/GradientText";

const RecQueries = () => {
  const sampleQueries = [
    "Latest tech trends in 2024",
    "Viral social media content",
    "Breaking news analysis"
  ];

  return (
    <div className={styles.recQueriesContainer}>
      <div className={styles.recQueriesGrid}>
        {sampleQueries.map((query, index) => (
          <Card 
            key={index} 
            className={styles.recQueryCard}
            onClick={() => {
              // Handle query selection
              console.log(`Selected query: ${query}`);
            }}
          >
            <GradientText className={styles.recQueryText}>
              {query}
            </GradientText>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecQueries;
