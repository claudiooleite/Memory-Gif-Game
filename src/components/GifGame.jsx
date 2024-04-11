import React, { useState, useEffect } from 'react';

function GifViewer() {
  const [gif, setGif] = useState(null);

  useEffect(() => {
    fetchGif();
  }, []);

  const fetchGif = async () => {
    try {
      const apiKey = 'eJ4xjmgMHEWBn7mRZN8ZqNragw0Rzzjq';
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
    <>
      <div className="gif-container">
        {gif && <img className="gif-image" src={gif.images.original.url} alt="Random Gif" />}
      </div>
      <div>
        <button onClick={handleRefreshClick}>Refresh</button>
      </div>
    </>
  );
}

export default GifViewer;