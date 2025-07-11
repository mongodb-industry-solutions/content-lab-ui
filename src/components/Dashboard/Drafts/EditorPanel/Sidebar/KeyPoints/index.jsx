'use client';

import React, { useState, useEffect } from 'react';
import Card from '@leafygreen-ui/card';
import Button from '@leafygreen-ui/button';
import Icon from '@leafygreen-ui/icon';
import { researchTopic } from '@/api/research_api';
import InfoWizard from '@/components/external/InfoWizard';
import { KEYPOINTS_INFO_WIZARD } from '@/lib/constants';
import styles from './KeyPoints.module.css';

export default function KeyPoints({ topicCard }) {
    const [keyPoints, setKeyPoints] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [openHelpModal, setOpenHelpModal] = useState(false);

    useEffect(() => {
        const fetchKeyPoints = async () => {
            setIsLoading(true);
            try {
                const keyPoints = await researchTopic(topicCard.topic);
                setKeyPoints(keyPoints || []);
            } catch (error) {
                console.error('Failed to fetch key points:', error);
                setKeyPoints([]);
            } finally {
                setIsLoading(false);
            }
        };
        fetchKeyPoints();
    }, [topicCard.topic]);

    return (
        <div className={styles.keyPointsContainer}>
            <Card className={styles.keyPointsCard}>
                <div className={styles.keyPointsContent}>
                    {/* Sticky Header */}
                    <div className={styles.stickyHeader}>
                        <h4 className={styles.keyPointsTitle}>What not to miss!</h4>
                    </div>

                    {/* Scrollable Content */}
                    <div className={styles.scrollableContent}>
                        {isLoading ? (
                            <div className={styles.loadingState}>Loading...</div>
                        ) : (
                            <div className={styles.keyPointsList}>
                                {keyPoints.map((point, index) => (
                                    <div key={index} className={styles.keyPointItem}>
                                        <div className={styles.keyPointHeader}>
                                            <span className={styles.bullet}></span>
                                            <div className={styles.keyPointContent}>
                                                <h5 className={styles.keyPointTitle}>{point.title}</h5>
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

                    {/* Footer with InfoWizard */}
                    <div className={styles.footer}>
                        <InfoWizard
                            open={openHelpModal}
                            setOpen={setOpenHelpModal}
                            tooltipText="Learn about real-time research"
                            iconGlyph="Wizard"
                            sections={KEYPOINTS_INFO_WIZARD}
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
} 