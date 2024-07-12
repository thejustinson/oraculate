// src/hooks/usePythPriceFeed.tsx
import { useState, useEffect, useRef } from 'react';
import { PriceServiceConnection, PriceFeed } from '@pythnetwork/price-service-client';

interface UsePythPriceFeedOptions {
  endpoint: string;
  priceFeedIds: string[];
}

const usePythPriceFeed = ({ endpoint, priceFeedIds }: UsePythPriceFeedOptions) => {
  const [priceFeeds, setPriceFeeds] = useState<PriceFeed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const connectionRef = useRef<PriceServiceConnection | null>(null);

  useEffect(() => {
    const fetchPriceFeeds = async () => {
      try {
        const connection = new PriceServiceConnection(endpoint);
        connectionRef.current = connection;
        const priceData = await connection.getLatestPriceFeeds(priceFeedIds);
        if (priceData) {
          setPriceFeeds(priceData);
        } else {
          setError('Failed to fetch price feeds.');
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPriceFeeds();

    return () => {
      // Clean up the WebSocket connection when the component is unmounted
      if (connectionRef.current) {
        connectionRef.current.closeWebSocket();
      }
    };
  }, [endpoint, priceFeedIds]);

  useEffect(() => {
    if (connectionRef.current) {
      connectionRef.current.subscribePriceFeedUpdates(priceFeedIds, (priceFeed) => {
        setPriceFeeds((prevPriceFeeds) => {
          const index = prevPriceFeeds.findIndex((pf) => pf.id === priceFeed.id);
          if (index !== -1) {
            const updatedPriceFeeds = [...prevPriceFeeds];
            updatedPriceFeeds[index] = priceFeed;
            return updatedPriceFeeds;
          }
          return [...prevPriceFeeds, priceFeed];
        });
      });
    }
  }, [priceFeedIds]);

  return { priceFeeds, loading, error };
};

export default usePythPriceFeed;