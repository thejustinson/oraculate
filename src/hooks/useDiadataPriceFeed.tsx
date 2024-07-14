import { useState, useEffect } from 'react';
import axios from 'axios';

const DIA_API_URL = 'https://api.diadata.org/v1/quotation';

interface PriceData {
  symbol: string;
  price: number | null;
}

const useDiadataPriceFeed = (symbol: string, interval: number = 1000) => {
  const [price, setPrice] = useState<PriceData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(`${DIA_API_URL}/${symbol}`);
        setPrice({ symbol, price: response.data.Price });
      } catch (err) {
        if (axios.isAxiosError(err)) {
          // Handle Axios-specific error
          setError(err.message);
        } else if (err instanceof Error) {
          // Handle general error
          setError(err.message);
        } else {
          // Handle unknown error
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
    const intervalId = setInterval(fetchPrice, interval);

    return () => clearInterval(intervalId);
  }, [symbol, interval]);

  return { price, loading, error };
};

export default useDiadataPriceFeed;