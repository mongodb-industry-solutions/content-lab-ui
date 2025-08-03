"use client";

/**
 * Suggestions component for the topics component
 * Shows carousels for suggested topics or grid for search results
 */

import React, { useState, useEffect } from 'react';
import { Body, H3 } from '@leafygreen-ui/typography';
import TopicCard from '@/components/Dashboard/Topics/Suggestions/TopicCard';
import Carousel from '@/components/external/Carousel';
import { groupTopicsByCategory, getCategoryDisplayName } from '@/utils/generalUtils';
import Loading from './Loading';
import styles from './Suggestions.module.css';

export default function Suggestions({ 
  suggestedTopics = [], 
  searchResults = [], 
  isLoadingSuggestions = false, 
  isLoadingSearch = false, 
  isSearchActive = false,
  error = null,
  onBackToSuggestions = null
}) {
  const [itemsPerView, setItemsPerView] = useState(3);
  const [carouselGap, setCarouselGap] = useState(16);

  // Update items per view and gap based on screen size
  useEffect(() => {
    const updateLayout = () => {
      if (window.innerWidth >= 1400) {
        setItemsPerView(4);
        setCarouselGap(16);
      } else if (window.innerWidth >= 1200) {
        setItemsPerView(3);
        setCarouselGap(16);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2);
        setCarouselGap(12);
      } else {
        setItemsPerView(1);
        setCarouselGap(8);
      }
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  // Show loading state
  if (isLoadingSuggestions || isLoadingSearch) {
    return (
      <section className={styles.suggestionsSection}>
        <div className={styles.stackedCards}>
          <div className={styles.stackedCard4}></div>
          <div className={styles.stackedCard3}></div>
          <div className={styles.stackedCard2}></div>
          <div className={styles.container}>
            <Loading isSearchLoading={isLoadingSearch} />
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className={styles.suggestionsSection}>
        <div className={styles.stackedCards}>
          <div className={styles.stackedCard4}></div>
          <div className={styles.stackedCard3}></div>
          <div className={styles.stackedCard2}></div>
          <div className={styles.container}>
            <div className={styles.errorContainer}>
              <Body className={styles.errorMessage}>
                {error}
              </Body>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show search results in grid layout
  if (isSearchActive && searchResults.length > 0) {
    return (
      <section className={styles.suggestionsSection}>
        <div className={styles.stackedCards}>
          <div className={styles.stackedCard4}></div>
          <div className={styles.stackedCard3}></div>
          <div className={styles.stackedCard2}></div>
          <div className={styles.container}>
            {onBackToSuggestions && (
              <div className={styles.backButtonContainer}>
                <button 
                  onClick={onBackToSuggestions}
                  className={styles.backButton}
                >
                  ← Back to Suggestions
                </button>
              </div>
            )}
            <div className={styles.topicsGrid}>
              {searchResults.map((topicCard, index) => (
                <TopicCard 
                  key={topicCard._id} 
                  topicCard={topicCard} 
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show empty state for search with no results (only if not loading)
  if (isSearchActive && searchResults.length === 0 && !isLoadingSearch) {
    return (
      <section className={styles.suggestionsSection}>
        <div className={styles.stackedCards}>
          <div className={styles.stackedCard4}></div>
          <div className={styles.stackedCard3}></div>
          <div className={styles.stackedCard2}></div>
          <div className={styles.container}>
            {onBackToSuggestions && (
              <div className={styles.backButtonContainer}>
                <button 
                  onClick={onBackToSuggestions}
                  className={styles.backButton}
                >
                  ← Back to Suggestions
                </button>
              </div>
            )}
            <div className={styles.emptyContainer}>
              <Body className={styles.emptyMessage}>
                No topics found. Try adjusting your search or filter criteria.
              </Body>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show empty state if no suggested topics
  if (!suggestedTopics || suggestedTopics.length === 0) {
    return (
      <section className={styles.suggestionsSection}>
        <div className={styles.stackedCards}>
          <div className={styles.stackedCard4}></div>
          <div className={styles.stackedCard3}></div>
          <div className={styles.stackedCard2}></div>
          <div className={styles.container}>
            <div className={styles.emptyContainer}>
              <Body className={styles.emptyMessage}>
                No suggested topics available.
              </Body>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Group suggested topics by category and show in carousels
  const topicsByCategory = groupTopicsByCategory(suggestedTopics);

  return (
    <section className={styles.suggestionsSection}>
      <div className={styles.stackedCards}>
        <div className={styles.stackedCard4}></div>
        <div className={styles.stackedCard3}></div>
        <div className={styles.stackedCard2}></div>
        <div className={styles.container}>
          {Object.entries(topicsByCategory).map(([category, categoryTopics]) => (
            <div key={category} className={styles.categorySection}>
              <H3 className={styles.categoryTitle}>
                {getCategoryDisplayName(category)}
              </H3>
              <Carousel
                itemsPerView={itemsPerView}
                gap={carouselGap}
              >
                {categoryTopics.map((topicCard, index) => (
                  <TopicCard 
                    key={topicCard._id} 
                    topicCard={topicCard} 
                    index={index}
                  />
                ))}
              </Carousel>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}