"use client";

/**
 * Viral posts component for the landing page
 * Contains the viral posts cards and the flickering grid background
 */

import React, { useEffect, useState } from 'react';
import { H3, Body } from '@leafygreen-ui/typography';
import { Marquee } from '@/components/external/Marquee';
import ViralCard from './ViralCard';
import Loading from '../Loading';
import { fetchRedditPosts } from '@/api/reddit_api';
import styles from './ViralPosts.module.css';
import { fallbackViralPosts } from '@/utils/constants';

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
        setViralPosts(fallbackViralPosts); // Set viral posts to fallback if error
      } finally {
        setIsLoading(false);
      }
    };
    fetchViralPosts();
  }, []);

  return (
    <section className={styles.viralPostsSection}>
      <H3 className={styles.sectionTitle}>
        See What's Going Viral Right Now
      </H3>
      <Body className={styles.sectionSubtitle}>
        Real-time viral content analysis to identify trending conversations and topics for your content strategy.
      </Body>

      <div className={styles.dividerLine}></div>
      
      <div className={styles.marqueeContainer}>
        {isLoading ? (
          <Loading />
        ) : (
          <Marquee className={styles.marquee} pauseOnHover={true}>
            {viralPosts.map((viralPost) => (
              <div key={viralPost._id} className={styles.redditWrapper}>
                <ViralCard viralPost={viralPost} />
              </div>
            ))}
          </Marquee>
        )}
      </div>
    </section>
  );
}
