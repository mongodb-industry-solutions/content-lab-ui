"use client";

import React, { useState, useRef, useEffect } from 'react';
import Card from '@leafygreen-ui/card';
import Icon from '@leafygreen-ui/icon';
import styles from './SearchBar.module.css';

const searchCategories = [
  { id: 'everything', label: 'Everything' },
  { id: 'videos', label: 'Videos' },
  { id: 'community', label: 'Community' },
  { id: 'playlists', label: 'Playlists' },
  { id: 'shorts', label: 'Shorts' }
];

export default function SearchBar({ onSearch, onCategoryChange, placeholder = "Search anything..." }) {
  const [selectedCategory, setSelectedCategory] = useState(searchCategories[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
    
    // Call the onCategoryChange callback if provided
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    
    // Call the onSearch callback if provided
    if (onSearch) {
      onSearch(searchQuery, selectedCategory);
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

  return (
    <div className={styles.searchContainer} ref={dropdownRef}>
      <Card className={styles.searchCard}>
        <form onSubmit={handleSearchSubmit} className={styles.searchWrapper}>
          {/* Category Dropdown Button */}
          <Card
            className={styles.dropdownCard}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}
          >
            <span>{selectedCategory.label}</span>
            <Icon
              glyph="ChevronDown"
              className={`${styles.dropdownIcon} ${isDropdownOpen ? styles.dropdownIconOpen : ''}`}
            />
          </Card>

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

          {/* Search Icon */}
          <div 
            className={styles.searchIconContainer}
            onClick={handleSearchIconClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleSearchIconClick();
              }
            }}
            aria-label="Submit search"
          >
            <Icon glyph="MagnifyingGlass" className={styles.searchIcon} />
          </div>
        </form>
      </Card>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className={styles.dropdownMenu} role="listbox">
          {searchCategories.map((category) => (
            <button
              key={category.id}
              className={styles.dropdownItem}
              onClick={() => handleCategorySelect(category)}
              role="option"
              aria-selected={selectedCategory.id === category.id}
            >
              {category.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}