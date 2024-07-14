import { useState } from 'react';

// Function to get crypto icon URL
const useCryptoIcon = (cryptoSymbol: string) => {
  const [iconUrl, setIconUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const url = `https://assets.coincap.io/assets/icons/${cryptoSymbol.toLowerCase()}@2x.png`;

  // Check if the image exists
  const checkImage = () => {
    const img = new Image();
    img.onload = () => setIconUrl(url);
    img.onerror = () => setError(`Icon not found for ${cryptoSymbol}`);
    img.src = url;
  };

  
    checkImage()

  return { iconUrl, error };
};

export default useCryptoIcon;