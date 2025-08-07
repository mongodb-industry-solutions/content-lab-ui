'use client';

/**
 * Key points component for the editor panel
 * Contains the key points section 
 */

import React, { useState, useEffect } from 'react';
import Card from '@leafygreen-ui/card';
import Button from '@leafygreen-ui/button';
import { Subtitle, Body } from '@leafygreen-ui/typography';
import { Spinner } from '@leafygreen-ui/loading-indicator';
import Icon from '@leafygreen-ui/icon';
import DemoGuideCue from '@/components/shared/DemoGuideCue';
import { researchTopic } from '@/api/research_api';
import styles from './KeyPoints.module.css';

export default function KeyPoints({ topicCard }) {
    const [keyPoints, setKeyPoints] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchKeyPoints = async () => {
            setIsLoading(true);
            try {
                const keyPoints = await researchTopic(topicCard.topic);
                setKeyPoints(keyPoints || []);
            } catch (error) {
                setKeyPoints([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchKeyPoints();
    }, [topicCard.topic]);

    return (
        <div className={styles.keyPointsContainer}>
            <DemoGuideCue title="Key Points">
                Review these essential highlights to help structure and strengthen your article.
            </DemoGuideCue>
            <Card className={styles.keyPointsCard}>
                <div className={styles.keyPointsContent}>
                    {/* Sticky Header */}
                    <div className={styles.header}>
                        <Subtitle className={styles.keyPointsTitle}>What not to miss!</Subtitle>
                    </div>

                    {/* Scrollable Content */}
                    <div className={styles.scrollableContent}>
                        {isLoading ? (
                            <div className={styles.loadingState}>
                                <Spinner
                                    displayOption='default-vertical'
                                    description="Loading key points..."
                                />
                            </div>
                        ) : (
                            <div className={styles.keyPointsList}>
                                {keyPoints.map((point, index) => (
                                    <div key={index} className={styles.keyPointItem}>
                                        <div className={styles.keyPointHeader}>
                                            <span className={styles.bullet}></span>
                                            <div className={styles.keyPointContent}>
                                                <Body baseFontSize="13" weight="medium">{point.title}</Body>
                                                <Button
                                                    variant="default"
                                                    size="xsmall"
                                                    rightGlyph={<Icon glyph="Link" />}
                                                    href={point.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    View Source
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    );
}