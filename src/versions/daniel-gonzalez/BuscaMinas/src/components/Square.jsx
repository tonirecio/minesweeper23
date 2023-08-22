import React from 'react';

const Square = ({ value, onClick, onRightClick }) => {
  return (
    <div className={`square ${value !== null ? 'clicked' : ''}`} onClick={onClick} onContextMenu={onRightClick}>
      {value}
    </div>
    
  );
  
};

export default Square;
