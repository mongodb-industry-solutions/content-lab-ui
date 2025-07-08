'use client';

import React, { useState } from 'react';
import Card from '@leafygreen-ui/card';
import TextInput from '@leafygreen-ui/text-input';
import styles from './Sidebar.module.css';

export default function Sidebar() {
    const [metadata, setMetadata] = useState({
        title: '',
        author: '',
        category: '',
    });

    const handleInputChange = (field, value) => {
        setMetadata(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const mockKeyPoints = [
        "Latest AI developments in content creation and automation tools",
        "Impact on traditional writing workflows and productivity metrics",
        "User adoption statistics and industry transformation trends",
        "Future predictions for 2024-2025 in content marketing",
        "Case studies of successful AI-assisted content strategies",
        "Ethical considerations and best practices for AI writing tools"
    ];

    return (
        <div className={styles.sidebar}>
            {/* Metadata Section */}
            <div className={styles.metadataSection}>
                <h3 className={styles.sectionTitle}>Article Metadata</h3>
                
                <div className={styles.inputGroup}>
                    <TextInput
                        label="Article Title"
                        value={metadata.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Enter article title..."
                        sizeVariant="small"
                        aria-label="Enter article title..."
                    />
                </div>

                <div className={styles.inputGroup}>
                    <TextInput
                        label="Author Name"
                        value={metadata.author}
                        onChange={(e) => handleInputChange('author', e.target.value)}
                        placeholder="Enter author name..."
                        sizeVariant="small"
                        aria-label="Enter author name..."
                    />
                </div>

                <div className={styles.inputGroup}>
                    <TextInput
                        label="Category/Topic Tag"
                        value={metadata.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        placeholder="Enter category/topic tag..."
                        sizeVariant="small"
                        aria-label="Enter category/topic tag..."
                    />
                </div>
            </div>

            {/* Topic Information Section */}
            <div className={styles.topicSection}>
                <Card className={styles.topicCard}>
                    <h4 className={styles.topicTitle}>Key Points to Include</h4>
                    <ul className={styles.keyPointsList}>
                        {mockKeyPoints.map((point, index) => (
                            <li key={index} className={styles.keyPoint}>
                                <span className={styles.bullet}></span>
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
        </div>
    );
} 