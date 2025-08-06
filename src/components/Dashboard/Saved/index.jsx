"use client";

/**
 * Saved component for the dashboard
 * Contains the draft cards
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { H3, Body } from '@leafygreen-ui/typography';
import DraftCard from './DraftCard';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import Banner from '@leafygreen-ui/banner';
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
        <div className={styles.bannerContainer}>
          <Banner variant="danger">
            {error}
          </Banner>
        </div>
      );
    }

    if (!drafts || drafts.length === 0) {
      return (
        <div className={styles.emptyContainer}>
          <Banner variant="info">
            No drafts found. Start creating content by exploring topics and saving your work.
          </Banner>
          <Link href="/topics">
            <Button
              size="large"
              variant="primary"
              className={styles.ctaButton}
              rightGlyph={<Icon glyph="Sparkle" />}
            >
              Browse Topics
            </Button>
          </Link>
        </div>
      );
    }

    return (
      <div className={styles.draftsGrid}>
        {drafts.map((draft, index) => (
          <DraftCard 
          key={draft._id} 
          draft={draft} 
          index={index}
          onDelete={() => handleDeleteDraft(draft._id)} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <section className={styles.savedSection}>
        <div className={styles.headerSection}>
          <H3 className={styles.sectionTitle}>
            Your Saved Drafts
          </H3>
          <Body className={styles.sectionSubtitle}>
            Continue working on your saved content and bring your ideas to life.
          </Body>
        </div>
        
        <div className={styles.divider}></div>
        
        {renderContent()}
      </section>
    </div>
  );
}