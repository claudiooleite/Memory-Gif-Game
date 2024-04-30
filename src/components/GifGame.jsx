import React, { useState, useEffect, useRef } from 'react';
import { Card, Image, SimpleGrid, Radio, RadioGroup, Stack  } from '@chakra-ui/react';

function GifViewer({ handleImageClick }) {
  const [gif, setGif] = useState([]);
  const [numGifs, setNumGifs] = useState('3'); // Initial state set to '3'
  const fetchedGifsRef = useRef([]);

  useEffect(() => {
    fetchGif();
  }, []);

  const fetchGif = async () => {
    console.log('Fetching GIFs...');
    try {
      const apiKey = 'uQB4hZ2aP7ZEBsexGPdnVkRHk08iBHgk';
      const fetchedGifs = [];
      for (let i = 0; i < 9; i++) { // Fetch 9 GIFs regardless of the selected number
        const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=&rating=g`);
        const data = await response.json();
        fetchedGifs.push(data.data);
      }
      fetchedGifsRef.current = fetchedGifs;
      setGif(fetchedGifsRef.current.slice(0, parseInt(numGifs))); // Update displayed GIFs based on the selected number
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

  const handleNumGifsChange = (value) => {
    setNumGifs(value);
    setGif(fetchedGifsRef.current.slice(0, parseInt(value))); // Update displayed GIFs based on the selected number
  };

  return (
    <>
      <SimpleGrid spacing='40px' minChildWidth='120px'>  
        {numGifs > 0 && gif.map((gifItem, id) => (
          <Card key={gifItem.id} height={gifItem.images.original.fixed_height}>
            <Image 
              src={gifItem.images.original.url} 
              alt={`GIF ${id + 1}`} 
              borderRadius='lg'
              width="100%"
              height="100%"
              objectFit="cover"
              onClick={() => { handleImageClick(gifItem.id); shuffleImages(); }}
              cursor="pointer"
            />    
          </Card>
        ))}
      </SimpleGrid>  

      <div className="controls">
        <label htmlFor="numGifs">Number of GIFs:</label>
        <RadioGroup onChange={(value) => handleNumGifsChange(value)} value={numGifs}>
          <Stack direction='row'>
            <Radio value="3" colorScheme='green'>Easy</Radio>
            <Radio value="6" colorScheme='yellow'>Medium</Radio>
            <Radio value="9" colorScheme='red'>Hard</Radio>
          </Stack>
        </RadioGroup>
        <button onClick={shuffleImages}>Shuffle GIFs</button>
      </div>
    </>
  );
}

export default GifViewer;