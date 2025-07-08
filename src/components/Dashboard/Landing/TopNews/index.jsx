"use client";

import React, { useState, useEffect } from 'react';
import { H2, Body } from '@leafygreen-ui/typography';
import NewsCard from './NewsCard';
import DotBackground from '@/components/external/DotBackground';
import { fetchNews } from '@/lib/mongo-client';
import Loading from './Loading';
import styles from './TopNews.module.css';

export default function TopNews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        setIsLoading(true);
        const news = await fetchNews();
        setNews(news);
      } catch (error) {
        throw new Error('Failed to load news');
      } finally {
        setIsLoading(false);
      }
    };
    fetchNewsData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === 3 ? 0 : prevIndex + 1
        );
        setIsVisible(true);
      }, 600);
    }, 6000); // Change card every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <DotBackground>
      <section className={styles.topNewsSection}>
        <div className={styles.container}>
          <H2 className={styles.sectionTitle}>
            Trending News & Insights
          </H2>
          <Body className={styles.sectionSubtitle}>
            Real-time analysis from trusted news sources to power our content recommendations.
          </Body>
          {isLoading ? (
            <Loading />
          ) : (
            <div className={styles.newsContainer}>
              <div className={`${styles.newsCardWrapper} ${isVisible ? styles.visible : styles.hidden}`}>
                <NewsCard article={news[currentIndex]} currentIndex={currentIndex} />
              </div>
            </div>
          )}
        </div>
      </section>
    </DotBackground>
  );
} 