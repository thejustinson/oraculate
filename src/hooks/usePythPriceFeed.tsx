import { useState, useEffect, useRef } from 'react';
import { PriceServiceConnection, PriceFeed } from '@pythnetwork/price-service-client';

const PYTH_ENDPOINT = 'https://hermes.pyth.network';

const usePythPriceFeed = (priceFeedId: string) => {
  const [priceFeed, setPriceFeed] = useState<PriceFeed | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const connectionRef = useRef<PriceServiceConnection | null>(null);

  useEffect(() => {
    const fetchPriceFeed = async () => {
      try {
        const connection = new PriceServiceConnection(PYTH_ENDPOINT);
        connectionRef.current = connection;
        const priceData = await connection.getLatestPriceFeeds([priceFeedId]);
        if (priceData && priceData.length > 0) {
          setPriceFeed(priceData[0]);
        } else {
          setError('Failed to fetch price feed.');
        }
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPriceFeed();

    return () => {
      if (connectionRef.current) {
        connectionRef.current.closeWebSocket();
      }
    };
  }, [priceFeedId]);

  useEffect(() => {
    if (connectionRef.current) {
      connectionRef.current.subscribePriceFeedUpdates([priceFeedId], (updatedPriceFeed) => {
        setPriceFeed(updatedPriceFeed);
      });
    }
  }, [priceFeedId]);

  return { priceFeed, loading, error };
};

export default usePythPriceFeed;