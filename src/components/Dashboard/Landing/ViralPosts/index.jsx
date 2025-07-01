"use client";

import React, { useEffect, useState } from 'react';
import { H2, Body } from '@leafygreen-ui/typography';
import { Marquee } from '@/components/external/Marquee';
import ViralCard from './ViralCard';
import Loading from './Loading';
import { FlickeringGrid } from '@/components/external/FlickeringGrid';
import { fetchRedditPosts } from '@/lib/mongo-client';
import styles from './ViralPosts.module.css';

export default function ViralPosts() {
  const [viralPosts, setViralPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchViralPosts = async () => {
      try {
        setIsLoading(true);
        const posts = await fetchRedditPosts();
        setViralPosts(posts);
      } catch (error) {
        throw new Error('Failed to load viral posts');
      } finally {
        setIsLoading(false);
      }
    };
    fetchViralPosts();
  }, []);

  return (
    <section className={styles.viralPostsSection}>
      {/* Flickering Grid Background */}
      <FlickeringGrid
        className={styles.flickeringGrid}
        squareSize={4}
        gridGap={6}
        color="#0498EC"
        maxOpacity={0.5}
        flickerChance={0.1}
      />
      
      {/* Content */}
      <div className={styles.container}>
        <H2 className={styles.sectionTitle}>
          See What's Going Viral Right Now
        </H2>
        <Body className={styles.sectionSubtitle}>
          Real-time viral content analysis to identify trending conversations and topics for your content strategy.
        </Body>
        
        <div className={styles.marqueeContainer}>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              <div className={styles.fadeLeft}></div>
              <Marquee className={styles.marquee} pauseOnHover={true}>
                {viralPosts.map((viralPost) => (
                  <div key={viralPost._id} className={styles.tweetWrapper}>
                    <ViralCard viralPost={viralPost} />
                  </div>
                ))}
              </Marquee>
              <div className={styles.fadeRight}></div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
