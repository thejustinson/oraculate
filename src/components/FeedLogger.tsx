// src/components/FeedLogger.tsx
import React from 'react';
import useSwitchboardFeed from '../hooks/useSwitchboardFeed';

const FeedLogger: React.FC = () => {
  const { feedResults, loading, error } = useSwitchboardFeed({
    endpoint: 'https://crossbar.switchboard.xyz',
    feeds: [
      '6qmsMwtMmeqMgZEhyLv1Pe4wcqT5iKwJAWnmzmnKjf83', // Example feed 1
      'B3ZwcSoNo75VNbABMd8bdjrEaLj87EMQ3TkDWnVrFkcX'  // Example feed 2
    ],
    interval: 10000 // 10 seconds
  });

  if (loading) {
    console.log('Loading...');
    return <div>Loading...</div>;
  }

  if (error) {
    console.error('Error:', error);
    return <div>Error: {error}</div>;
  }

  console.log(feedResults.length, 'results found');
  return <div>Check the console for feed data.</div>;
};

export default FeedLogger;