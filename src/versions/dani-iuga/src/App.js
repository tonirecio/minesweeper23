import React, { useState } from 'react';
import './App.css';
import { Board } from './Board.jsx';

function App() {
  const [boardSize, setBoardSize] = useState(8);
  const [mines, setMines] = useState(10);

  const handleSizeChange = (size) => {
    setBoardSize(size);
  };

  const handleMinesChange = (minesCount) => {
    setMines(minesCount);
  };

  return (
    <div className="App">
      <div className="options-panel">
        <div>
          <button onClick={() => handleSizeChange(8) && handleMinesChange(10)}>8x8 Easy</button>
          <button onClick={() => handleSizeChange(16) && handleMinesChange(40)}>16x16 Medium</button>
        </div>
      </div>
      <Board rows={boardSize} cols={boardSize} mines={mines} />
    </div>
  );
}

export default App;

/*
<Board rows={8} cols={8} mines={10} />
*/