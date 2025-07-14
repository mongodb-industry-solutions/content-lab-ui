"use client";

/**
 * Topics page top level component called from the dashboard page
 * Contains the search and suggestions components
 * Acts as main source of truth for every component used in this page
 * Delegates the logic to other components via a lot of callbacks and state management
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { fetchSuggestedTopics } from '@/api/suggestions_api';
import { analyzeQuery } from '@/api/search_api';
import { debounce, areRequestsEqual } from '@/utils/generalUtils';
import Search from "@/components/Dashboard/Topics/Search";
import Suggestions from "@/components/Dashboard/Topics/Suggestions";
import { GradientBackground } from "@/components/external/GradientBackground";
import styles from "./Topics.module.css";

const TopicsContainer = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLabel, setSelectedLabel] = useState('all');
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [error, setError] = useState(null);
  const lastRequestRef = useRef({ query: '', label: 'all' });

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
      console.error('Failed to fetch topics:', err);
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

  // Initial load on component mount
  useEffect(() => {
    fetchFilteredTopics('', '');
  }, []);

  return (
    <div className={styles.topicsContainer}>
      <GradientBackground />
      
      {/* Content */}
      <div className={styles.content}>
        <Search 
          onSearchSubmit={handleSearchSubmit}
          onLabelChange={handleLabelChange}
          searchQuery={searchQuery}
          selectedLabel={selectedLabel}
        />
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

export default TopicsContainer; 