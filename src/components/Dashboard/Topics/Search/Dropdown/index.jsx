"use client";

import React, { useState, useRef, useEffect } from 'react';
import Card from '@leafygreen-ui/card';
import Icon from '@leafygreen-ui/icon';
import styles from './Dropdown.module.css';

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'barcelona', label: 'Barcelona' },
  { value: 'technology', label: 'Technology' },
  { value: 'health', label: 'Health' },
  { value: 'sports', label: 'Sports' },
  { value: 'politics', label: 'Politics' },
  { value: 'science', label: 'Science' },
  { value: 'business', label: 'Business' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'travel', label: 'Travel' },
  { value: 'education', label: 'Education' }
];

export default function FilterDropdown({ 
  onFilterChange, 
  selectedValue = 'all' 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Find the current selected option based on selectedValue prop
  const selectedOption = filterOptions.find(option => option.value === selectedValue) || filterOptions[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option) => {
    setIsOpen(false);
    if (onFilterChange) {
      onFilterChange(option.value);
    }
  };

  return (
    <div className={styles.dropdownContainer} ref={dropdownRef}>
      <Card className={styles.filterCard} onClick={handleToggle}>
        <div className={styles.filterContent}>
          <span className={styles.filterText}>
            {selectedOption.label}
          </span>
          <Icon 
            glyph="ChevronDown" 
            className={`${styles.dropdownIcon} ${isOpen ? styles.rotated : ''}`} 
          />
        </div>
      </Card>

      {isOpen && (
        <Card className={styles.dropdownMenu}>
          <div className={styles.optionsList}>
            {filterOptions.map((option) => (
              <div
                key={option.value}
                className={`${styles.option} ${
                  selectedOption.value === option.value ? styles.selected : ''
                }`}
                onClick={() => handleOptionSelect(option)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
} 