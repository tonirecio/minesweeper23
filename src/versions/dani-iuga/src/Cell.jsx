import React from 'react';

export function Cell({ value, onClick }) {

  const handleClick = () => {
    onClick();
  };

  const cellClassName = `cellStyle ${value.isRevealed ? 'revealed' : ''} ${value.isClickedMine ? 'cellMineStyle' : ''}`;

  return (
    <div
      className={cellClassName}
      onClick={handleClick}>
      {
        value.isRevealed && value.isMine ? '💣' :
          value.isRevealed && value.count !== 0 ? value.count :
            value.isFlagged ? (
              <span>🚩</span>
            ) : value.isQuestion ? (
              <span>❓</span>
            ) : null}
    </div>
  );
};

export default Cell;

/*
{value.isRevealed && value.count > 0 ? (
        <div style={{ color: value.count === 1 ? 'blue' : value.count === 2 ? 'green' : value.count === 3 ? 'red' : 'black' }}>{value.count}</div>
      ) : null}
*/