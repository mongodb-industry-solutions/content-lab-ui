'use client';

/**
 * Sidebar component for the editor panel
 * Contains the metadata section and the key points section
 */

import React from 'react';
import TextInput from '@leafygreen-ui/text-input';
import Badge from '@leafygreen-ui/badge';
import KeyPoints from './KeyPoints';
import styles from './Sidebar.module.css';

export default function Sidebar({ topicCard, metadata, onMetadataChange }) {

    const handleInputChange = (field, value) => {
        if (onMetadataChange) {
            onMetadataChange(field, value);
        }
    };

    return (
        <div className={styles.sidebar}>
            {/* Metadata Section */}
            <div className={styles.metadataSection}>
                <h3 className={styles.sectionTitle}>Article Metadata</h3>
                
                <div className={styles.inputGroup}>
                    <TextInput
                        label="Article Title"
                        value={metadata?.title || ''}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        sizeVariant="small"
                        aria-label="Enter article title..."
                    />
                </div>

                <div className={styles.inputGroup}>
                    <TextInput
                        label="Category/Topic Tag"
                        value={metadata?.category || ''}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        sizeVariant="small"
                        aria-label="Enter category/topic tag..."
                    />
                </div>

                {metadata?.keywords && metadata.keywords.length > 0 && (
                    <div className={styles.inputGroup}>
                        <label className={styles.keywordsLabel}>Keywords</label>
                        <div className={styles.keywordsBadges}>
                            {metadata.keywords.map((keyword, index) => (
                                <Badge 
                                    key={index} 
                                    variant="gray"
                                >
                                    {keyword}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Key Points Section */}
            <KeyPoints topicCard={topicCard} />
        </div>
    );
} 