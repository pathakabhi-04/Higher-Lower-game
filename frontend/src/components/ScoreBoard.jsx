import React from 'react';

const ScoreBoard = ({ score }) => {
  return (
    <div className="text-2xl font-bold text-white px-4 py-1 border rounded-md bg-black">
      Score: <span className="text-white">{score}</span>
    </div>
  );
};

export default ScoreBoard;
