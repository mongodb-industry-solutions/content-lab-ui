"use client";

import React, { useState, useRef } from 'react';
import Card from '@leafygreen-ui/card';
import Icon from '@leafygreen-ui/icon';
import FilterDropdown from '../Dropdown';
import styles from './SearchBar.module.css';

export default function SearchBar({ onSearch, onFilterChange, placeholder = "Search anything..." }) {
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    // Call the onSearch callback
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
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
        <FilterDropdown onFilterChange={handleFilterChange} />

        {/* Search Card */}
        <Card className={styles.searchCard}>
          <form onSubmit={handleSearchSubmit} className={styles.searchWrapper}>
            {/* Search Input */}
            <input
              ref={searchInputRef}
              className={styles.searchInput}
              placeholder={placeholder}
              value={searchQuery}
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