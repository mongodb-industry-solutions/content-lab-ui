"use client";

/**
 * Saved component for the dashboard
 * Contains the draft cards
 */

import React, { useState, useEffect } from 'react';
import { H2, Body } from '@leafygreen-ui/typography';
import GridPattern from '@/components/external/GridPattern';
import DraftCard from './DraftCard';
import { fetchUserDrafts, deleteDraft } from '@/api/drafts_api';
import styles from './Saved.module.css';

export default function Saved() {
  const [drafts, setDrafts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUserDrafts = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Get userId from localStorage
        const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
        if (!userProfile._id) {
          throw new Error('User not logged in');
        }

        const userDrafts = await fetchUserDrafts(userProfile._id);
        setDrafts(userDrafts);
      } catch (err) {
        setError(err.message || 'Failed to load drafts');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserDrafts();
  }, []);

  const handleDeleteDraft = async (draftId) => {
    try {
      const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
      await deleteDraft(draftId, userProfile._id);
      setDrafts(prevDrafts => prevDrafts.filter(draft => draft._id !== draftId));
    } catch (err) {
      setError('Failed to delete draft');
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner}></div>
          <Body className={styles.loadingText}>Loading your drafts...</Body>
        </div>
      );
    }

    if (error) {
      return (
        <div className={styles.errorContainer}>
          <Body className={styles.errorMessage}>
            {error}
          </Body>
        </div>
      );
    }

    if (!drafts || drafts.length === 0) {
      return (
        <div className={styles.emptyContainer}>
          <H2 className={styles.emptyTitle}>No Drafts Yet</H2>
          <Body className={styles.emptyMessage}>
            Start creating content by exploring topics and saving your work. Your drafts will appear here.
          </Body>
        </div>
      );
    }

    

    return (
      <div className={styles.draftsGrid}>
        {drafts.map((draft) => (
          <DraftCard 
          key={draft._id} 
          draft={draft} 
          onDelete={() => handleDeleteDraft(draft._id)} 
          />
        ))}
      </div>
    );
  };

  return (
    <section className={styles.savedSection}>
      {/* Animated Grid Background with pulsating #00684A */}
      <GridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={styles.animatedGrid}
      />
      
      {/* Content */}
      <div className={styles.container}>
        <div className={styles.headerSection}>
          <H2 className={styles.sectionTitle}>
            Your Saved Drafts
          </H2>
          <Body className={styles.sectionSubtitle}>
            Continue working on your saved content and bring your ideas to life.
          </Body>
        </div>
        
        {renderContent()}
      </div>
    </section>
  );
}