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
import { fetchSuggestedTopics as fetchSuggestedTopicsAPI } from '@/api/suggestions_api';
import { analyzeQuery } from '@/api/search_api';
import { debounce } from '@/utils/generalUtils';
import { SUGGESTIONS_INFO_WIZARD } from '@/utils/constants';
import Search from "@/components/Dashboard/Topics/Search";
import Suggestions from "@/components/Dashboard/Topics/Suggestions";
import styles from "./Topics.module.css";

export default function Topics () {
  const [selectedLabel, setSelectedLabel] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestedTopics, setSuggestedTopics] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [error, setError] = useState(null);
  const [openHelpModal, setOpenHelpModal] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Fetch suggested topics (always available for carousels)
  const fetchSuggestedTopics = async () => {
    setIsLoadingSuggestions(true);
    setError(null);
    
    try {
      const topics = await fetchSuggestedTopicsAPI();
      setSuggestedTopics(topics);
    } catch (err) {
      setError('Failed to load suggested topics. Please try again.');
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  // Fetch search results
  const fetchSearchResults = async (query, label) => {
    setIsLoadingSearch(true);
    setError(null);
    
    try {
      const results = await analyzeQuery(query, label);
      setSearchResults(results);
    } catch (err) {
      setError('Failed to search topics. Please try again.');
    } finally {
      setIsLoadingSearch(false);
    }
  };

  // Debounced search to prevent spam
  const debouncedSearch = useCallback(
    debounce(fetchSearchResults, 300),
    []
  );

  // Handle search submission (only on Enter)
  const handleSearchSubmit = useCallback((query) => {
    if (query.trim()) {
      setIsSearchActive(true);
      debouncedSearch(query, selectedLabel);
    } else {
      setIsSearchActive(false);
      setSearchResults([]);
    }
  }, [selectedLabel, debouncedSearch]);

  // Handle going back to suggestions
  const handleBackToSuggestions = useCallback(() => {
    setIsSearchActive(false);
    setSearchResults([]);
    setSearchQuery('');
  }, []);

  // Handle search query changes
  const handleSearchQueryChange = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  // Handle category filter changes (do not trigger search)
  const handleLabelChange = useCallback((label) => {
    setSelectedLabel(label);
  }, []);

  // Load suggested topics on mount
  useEffect(() => {
    fetchSuggestedTopics();
  }, []);

  return (
    <>
      {/* Full page gray background */}
      <div className={styles.pageBackground} />
      
      {/* Header wrapper with glow effect */}
      <div className={styles.headerWrapper}>
        {/* Header and search section */}
        <div className={styles.headerContainer}>
          {/* Header Section */}
          <div className={styles.headerSection}>
            <H3 className={styles.mainTitle}>
              Discover Trending Topics
            </H3>
            <div className={styles.subtitleWithInfo}>
              <Body className={styles.subtitle}>
                Discover what's trending and get started with your draft in one click.
              </Body>
              <InfoWizard
                open={openHelpModal}
                setOpen={setOpenHelpModal}
                tooltipText="Learn about our data sources and AI search"
                iconGlyph="Wizard"
                sections={SUGGESTIONS_INFO_WIZARD}
              />
            </div>
          </div>

          <Search 
            onSearchSubmit={handleSearchSubmit}
            onLabelChange={handleLabelChange}
            selectedLabel={selectedLabel}
            searchQuery={searchQuery}
            onSearchQueryChange={handleSearchQueryChange}
          />
        </div>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.content}>
          <Suggestions 
            suggestedTopics={suggestedTopics}
            searchResults={searchResults}
            isLoadingSuggestions={isLoadingSuggestions}
            isLoadingSearch={isLoadingSearch}
            isSearchActive={isSearchActive}
            error={error}
            onBackToSuggestions={handleBackToSuggestions}
          />
        </div>
      </div>
    </>
  );
};