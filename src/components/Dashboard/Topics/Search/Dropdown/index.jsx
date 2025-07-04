"use client";

import React, { useState, useRef, useEffect } from 'react';
import Card from '@leafygreen-ui/card';
import Icon from '@leafygreen-ui/icon';
import styles from './Dropdown.module.css';

const filterOptions = [
  { value: 'all', label: 'All' },
  { value: 'news', label: 'News' },
  { value: 'social', label: 'Social Media' },
  { value: 'politics', label: 'Politics' },
  { value: 'technology', label: 'Technology' },
  { value: 'business', label: 'Business' },
];

export default function FilterDropdown({ onFilterChange, defaultValue = 'all' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    filterOptions.find(option => option.value === defaultValue) || filterOptions[0]
  );
  const dropdownRef = useRef(null);

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
    setSelectedOption(option);
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