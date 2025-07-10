'use client';

import React from 'react';
import TextInput from '@leafygreen-ui/text-input';
import KeyPoints from './KeyPoints';
import styles from './Sidebar.module.css';

export default function Sidebar({ topicCard, userProfile }) {

    const handleInputChange = (field, value) => {
        // Handle input changes if needed
        console.log(`${field}: ${value}`);
    };

    return (
        <div className={styles.sidebar}>
            {/* Metadata Section */}
            <div className={styles.metadataSection}>
                <h3 className={styles.sectionTitle}>Article Metadata</h3>
                
                <div className={styles.inputGroup}>
                    <TextInput
                        label="Article Title"
                        defaultValue={topicCard?.topic || ''}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        sizeVariant="small"
                        aria-label="Enter article title..."
                    />
                </div>

                <div className={styles.inputGroup}>
                    <TextInput
                        label="Author Name"
                        defaultValue={userProfile?.userName || ''}
                        onChange={(e) => handleInputChange('author', e.target.value)}
                        sizeVariant="small"
                        aria-label="Enter author name..."
                    />
                </div>

                <div className={styles.inputGroup}>
                    <TextInput
                        label="Category/Topic Tag"
                        defaultValue={topicCard?.label || ''}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        sizeVariant="small"
                        aria-label="Enter category/topic tag..."
                    />
                </div>
            </div>

            {/* Key Points Section */}
            <KeyPoints topicCard={topicCard} />
        </div>
    );
} 