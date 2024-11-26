import React from 'react';

const EntityCard = ({ entity, active }) => {
  return (
    <div
      className={`p-6 w-64 rounded-lg shadow-lg bg-gray-800 transition-all 
        ${active ? 'border-4 border-yellow-500 shadow-2xl scale-105' : ''}`}
    >
      <h3 className="text-xl font-bold">{entity.name}</h3>
      <p className="mt-2 text-gray-400">{entity.description}</p>
      {/* <p className="mt-4 text-yellow-500">Score: {entity.score}</p> */}
    </div>
  );
};

export default EntityCard;
