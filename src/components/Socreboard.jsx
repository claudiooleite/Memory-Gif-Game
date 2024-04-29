import React, { useState } from 'react';

function Scoreboard({ gif }) {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedIds, setClickedIds] = useState([]);

  const handleClick = (id) => {
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
      <h1>Score = {score}</h1>
      <h1>Best Score = {bestScore}</h1>
    </div>
  );
}

export default Scoreboard;