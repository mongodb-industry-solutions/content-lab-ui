"use client";

import React from 'react';
import Card from '@leafygreen-ui/card';
import Badge from '@leafygreen-ui/badge';
import { Body } from '@leafygreen-ui/typography';
import styles from './FloatingCards.module.css';

const cardData = [
  {
    id: 1,
    source: 'Medium',
    sourceColor: 'lightgray',
    content: 'New productivity hack takes the internet by storm',
    metric: '6 min read',
    image: 'categories/technology_1.png'
  },
  {
    id: 2, 
    source: 'Bloomberg',
    sourceColor: 'blue',
    content: 'AI-generated Drake song goes viral, raises questions about deepfakes',
    metric: 'Bloom·berg',
    image: 'categories/science_2.png'
  },
  {
    id: 3,
    source: 'TikTok',
    sourceColor: 'red',
    content: 'Unboxing videos are making a comeback on TikTok',
    metric: '358K views',
    image: 'categories/entertainment_3.png'
  }
];

export default function FloatingCards() {
  return (
    <div className={styles.floatingCards}>
      {cardData.map((card, index) => (
        <Card 
          key={card.id} 
          className={`${styles.floatingCard} ${styles[`card${index + 1}`]}`}
        >
          <div className={styles.cardHeader}>
            <Badge variant={card.sourceColor} className={styles.sourceBadge}>
              {card.source}
            </Badge>
            {card.image && (
              <img 
                src={card.image} 
                alt={card.source}
                className={styles.cardImage}
              />
            )}
          </div>
          
          <Body className={styles.cardContent}>
            {card.content}
          </Body>
          
          <Body className={styles.cardMetric}>
            {card.metric}
          </Body>
        </Card>
      ))}
    </div>
  );
} 