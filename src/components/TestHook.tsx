import React from 'react';
import usePythPriceFeed from '../hooks/usePythPriceFeed'; // Adjust the path as per your project structure

const TestHook: React.FC<{ endpoint: string; priceFeedIds: string[] }> = ({ endpoint, priceFeedIds }) => {
  const { priceFeeds, loading, error } = usePythPriceFeed({ endpoint, priceFeedIds });

  // Log priceFeeds whenever it updates
  React.useEffect(() => {
    console.log("Price Feeds Updated:", priceFeeds);
  }, [priceFeeds]);

  // Handle loading and error states if needed
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return null; // You can render additional UI components here if needed
};

export default TestHook;
