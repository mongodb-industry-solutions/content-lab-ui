"use client";

/**
 * Search component for the topics component
 * Uses LeafyGreen SearchInput and Combobox components
 */

import React, { useState, useEffect } from 'react';
import { SearchInput, SearchResult, SearchResultGroup } from '@leafygreen-ui/search-input';
import { Combobox, ComboboxOption } from '@leafygreen-ui/combobox';
import styles from "./Search.module.css";

const Search = ({ 
  onSearchSubmit, 
  onLabelChange, 
  selectedLabel,
  searchQuery = '',
  onSearchQueryChange = null
}) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  // Recommended queries per category for SearchResults
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

  // Get current category queries
  const currentQueries = queriesPerCategory[selectedLabel] || queriesPerCategory["general"];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    if (onSearchQueryChange) {
      onSearchQueryChange(value);
    }
  };

  // Update local state when searchQuery prop changes
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleCategoryChange = (value) => {
    if (onLabelChange) {
      onLabelChange(value);
    }
  };

  const handleSearchResultClick = (query) => {
    setLocalSearchQuery(query);
    if (onSearchSubmit) {
      onSearchSubmit(query);
    }
  };

  // Handle key press to submit custom queries
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (localSearchQuery.trim() && onSearchSubmit) {
        onSearchSubmit(localSearchQuery.trim());
      }
    }
  };

  return (
    <section className={styles.searchSection}>
      <div className={styles.container}>
        <div className={styles.searchRow}>
          {/* Search Input */}
          <div className={styles.searchWrapper}>
            <SearchInput
              aria-label="Search for topics"
              placeholder="Search for topics..."
              value={localSearchQuery}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              size="large"
              className={styles.customInput}
            >
              {localSearchQuery.length === 0 && (
                <SearchResultGroup label="Recommended Queries">
                  {currentQueries.map((query, index) => (
                    <SearchResult
                      key={index}
                      onClick={() => handleSearchResultClick(query)}
                    >
                      {query}
                    </SearchResult>
                  ))}
                </SearchResultGroup>
              )}
            </SearchInput>
          </div>

          {/* Category Filter Combobox */}
          <div className={styles.comboboxWrapper}>
            <Combobox
              placeholder="Select category"
              value={selectedLabel}
              onChange={handleCategoryChange}
              size="large"
              clearable={false}
              className={styles.customInput}
            >
              <ComboboxOption value="general" displayName="All" />
              <ComboboxOption value="technology" displayName="Technology" />
              <ComboboxOption value="health" displayName="Health" />
              <ComboboxOption value="sports" displayName="Sports" />
              <ComboboxOption value="politics" displayName="Politics" />
              <ComboboxOption value="science" displayName="Science" />
              <ComboboxOption value="business" displayName="Business" />
              <ComboboxOption value="entertainment" displayName="Entertainment" />
            </Combobox>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Search;
