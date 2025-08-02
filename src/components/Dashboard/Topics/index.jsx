"use client";

/**
 * Topics page top level component called from the dashboard page
 * Contains the search and suggestions components
 * Acts as main source of truth for every component used in this page
 * Delegates the logic to other components via a lot of callbacks and state management
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { H3, Body } from '@leafygreen-ui/typography';
import InfoWizard from '@/components/external/InfoWizard';
import { fetchSuggestedTopics } from '@/api/suggestions_api';
import { analyzeQuery } from '@/api/search_api';
import { debounce, areRequestsEqual } from '@/utils/generalUtils';
import { SUGGESTIONS_INFO_WIZARD } from '@/utils/constants';
import Search from "@/components/Dashboard/Topics/Search";
import Suggestions from "@/components/Dashboard/Topics/Suggestions";
import styles from "./Topics.module.css";

export default function Topics () {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('general');
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openHelpModal, setOpenHelpModal] = useState(false);
  const lastRequestRef = useRef({ query: '', label: 'general' });

  const fetchFilteredTopics = async (query, label) => {
    const currentRequest = { query, label };
    
    // Prevent duplicate requests
    if (areRequestsEqual(lastRequestRef.current, currentRequest)) {
      return;
    }

    // Prevent multiple simultaneous requests
    if (isLoading) {
      return;
    }

    const isSearchQuery = query && query.trim() !== '';
    
    setIsLoading(true);
    setIsSearchLoading(isSearchQuery);
    setError(null);
    lastRequestRef.current = currentRequest;

    try {
      let fetchedTopics; 
      if (isSearchQuery) {
        fetchedTopics = await analyzeQuery(query, label);
      } else {
        fetchedTopics = await fetchSuggestedTopics(label);
      }
      
      setTopics(fetchedTopics);
    } catch (err) {
      setError('Failed to load topics. Please try again.');
      setTopics([]);
    } finally {
      setIsLoading(false);
      setIsSearchLoading(false);
    }
  };

  // Debounced version for search submit (prevent spam clicking Enter)
  const debouncedFetch = useCallback(
    debounce(fetchFilteredTopics, 300),
    []
  );

  // Handle search input changes (sync parent state with input)
  const handleSearchQueryChange = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  // Handle search submission (Enter key)
  const handleSearchSubmit = useCallback((query) => {
    setSearchQuery(query);
    debouncedFetch(query, selectedLabel);
  }, [selectedLabel, debouncedFetch]);

  // Handle filter/label changes (immediate fetch)
  const handleLabelChange = useCallback((label) => {
    setSelectedLabel(label);
    fetchFilteredTopics(searchQuery, label);
  }, [searchQuery]);

  // Generate status text based on current search state
  const getStatusText = () => {
    const categoryName = selectedLabel === 'general' ? 'All Categories' : 
      selectedLabel.charAt(0).toUpperCase() + selectedLabel.slice(1);
    
    if (searchQuery && searchQuery.trim() !== '') {
      return `Search results for "${searchQuery}" in ${categoryName}`;
    }
    
    if (selectedLabel === 'general') {
      return 'Suggested topics from all categories';
    }
    
    return `Suggested topics in ${categoryName}`;
  };

  // Initial load on component mount
  useEffect(() => {
    fetchFilteredTopics('', '');
  }, []);

  return (
    <div className={styles.topicsContainer}>
      
      {/* Header Section */}
      <div className={styles.headerSection}>
        <div className={styles.titleWithInfo}>
          <H3 className={styles.mainTitle}>
            Discover Trending Topics
          </H3>
          <InfoWizard
            open={openHelpModal}
            setOpen={setOpenHelpModal}
            tooltipText="Learn about our data sources and AI search"
            iconGlyph="Wizard"
            sections={SUGGESTIONS_INFO_WIZARD}
          />
        </div>
        <Body className={styles.subtitle}>
          Discover what's trending and get started with your draft in one click.
        </Body>
      </div>

      {/* Search Section */}
      <Search 
        onSearchSubmit={handleSearchSubmit}
        onSearchQueryChange={handleSearchQueryChange}
        onLabelChange={handleLabelChange}
        searchQuery={searchQuery}
        selectedLabel={selectedLabel}
      />

      {/* Divider Line */}
      <div className={styles.dividerLine}></div>
      
      {/* Content */}
      <div className={styles.content}>
        <div className={styles.statusIndicator}>
          <Body className={styles.statusText}>
            {getStatusText()}
          </Body>
        </div>
        
        <Suggestions 
          topics={topics}
          isLoading={isLoading}
          isSearchLoading={isSearchLoading}
          error={error}
        />
      </div>
    </div>
  );
};