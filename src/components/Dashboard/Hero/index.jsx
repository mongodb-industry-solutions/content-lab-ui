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
import DotBackground from '@/components/external/DotBackground';
import { GradientBackground } from '@/components/external/GradientBackground';
import Icon from '@leafygreen-ui/icon';

export default function Hero() {
  return (
    <section className={styles.heroContainer}>
      <DotBackground className={styles.dotBackgroundWrapper} />
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
              Discover trending news and viral content powered by <strong>vector search</strong>. Skip the endless scrolling and research with smart recommendations that keep you ahead of the curve.
            </Body>
            
            <div className={styles.buttonGroup}>
              <Link href="/topics">
                <Button 
                  size="large"
                  variant="primary"
                  className={styles.ctaButton}
                  rightGlyph={<Icon glyph="Sparkle" />}
                >
                  Browse Topics
                </Button>
              </Link>
              
              <Link href="/saved">
                <Button 
                  size="large"
                  variant="default"
                  className={styles.ctaButton}
                  rightGlyph={<Icon glyph="Cursor" />}
                >
                  My Drafts
                </Button>
              </Link>
            </div>
          </div>
          
          <div className={styles.newsSection}>
            <GradientBackground className={styles.gradientBackground} />
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