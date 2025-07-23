"use client";

/**
 * Suggestions component for the topics component
 * Contains the topic cards and the info wizard
 */

import React, { useState } from 'react';
import { H2, Body } from '@leafygreen-ui/typography';
import TopicCard from '@/components/Dashboard/Topics/Suggestions/TopicCard';
import InfoWizard from '@/components/external/InfoWizard';
import { SUGGESTIONS_INFO_WIZARD } from '@/utils/constants';
import Loading from './Loading';
import styles from './Suggestions.module.css';

export default function Suggestions({ topics = [], isLoading = false, isSearchLoading = false, error = null }) {
    const [openHelpModal, setOpenHelpModal] = useState(false);

    // Function to render content based on state
    const renderContent = () => {
        // Show loading state
        if (isLoading) {
            return <Loading isSearchLoading={isSearchLoading} />;
        }

        // Show error state
        if (error) {
            return (
                <div className={styles.errorContainer}>
                    <Body className={styles.errorMessage}>
                        {error}
                    </Body>
                </div>
            );
        }

        // Show empty state if no topics
        if (!topics || topics.length === 0) {
            return (
                <div className={styles.emptyContainer}>
                    <Body className={styles.emptyMessage}>
                        No topics found. Try adjusting your search or filter criteria.
                    </Body>
                </div>
            );
        }

        // Show topics
        return (
            <div className={styles.topicsGrid}>
                {topics.map((topicCard, index) => (
                    <TopicCard 
                        key={topicCard._id || index} 
                        topicCard={topicCard} 
                        index={index}
                    />
                ))}
            </div>
        );
    };

    return (
        <section className={styles.suggestionsSection}>
            <div className={styles.container}>
                {/* Header - always rendered */}
                {!isSearchLoading && (
                    <div className={styles.headerSection}>
                        <div className={styles.titleWithInfo}>
                            <H2 className={styles.sectionTitle}>
                                Suggested Topics
                            </H2>
                            <InfoWizard
                                open={openHelpModal}
                                setOpen={setOpenHelpModal}
                                tooltipText="Learn about our data sources and AI search"
                                iconGlyph="Wizard"
                                sections={SUGGESTIONS_INFO_WIZARD}
                            />
                        </div>
                        <Body className={styles.sectionSubtitle}>
                            Discover what’s trending and get started with your draft in one click.
                        </Body>
                    </div>
                )}
                
                {/* Content - conditionally rendered */}
                {renderContent()}
            </div>
        </section>
    );
}