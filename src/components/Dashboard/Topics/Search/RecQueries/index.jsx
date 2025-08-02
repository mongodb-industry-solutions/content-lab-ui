"use client";

/**
 * Recommended queries component for the search component
 */

import Card from "@leafygreen-ui/card";
import styles from "./RecQueries.module.css";

const RecQueries = ({ onQuerySelect, selectedCategory = "general" }) => {
  const queriesPerCategory = {
    "general": [
      "Trending topics today",
      "Popular viral content",
      "Breaking news stories"
    ],
    "technology": [
      "Latest tech innovations",
      "AI and machine learning trends",
      "Cybersecurity updates"
    ],
    "health": [
      "Mental health awareness",
      "Latest medical breakthroughs",
      "Wellness and fitness trends"
    ],
    "sports": [
      "Major league updates",
      "Olympic news and records",
      "Player transfers and trades"
    ],
    "politics": [
      "Election campaigns",
      "Policy changes and reforms",
      "International relations"
    ],
    "science": [
      "Climate change research",
      "Space exploration updates",
      "Scientific discoveries"
    ],
    "business": [
      "Market trends and analysis",
      "Startup funding news",
      "Economic policy impact"
    ],
    "entertainment": [
      "Celebrity news and updates",
      "Movie and TV show releases",
      "Music industry trends"
    ]
  };

  // Get queries for the selected category, fallback to general if not found
  const currentQueries = queriesPerCategory[selectedCategory] || queriesPerCategory["general"];

  const handleQueryClick = (query) => {
    if (onQuerySelect) {
      onQuerySelect(query);
    }
  };

  return (
    <div className={styles.recQueriesContainer}>
      <div className={styles.recQueriesGrid}>
        {currentQueries.map((query, index) => (
          <Card 
            key={index} 
            className={styles.recQueryCard}
            onClick={() => handleQueryClick(query)}
          >
            <span className={styles.recQueryText}>{query}</span>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RecQueries;
