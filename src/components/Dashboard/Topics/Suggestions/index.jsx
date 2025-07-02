"use client";

import React, { useState, useEffect } from 'react';
import { Particles } from '@/components/external/Particles';
import { fetchTopics } from '@/lib/mongo-client';
import { H2 } from '@leafygreen-ui/typography';

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
            <H2>Suggested Topics</H2>
            {topics.message}
            {/* <Particles /> */}
        </div>
    )
}