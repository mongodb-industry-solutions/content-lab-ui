"use client";

import React from 'react';
import { H2, Body } from '@leafygreen-ui/typography';
import TopicCard from '@/components/Dashboard/Topics/Suggestions/TopicCard';
import Loading from './Loading';
import styles from './Suggestions.module.css';

export default function Suggestions({ topics = [], isLoading = false, error = null }) {
    // Show loading state
    if (isLoading) {
        return (
            <section className={styles.suggestionsSection}>
                <div className={styles.container}>
                    <H2 className={styles.sectionTitle}>
                        Suggested Topics
                    </H2>
                    <Body className={styles.sectionSubtitle}>
                        Discover trending topics personalized for your content strategy.
                    </Body>
                    <Loading />
                </div>
            </section>
        );
    }

    // Show error state
    if (error) {
        return (
            <section className={styles.suggestionsSection}>
                <div className={styles.container}>
                    <H2 className={styles.sectionTitle}>
                        Suggested Topics
                    </H2>
                    <Body className={styles.sectionSubtitle}>
                        Discover trending topics personalized for your content strategy.
                    </Body>
                    <div className={styles.errorContainer}>
                        <Body className={styles.errorMessage}>
                            {error}
                        </Body>
                    </div>
                </div>
            </section>
        );
    }

    // Show empty state if no topics
    if (!topics || topics.length === 0) {
        return (
            <section className={styles.suggestionsSection}>
                <div className={styles.container}>
                    <H2 className={styles.sectionTitle}>
                        Suggested Topics
                    </H2>
                    <Body className={styles.sectionSubtitle}>
                        Discover trending topics personalized for your content strategy.
                    </Body>
                    <div className={styles.emptyContainer}>
                        <Body className={styles.emptyMessage}>
                            No topics found. Try adjusting your search or filter criteria.
                        </Body>
                    </div>
                </div>
            </section>
        );
    }

    // Show topics
    return (
        <section className={styles.suggestionsSection}>
            <div className={styles.container}>
                <H2 className={styles.sectionTitle}>
                    Suggested Topics
                </H2>
                <Body className={styles.sectionSubtitle}>
                    Discover trending topics personalized for your content strategy.
                </Body>
                
                <div className={styles.topicsGrid}>
                    {topics.map((topicCard, index) => (
                        <TopicCard 
                            key={topicCard._id || index} 
                            topicCard={topicCard} 
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}