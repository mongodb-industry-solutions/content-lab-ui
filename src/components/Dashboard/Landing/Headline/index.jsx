"use client";

import React, { useState } from 'react';
import { H2, Subtitle, Body } from '@leafygreen-ui/typography';
import Card from '@leafygreen-ui/card';
import Button from '@leafygreen-ui/button';
import Link from 'next/link';
import InfoWizard from '@/components/external/InfoWizard';
import { LANDING_INFO_WIZARD } from '@/lib/constants';
import styles from './Headline.module.css';
import Globe from '@/components/external/Globe';
import FloatingCards from './FloatingCards';

export default function Headline() {
  const [openHelpModal, setOpenHelpModal] = useState(false);

  return (
    <section className={styles.headlineSection}>
      <Card className={styles.heroCard}>
        <div className={styles.twoColumnLayout}>
          <div className={styles.contentColumn}>
            <Card className={styles.contentCard}>
              <Subtitle className={styles.subtitle}>
                Introducing The Content Lab
              </Subtitle>
              <div className={styles.headlineWithInfo}>
                <H2 className={styles.mainHeadline}>
                  Turn Trends Into Timely Content
                </H2>
                <InfoWizard
                  open={openHelpModal}
                  setOpen={setOpenHelpModal}
                  tooltipText="Learn how MongoDB powers this platform"
                  iconGlyph="Wizard"
                  sections={LANDING_INFO_WIZARD}
                />
              </div>
              <Body className={styles.subHeadline}>
              Discover trending news and viral content powered by <strong>vector search</strong>. Skip the endless scrolling and research as our smart recommendations surface the perfect topics for your next piece, keeping you productive and ahead of the curve.
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