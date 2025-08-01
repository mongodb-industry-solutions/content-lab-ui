"use client";

/**
 * Headline component for the landing page
 * Contains the headline, subtitle and the globe (very cool globe)
 */

import React from 'react';
import { H3, Subtitle, Body } from '@leafygreen-ui/typography';
import Card from '@leafygreen-ui/card';
import Button from '@leafygreen-ui/button';
import Link from 'next/link';
import styles from './Headline.module.css';
import Globe from '@/components/external/Globe';
import FloatingCards from './FloatingCards';
import Icon from '@leafygreen-ui/icon';

export default function Headline() {
  return (
    <section className={styles.headlineSection}>
      <Card className={styles.heroCard}>
        <div className={styles.twoColumnLayout}>
          <div className={styles.contentColumn}>
            <Card className={styles.contentCard}>

              <Subtitle className={styles.subtitle}>
                Introducing The Content Lab
              </Subtitle>

              <H3 className={styles.mainHeadline}>
                Turn Trends Into Timely Content
              </H3>
              
              <Body className={styles.subHeadline}>
              Discover trending news and viral content powered by <strong>vector search</strong>. Skip the endless scrolling and research with smart recommendations that keep you ahead of the curve.
              </Body>
              
              <Link href="/topics">
                <Button 
                  size="large"
                  variant="primary"
                  className={styles.ctaButton}
                  rightGlyph={<Icon glyph="Sparkle" />}
                >
                  Try It Now
                </Button>
              </Link>
              
            </Card>
          </div>
          <div className={styles.globeColumn}>
            <Globe />
          </div>
        </div>
        
        {/* Floating Cards */}
        <FloatingCards />
      </Card>
      
    </section>
  );
} 