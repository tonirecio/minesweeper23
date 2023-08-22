import React from 'react'
import './App.css';
import { Minesweeper } from '../Minesweeper/Minesweeper';

function App() {
  return (
    <Minesweeper size={10} totalMines={10}/>
  );
}

export default App;