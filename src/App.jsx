import React, { useState, useRef } from 'react';
import GifViewer from './components/GifGame'
import Header from './components/Header'
import './App.css'



function App() {

  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedIds, setClickedIds] = useState([]);

  const handleImageClick = (id) => {
    if (clickedIds.includes(id)) {
      setScore(0);
      setClickedIds([]);
    } else {
      setScore(score + 1);
      setClickedIds([...clickedIds, id]);
      if (score + 1 > bestScore) {
        setBestScore(score + 1);
      }
    }
  };

  return (
  
      <div>
        <Header score={score}  bestScore={bestScore}/>
        <GifViewer handleImageClick={handleImageClick}/>
      </div>
    
  )
}

export default  App
