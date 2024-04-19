import React, { useState, useEffect } from 'react';



function GifViewer() {
  const [gif, setGif] = useState([]);
  const [numGifs, setNumGifs] = useState(9)
  useEffect(() => {
    console.log(fetchGif());
  }, []);

  const fetchGif = async () => {
    try {
      const apiKey = 'QNgyi3B8yL0SH28gMXXWc9E4q5jcajpB';
      const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=&rating=g`);
      const fetchedGifs = [];
      for (let i = 0; i < numGifs; i++) {
        const individualResponse = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=&rating=g`);
        const individualData = await individualResponse.json();
        fetchedGifs.push(individualData.data);
      }
      setGif(fetchedGifs);
    } catch (error) {
      console.error('Error fetching gifs:', error);
    }
  };

  

  const shuffleImages = () => {
    // Create a copy of the gifs array to avoid mutating the original state
    const shuffledGifs = [...gif]; // Spread operator for copying
    for (let i = shuffledGifs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledGifs[i], shuffledGifs[j]] = [shuffledGifs[j], shuffledGifs[i]];
    }
    setGif(shuffledGifs); // Update state with shuffled GIFs
  };

  const handleNumGifsChange = (event) => {
    const newNumGifs = parseInt(event.target.value); // Convert input to number
    setNumGifs(Math.min(Math.max(newNumGifs, 1), 9)); // Limit range to 1-9
  };  

  return (
    <>
      <div>
      <div className="gif-container">
      {numGifs > 0 && gif.map((gif, index) => (
        <div className='gif-image'>
          <img key={index} src={gif.images.original.url} alt={`GIF ${index + 1}`} />
        </div>))}
      </div>
      <div className="controls">
        <label htmlFor="numGifs">Number of GIFs:</label>
        <select id="numGifs" value={numGifs} onChange={handleNumGifsChange}>
          <option value="3">3 GIFs</option>
          <option value="6">6 GIFs</option>
          <option value="9">9 GIFs</option>
        </select>
        <button onClick={shuffleImages}>Shuffle GIFs</button>
      </div>
    </div>
    </>
    )
  }

export default GifViewer;
