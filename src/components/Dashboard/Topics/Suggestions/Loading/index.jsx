/**
 * Loading component for the suggestions component using LeafyGreen PageLoader
 */

import React, { useState, useEffect } from 'react';
import { PageLoader, Spinner } from '@leafygreen-ui/loading-indicator';
import styles from './Loading.module.css';

// Generic loading component for non-search operations
function GenericLoading() {
    return (
        <div className={styles.genericLoadingContainer}>
            <Spinner
                displayOption='large-vertical'
                description="Loading topics..."
            />
        </div>
    );
}

// Search loading component with rotating text and PageLoader
function SearchLoading() {
    const loadingTexts = [
        "Analyzing trends...",
        "Discovering viral content...",
        "Processing insights...",
        "Exploring topics...",
        "Generating suggestions..."
    ];
    
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prevIndex) => 
                (prevIndex + 1) % loadingTexts.length
            );
        }, 2000); // Change text every 2 seconds
        
        return () => clearInterval(interval);
    }, [loadingTexts.length]);
    
    return (
        <div className={styles.searchLoadingContainer}>
            <PageLoader
                description={loadingTexts[currentTextIndex]}
                baseFontSize={16}
            />
        </div>
    );
}

export default function Loading({ isSearchLoading = false }) {
    return isSearchLoading ? <SearchLoading /> : <GenericLoading />;
} 