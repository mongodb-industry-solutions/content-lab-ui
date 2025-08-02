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
  onSearchQueryChange,
  onLabelChange, 
  searchQuery, 
  selectedLabel 
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

  // Update local state when parent searchQuery changes
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    // Sync parent state 
    if (onSearchQueryChange) {
      onSearchQueryChange(value);
    }
  };

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
              size="default"
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
              label="Category"
              placeholder="Select category"
              value={selectedLabel}
              onChange={handleCategoryChange}
              size="default"
              clearable={false}
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
