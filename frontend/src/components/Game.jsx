import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EntityCard from './EntityCard';
import ScoreBoard from './ScoreBoard';

const Game = () => {
  const [entities, setEntities] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [activeCard, setActiveCard] = useState(0);  
  const [isLoading, setIsLoading] = useState(false);  

  
  const fetchEntities = async () => {
    setIsLoading(true);  
    try {
      const response = await axios.get('http://127.0.0.1:5000/get-random-entities');
      setEntities([response.data.entity1, response.data.entity2]);
    } catch (error) {
      console.error('Error fetching entities:', error);
    } finally {
      setIsLoading(false);  
    }
  };

  
  useEffect(() => {
    fetchEntities();
  }, []);

  
  const handleGuess = (guess) => {
    const [entity1, entity2] = entities;
    const isCorrect =
      (guess === 'higher' && entity1.score > entity2.score) ||
      (guess === 'lower' && entity1.score < entity2.score);

    if (isCorrect) {
      setScore(score + 1);

      
      setActiveCard(1); 
      setTimeout(() => {
        fetchEntities(); 
        setActiveCard(0); 
      }, 500); 
    } else {
      setGameOver(true); 
    }
  };

  
  const resetGame = () => {
    setScore(0);
    setGameOver(false);
    setActiveCard(0);  
    fetchEntities();  
  };

  if (entities.length === 0) return <div>Loading...</div>;

  return (
    <div className="text-center">
      <ScoreBoard score={score} />
      {!gameOver ? (
        <>
          <div className="flex justify-center space-x-8 mt-8">
            {/* Loading state: Show a spinner or message if the data is still loading */}
            {isLoading ? (
              <div className="text-3xl">Loading...</div>
            ) : (
              <>
                <EntityCard entity={entities[0]} active={activeCard === 0} />
                <EntityCard entity={entities[1]} active={activeCard === 1} />
              </>
            )}
          </div>
          <div className="mt-8">
            <button
              className="bg-green-500 px-4 py-2 rounded-lg mx-2 hover:bg-green-600"
              onClick={() => handleGuess('higher')}
              disabled={isLoading}  
            >
              Higher
            </button>
            <button
              className="bg-red-500 px-4 py-2 rounded-lg mx-2 hover:bg-red-600"
              onClick={() => handleGuess('lower')}
              disabled={isLoading}  
            >
              Lower
            </button>
          </div>
        </>
      ) : (
        <div className="mt-8">
          <h2 className="text-2xl text-white font-bold border px-4 py-2 bg-black rounded-md">Game Over! Final Score: {score}</h2>
          <button
            className="bg-blue-500 px-4 py-2 mt-4 rounded-lg hover:bg-blue-600"
            onClick={resetGame}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;
