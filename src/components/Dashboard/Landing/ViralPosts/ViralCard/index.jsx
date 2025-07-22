"use client";

/**
 * Viral post card component for the viral posts component
 * Contains the viral post card with the title, author, subreddit, comments, reposts and likes
 */

import React from 'react';
import Icon from '@leafygreen-ui/icon';
import Card from '@leafygreen-ui/card';
import { Body, Subtitle } from '@leafygreen-ui/typography';
import { getRelativeTime } from '@/utils/generalUtils';
import Image from 'next/image';
import styles from './ViralCard.module.css';

export default function ViralCard({ viralPost }) {
  const {
    _id = "123",
    title = "Title",
    author = "Author",
    subreddit = "Subreddit",
    reddit_metrics = {},
    created_at =  new Date(),
  } = viralPost;

  const {
    subscribers: likes = 0,
    score: reposts = 0,
    num_comments: comments = 0,
  } = reddit_metrics;

  const avatarIndex = (likes % 3) + 1;
  const avatar = `/users/avatar${avatarIndex}.png`;

  const relativeTimestamp = getRelativeTime(created_at);

  return (
    <Card key={_id} className={styles.tweetCard}>
      <div className={styles.tweetHeader}>
        <Image 
          src={avatar}
          alt={subreddit}
          width={40}
          height={40}
          className={styles.avatar}
        />
        <div className={styles.authorInfo}>
          <div className={styles.nameContainer}>
            <Subtitle className={styles.handle}>{`r/${subreddit}`}</Subtitle>
          </div>
          <Body className={styles.username}>{`u/${author}`}</Body>
        </div>
        {relativeTimestamp && (
          <Body className={styles.timestamp}>{relativeTimestamp}</Body>
        )}
      </div>

      <Body className={styles.tweetContent}>{title}</Body>

      <div className={styles.tweetStats}>
        <div className={styles.stat}>
          <Icon glyph="Highlight" className={styles.statIcon} />
          <Body className={styles.statText}>{comments.toLocaleString()}</Body>
        </div>
        <div className={styles.stat}>
          <Icon glyph="Refresh" className={styles.statIcon} />
          <Body className={styles.statText}>{reposts.toLocaleString()}</Body>
        </div>
        <div className={styles.stat}>
          <Icon glyph="ArrowUp" className={styles.statIcon} />
          <Body className={styles.statText}>{likes.toLocaleString()}</Body>
        </div>
      </div>
    </Card>
  );
} 