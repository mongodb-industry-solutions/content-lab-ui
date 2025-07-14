"use client";

/**
 * Search bar component for the search component
 */

import React, { useState, useRef, useEffect } from 'react';
import Card from '@leafygreen-ui/card';
import Icon from '@leafygreen-ui/icon';
import FilterDropdown from '../Dropdown';
import styles from './SearchBar.module.css';

export default function SearchBar({ 
  onSearch, 
  onFilterChange, 
  searchQuery = '',
  selectedLabel = 'all',
  placeholder = "Search anything..." 
}) {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const searchInputRef = useRef(null);

  // Update local state when parent searchQuery changes
  useEffect(() => {
    setLocalSearchQuery(searchQuery);
  }, [searchQuery]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    // Call the onSearch callback with current input value
    if (onSearch) {
      onSearch(localSearchQuery.trim());
    }
  };

  const handleSearchInputChange = (e) => {
    setLocalSearchQuery(e.target.value);
  };

  const handleSearchIconClick = () => {
    handleSearchSubmit({ preventDefault: () => {} });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(e);
    }
  };

  const handleFilterChange = (filterValue) => {
    if (onFilterChange) {
      onFilterChange(filterValue);
    }
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBarWrapper}>
        {/* Filter Dropdown */}
        <FilterDropdown 
          onFilterChange={handleFilterChange} 
          selectedValue={selectedLabel}
        />

        {/* Search Card */}
        <Card className={styles.searchCard}>
          <form onSubmit={handleSearchSubmit} className={styles.searchWrapper}>
            {/* Search Input */}
            <input
              ref={searchInputRef}
              className={styles.searchInput}
              placeholder={placeholder}
              value={localSearchQuery}
              onChange={handleSearchInputChange}
              onKeyDown={handleKeyDown}
              aria-label="Search input"
            />
            
            {/* Search Icon moved to right */}
            <div className={styles.searchIconContainer} onClick={handleSearchIconClick}>
              <Icon glyph="MagnifyingGlass" className={styles.searchIcon} />
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}