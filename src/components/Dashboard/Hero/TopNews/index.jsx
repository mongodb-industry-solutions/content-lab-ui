"use client";

/**
 * Top News component for the headline
 * Contains the news cards with DotBackground and auto-rotation functionality
 */

import React, { useState, useEffect } from 'react';
import { H3, Body } from '@leafygreen-ui/typography';
import { InfoSprinkle } from '@leafygreen-ui/info-sprinkle';
import NewsCard from './NewsCard';
import MetricsChart from './MetricsChart';
import { fetchNews } from '@/api/news_api';
import Loading from '../Loading';
import { fallbackNews } from '@/utils/constants';
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
        setNews(fallbackNews); // Set news to fallback if error
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
      }, 250);
    }, 7500); // Change card every 7.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.topNewsWrapper}>
      <div className={styles.headerContainer}>
        <H3 className={styles.sectionTitle}>
          Trending News & Insights
        </H3>
        <InfoSprinkle
          triggerProps={{
            'aria-label': 'News Metrics Info',
          }}
        >
          The engagement metrics shown are simulated for demonstration purposes.
        </InfoSprinkle>
      </div>
      <Body className={styles.sectionSubtitle}>
        Real-time analysis from trusted news sources to power our content recommendations.
      </Body>

      {isLoading ? (
        <Loading />
      ) : (
        <div className={`${styles.contentGrid} ${isVisible ? styles.visible : styles.hidden}`}>
          <NewsCard article={news[currentIndex]} currentIndex={currentIndex} />
          <MetricsChart article={news[currentIndex]} />
        </div>
      )}
    </div>
  );
}
