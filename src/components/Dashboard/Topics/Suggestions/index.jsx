"use client";

/**
 * Suggestions component for the topics component
 * Shows carousels for suggested topics or grid for search results
 */

import React, { useState, useEffect } from 'react';
import { Body, H3 } from '@leafygreen-ui/typography';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import { CONTENT_CATEGORIES } from '@/constants/categories';
import TopicCard from '@/components/Dashboard/Topics/Suggestions/TopicCard';
import Carousel from '@/components/external/Carousel';
import Loading from './Loading';
import styles from './Suggestions.module.css';

export default function Suggestions({ 
  suggestedTopics = [], 
  searchResults = [], 
  isLoadingSuggestions = false, 
  isLoadingSearch = false, 
  isSearchActive = false,
  error = null,
  onBackToSuggestions = null,
  searchQuery = ""
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

  // Helper function to render the title section
  const renderTitleSection = () => {
    if (isSearchActive && searchQuery) {
      return (
        <>
          <div className={styles.title}>
            <H3 className={styles.titleHeading}>Search Results</H3>
            <Body className={styles.titleSubtext}>
              Showing results for "{searchQuery}"
            </Body>
          </div>
          <div className={styles.titleDivider}></div>
        </>
      );
    }
    
    if (!isSearchActive && suggestedTopics.length > 0) {
      return (
        <>
          <div className={styles.title}>
            <H3 className={styles.titleHeading}>Featured Content</H3>
            <Body className={styles.titleSubtext}>
              Curated topics based on current trends and interests
            </Body>
          </div>
          <div className={styles.titleDivider}></div>
        </>
      );
    }
    
    return null;
  };

  // Helper function to render main content
  const renderMainContent = () => {
    // Loading state
    if (isLoadingSuggestions || isLoadingSearch) {
      return <Loading isSearchLoading={isLoadingSearch} />;
    }

    // Error or empty message helper
    const renderMessage = (text) => (
      <div className={styles.message}>
        <Body>{text}</Body>
      </div>
    );

    // Combined error/empty state check
    if (error || !suggestedTopics || suggestedTopics.length === 0) {
      const message = error || "No suggested topics available.";
      return renderMessage(message);
    }

    // Search results
    if (isSearchActive) {
      if (searchResults.length > 0) {
        return (
          <>
            {renderTitleSection()}
            {onBackToSuggestions && (
              <Button 
                onClick={onBackToSuggestions} 
                variant="primaryOutline"
                leftGlyph={<Icon glyph="ArrowLeft" />}
                className={styles.backButton}
              >
                Back to Suggestions
              </Button>
            )}
            <div className={styles.grid}>
              {searchResults.map((topicCard, index) => (
                <TopicCard key={`${topicCard._id || 'search'}-${index}`} topicCard={topicCard} index={index} />
              ))}
            </div>
          </>
        );
      } else if (!isLoadingSearch) {
        return (
          <>
            {renderTitleSection()}
            {onBackToSuggestions && (
              <Button 
                onClick={onBackToSuggestions} 
                variant="primaryOutline"
                leftGlyph={<Icon glyph="ArrowLeft" />}
                className={styles.backButton}
              >
                Back to Suggestions
              </Button>
            )}
            {renderMessage("No topics found. Try adjusting your search or filter criteria.")}
          </>
        );
      }
    }

    // Category carousels
    return (
      <>
        {renderTitleSection()}
        {CONTENT_CATEGORIES.map((category) => {
          const categoryTopics = suggestedTopics.filter(topic => topic.label === category);
          
          return (
            <div key={category} className={styles.category}>
              <H3 className={styles.categoryHeading}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </H3>
              <Carousel itemsPerView={itemsPerView} gap={carouselGap}>
                {categoryTopics.map((topicCard, cardIndex) => (
                  <TopicCard key={`${topicCard._id || 'topic'}-${cardIndex}`} topicCard={topicCard} index={cardIndex} />
                ))}
              </Carousel>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        <div className={styles.content}>
          {renderMainContent()}
        </div>
      </div>
    </section>
  );
}