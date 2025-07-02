import React from 'react';

import SearchBar from '@/components/Dashboard/Topics/Search/SearchBar';
import Suggestions from '@/components/Dashboard/Topics/Suggestions';
import Divider from '@/components/external/Divider';

export default function TopicsPage() {
  return (
    <>
      <SearchBar />
      <Divider />
      <Suggestions />
    </>
  );
}