import React, { useState, useEffect } from 'react';

function GifViewer() {
  const [gif, setGif] = useState(null);

  useEffect(() => {
    fetchGif();
  }, []);

  const fetchGif = async () => {
    try {
      const apiKey = '60k2XvJwmatoWlcE4TDNV8f3miQjcKuv';
      const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=&rating=g`);
      const { data } = await response.json();
      setGif(data);
    } catch (error) {
      console.error('Error fetching gif:', error);
    }
  };

  const handleRefreshClick = () => {
    fetchGif();
  };

  return (
    <div>
      {gif && <img src={gif.images.original.url} alt="Random Gif" />}
      <button onClick={handleRefreshClick}>Refresh</button>
    </div>
  );
}

export default GifViewer;