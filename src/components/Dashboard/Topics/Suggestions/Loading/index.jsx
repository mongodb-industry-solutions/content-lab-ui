/**
 * Loading component for the suggestions component
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SparklesText } from './SparklesText';
import styles from './Loading.module.css';

// Generic loading component for non-search operations
function GenericLoading() {
    return (
        <div className={styles.genericLoadingContainer}>
            <div className={styles.spinner}></div>
            <p className={styles.genericLoadingText}>Loading topics...</p>
        </div>
    );
}

// Search loading component with rotating SparklesText
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
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentTextIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                        duration: 0.3,
                        ease: "easeInOut"
                    }}
                >
                    <SparklesText 
                        text={loadingTexts[currentTextIndex]}
                        sparklesCount={15}
                    />
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

export default function Loading({ isSearchLoading = false }) {
    return isSearchLoading ? <SearchLoading /> : <GenericLoading />;
} 