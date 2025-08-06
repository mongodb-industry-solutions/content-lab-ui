"use client";

/**
 * Search component for the topics component
 * Uses LeafyGreen SearchInput and Combobox components
 */

import React, { useState } from 'react';
import { SearchInput } from '@leafygreen-ui/search-input';
import { Combobox, ComboboxOption } from '@leafygreen-ui/combobox';
import Card from '@leafygreen-ui/card';
import { CONTENT_CATEGORIES, CATEGORY_DISPLAY_NAMES, QUERIES_PER_CATEGORY } from '@/constants/categories';
import styles from "./Search.module.css";

export default function Search({ 
  onSearchSubmit, 
  onLabelChange, 
  selectedLabel
}) {
  const [inputValue, setInputValue] = useState('');
  
  // Get current category queries
  const currentQueries = QUERIES_PER_CATEGORY[selectedLabel] || QUERIES_PER_CATEGORY["general"];

  const handleCategoryChange = (value) => {
    if (onLabelChange) {
      onLabelChange(value);
    }
  };

  const handleSearchSubmit = (query) => {
    if (onSearchSubmit && query.trim()) {
      onSearchSubmit(query.trim());
    }
  };

  const handleSearchResultClick = (query) => {
    setInputValue(query);
    handleSearchSubmit(query);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Handle key press to submit custom queries
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchSubmit(inputValue);
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
              value={inputValue}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              size="large"
              className={styles.customInput}
            />
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
              {CONTENT_CATEGORIES.map((category) => (
                <ComboboxOption 
                  key={category}
                  value={category} 
                  displayName={CATEGORY_DISPLAY_NAMES[category]} 
                />
              ))}
            </Combobox>
          </div>
        </div>

        {/* Recommended Queries Cards */}
        <div className={styles.recommendedSection}>
          <div className={styles.queryCardsGrid}>
            {currentQueries.map((query, index) => (
              <Card
                key={index}
                className={styles.queryCard}
                onClick={() => handleSearchResultClick(query)}
              >
                {query}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
