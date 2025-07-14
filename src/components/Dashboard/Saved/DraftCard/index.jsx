"use client";

/**
 * Draft card component for the saved component
 */

import React from 'react';
import { H3, Body, Disclaimer } from '@leafygreen-ui/typography';
import Card from '@leafygreen-ui/card';
import Button from '@leafygreen-ui/button';
import Badge from '@leafygreen-ui/badge';
import { useRouter } from 'next/navigation';
import { getHumanReadableDate, getBadgeVariant } from '@/utils/generalUtils';
import styles from './DraftCard.module.css';

export default function DraftCard({ draft }) {
  const router = useRouter();
  
  const { 
    _id,
    title = "Untitled Draft",
    category = "General",
    content = "",
    updated_at,
    created_at
  } = draft;

  const lastEditedDate = updated_at || created_at;
  const humanReadableDate = getHumanReadableDate(lastEditedDate);
  const getContentPreview = (content) => {
    if (!content) return "No content yet...";
    
    const plainText = content.replace(/<[^>]*>/g, '');
    return plainText.trim() || "No content yet...";
  };

  const handleKeepDrafting = () => {
    router.push(`/drafts/${_id}`);
  };

  return (
    <Card className={styles.draftCard}>
      <div className={styles.cardContent}>
        {/* Left Side - Metadata */}
        <div className={styles.metadataSection}>
          <H3 className={styles.draftTitle}>
            {title}
          </H3>
          
          <Badge 
            variant={getBadgeVariant(category)} 
            className={styles.categoryBadge}
          >
            {category}
          </Badge>
          
          <Disclaimer className={styles.lastEdited}>
            Last edited {humanReadableDate}
          </Disclaimer>
        </div>
        
        {/* Right Side - Content Preview */}
        <div className={styles.contentSection}>
          <Body className={styles.contentPreview}>
            {getContentPreview(content)}
          </Body>
          
          <div className={styles.ctaSection}>
            <Button 
              size="default" 
              variant="primary"
              className={styles.keepDraftingBtn}
              onClick={handleKeepDrafting}
            >
              Keep Drafting
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
