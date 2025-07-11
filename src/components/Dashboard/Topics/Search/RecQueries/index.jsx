"use client";

import Card from "@leafygreen-ui/card";
import styles from "./RecQueries.module.css";
import GradientText from "@/components/external/GradientText";

const RecQueries = ({ onQuerySelect }) => {
  const sampleQueries = [
    "Latest tech trends in 2025",
    "Viral social media content",
    "Current trends in AI"
  ];

  const handleQueryClick = (query) => {
    if (onQuerySelect) {
      onQuerySelect(query);
    }
  };

  return (
    <div className={styles.recQueriesContainer}>
      <div className={styles.recQueriesGrid}>
        {sampleQueries.map((query, index) => (
          <Card 
            key={index} 
            className={styles.recQueryCard}
            onClick={() => handleQueryClick(query)}
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
