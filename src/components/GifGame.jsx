import React, { useState, useEffect, useRef } from 'react';
import { Card, Image, SimpleGrid, Button } from '@chakra-ui/react'


function GifViewer({ handleImageClick }) {
  const [gif, setGif] = useState([]);
  const [numGifs, setNumGifs] = useState(9);
  const fetchedGifsRef = useRef([]);
  

  useEffect(() => {
    fetchGif();
  }, []);

  const fetchGif = async () => {
    console.log('Fetching GIFs...')
    try {
      if (fetchedGifsRef.current.length === 0) {
        const apiKey = 'JYnU7IUVIe3raO5IATiHnEmsXBdhaTWg';
        const fetchedGifs = [];
        for (let i = 0; i < numGifs; i++) {
          const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=&rating=g`);
          const data = await response.json();
          fetchedGifs.push(data.data);
        }
        fetchedGifsRef.current = fetchedGifs;
        setGif(fetchedGifs);
      } else {
        setGif(fetchedGifsRef.current);
      }
      console.log('GIFs fetched successfully');
    } catch (error) {
      console.error('Error fetching gifs:', error);
    }
  };

  const shuffleImages = () => {
    const shuffledGifs = [...gif];
    for (let i = shuffledGifs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledGifs[i], shuffledGifs[j]] = [shuffledGifs[j], shuffledGifs[i]];
    }
    setGif(shuffledGifs);
  };

  const handleNumGifsChange = (event) => {
    const newNumGifs = parseInt(event.target.value);
    setNumGifs(newNumGifs);
    setGif(fetchedGifsRef.current.slice(0, newNumGifs)); // Update displayed GIFs based on new number
  };  

 

  return (
    <>
      <SimpleGrid  spacing='40px'  minChildWidth='120px'>  
            {numGifs > 0 && gif.map((gif, id) => (
              <Card key={gif.id} height={gif.images.original.fixed_height}>
                <Image 
                    src={gif.images.original.url} 
                    alt={`GIF ${id + 1}`} 
                    borderRadius='lg'
                    width="100%"
                    height="100%"
                    objectFit="cover"
                    onClick={() => { handleImageClick(gif.id); shuffleImages(); }}
                    cursor="pointer"
                  />    
                </Card>
            ))}
      </SimpleGrid>  

      <div className="controls">
        <label htmlFor="numGifs">Number of GIFs:</label>
        <select id="numGifs" value={numGifs} onChange={handleNumGifsChange}>
          <option value="3">3 GIFs</option>
          <option value="6">6 GIFs</option>
          <option value="9">9 GIFs</option>
        </select>
        <button onClick={shuffleImages}>Shuffle GIFs</button>
      </div>
    </>
    );
}

export default GifViewer;
