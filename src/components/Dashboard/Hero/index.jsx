"use client";

/**
 * Headline component for the landing page
 * Contains the headline, subtitle, CTA button, and integrated news content
 */

import React from 'react';
import { H3, Body } from '@leafygreen-ui/typography';
import Button from '@leafygreen-ui/button';
import Link from 'next/link';
import TopNews from './TopNews';
import ViralPosts from './ViralPosts';
import styles from './Hero.module.css';
import Icon from '@leafygreen-ui/icon';

export default function Hero() {
  return (
    <section className={styles.heroContainer}>
      <div className={styles.dividerLineLeft}></div>
      <div className={styles.dividerLineRight}></div>
      <div className={styles.headlineSection}>
        <div className={styles.singleColumnLayout}>
          <div className={styles.contentCard}>
            <div className={styles.introBadge}>
              Introducing Content Lab
            </div>

            <H3 className={styles.mainHeadline}>
              Turn trends into timely content
            </H3>
            
            <Body className={styles.subHeadline}>
              Access <strong>fresh insights</strong> and viral stories in one place, helping content writers find inspiration and write their next standout article with confidence.
            </Body>
            
            <Link href="/topics">
              <Button 
                size="large"
                variant="primary"
                rightGlyph={<Icon glyph="Sparkle" />}
              >
                Discover Trending Stories
              </Button>
            </Link>
          </div>
          
          <div className={styles.newsSection}>
            
            <TopNews />
          </div>
        </div>
      </div>
      
      <div className={styles.dividerLine}></div>
      
      <div className={styles.viralSection}>
        <ViralPosts />
      </div>
    </section>
  );
}