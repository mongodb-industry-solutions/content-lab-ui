"use client";

import React, { useState, useEffect } from 'react';
import { fetchTopics } from '@/lib/mongo-client';
import { H3 } from '@leafygreen-ui/typography';
import TopicCard from '@/components/Dashboard/Topics/Suggestions/TopicCard';

export default function Suggestions() {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        const fetchTopicsData = async () => {
          try {
            const topics = await fetchTopics();
            setTopics(topics);
          } catch (error) {
            throw new Error('Failed to load news');
          }
        };
        fetchTopicsData();
      }, []);

    return (
      <div>
        {/* Topic Cards */}
      </div>
    )
}