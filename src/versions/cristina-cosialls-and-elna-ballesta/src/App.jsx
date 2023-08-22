import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react";
import Game from './components/Game'
import LevelSettings from './components/LevelSettings';
import { saveLevelSettings } from './logic/storage/storage.js';
import './App.css';

function App() {

  const changeGameLevel = (level) => {
    setGameLevel(level)
  }

  const [gameLevel, setGameLevel] = useState(() => {
    const levelFromStorage = window.localStorage.getItem('level')
    return levelFromStorage ? levelFromStorage : 'Easy'
  })
  const [width, setWidth] = useState(8)
  const [height, setHeight] = useState(8)
  const [numberMines, setNumberMines] = useState(10)

  useEffect(() => {
    switch (gameLevel) {
      case 'Easy':
        setWidth(8)
        setHeight(8)
        setNumberMines(10)
        saveLevelSettings('Easy')
        break
      case 'Intermediate':
        setWidth(16)
        setHeight(16)
        setNumberMines(40)
        saveLevelSettings('Intermediate')
        break
      case 'Expert':
        setWidth(30)
        setHeight(16)
        setNumberMines(99)
        saveLevelSettings('Expert')
        break
    }
  }, [gameLevel])

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={
          <>
            <Game width={width} height={height} numberMines={numberMines} test={false} />
            <LevelSettings changeGameLevel={changeGameLevel} />
          </>
        }>
        </Route>
        <Route path='/test' element={
          <Game width={width} height={height} numberMines={numberMines} test={true} />
        }>
        </Route>
      </Routes>
    </div>
  );
}

export default App;