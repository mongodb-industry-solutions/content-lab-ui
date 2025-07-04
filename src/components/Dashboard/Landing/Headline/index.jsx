"use client";

import React from 'react';
import { H2, Subtitle, Body } from '@leafygreen-ui/typography';
import Card from '@leafygreen-ui/card';
import Button from '@leafygreen-ui/button';
import Link from 'next/link';
import styles from './Headline.module.css';
import Globe from '@/components/external/Globe';
import FloatingCards from './FloatingCards';

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
              <H2 className={styles.mainHeadline}>
                Turn Trends Into Timely Content
              </H2>
              <Body className={styles.subHeadline}>
              Discover trending news and viral content in real-time. Our intelligent system analyzes engagement patterns to recommend the best topics for your next piece, keeping you ahead of the curve.
              </Body>
              <div className={styles.buttonContainer}>
                <Link href="/topics" className={styles.ctaLink}>
                  <Button className={styles.primaryButton}>
                    Try It Now!
                  </Button>
                </Link>
              </div>
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