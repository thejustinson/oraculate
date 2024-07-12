import { useState, useEffect, useRef } from 'react';
import { CrossbarClient } from '@switchboard-xyz/common';

interface FeedResult {
  feed: string;
  results: number[];
  feedHash: string;
}

interface useSwitchboardFeedOptions {
  endpoint: string;
  feeds: string[];
  interval: number;
}

const useSwitchboardFeed = ({ endpoint, feeds, interval }: useSwitchboardFeedOptions) => {
  const [feedResults, setFeedResults] = useState<FeedResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const crossbarClientRef = useRef<CrossbarClient | null>(null);

  useEffect(() => {
    crossbarClientRef.current = new CrossbarClient(endpoint);

    const fetchFeedResults = async () => {
      try {
        if (!crossbarClientRef.current) {
          throw new Error('CrossbarClient not initialized');
        }

        const results = await crossbarClientRef.current.simulateSolanaFeeds(
          'mainnet', // Change to "devnet" if needed
          feeds
        );

        results.forEach(simulation => {
          console.log(`Feed Public Key ${simulation.feed} job outputs: ${simulation.results}`);
        });

        setFeedResults(results);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedResults();

    const intervalId = setInterval(fetchFeedResults, interval);

    return () => {
      clearInterval(intervalId);
      crossbarClientRef.current = null;
    };
  }, [endpoint, feeds, interval]);

  return { feedResults, loading, error };
};

export default useSwitchboardFeed;