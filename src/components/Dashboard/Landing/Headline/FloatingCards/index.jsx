"use client";

import React from 'react';
import Card from '@leafygreen-ui/card';
import Badge from '@leafygreen-ui/badge';
import { Body } from '@leafygreen-ui/typography';
import styles from './FloatingCards.module.css';

const cardData = [
  {
    id: 1,
    source: 'Reuters',
    sourceColor: 'lightgray',
    content: 'Global technology trends shaping the future of work',
    metric: '8 min read',
    image: 'categories/technology_1.png'
  },
  {
    id: 2, 
    source: 'BBC',
    sourceColor: 'blue',
    content: 'Scientific breakthroughs continue to advance human knowledge',
    metric: 'BBC News',
    image: 'categories/science_2.png'
  },
  {
    id: 3,
    source: 'YouTube',
    sourceColor: 'red',
    content: 'Creative content creators explore new storytelling formats',
    metric: '2.1M views',
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