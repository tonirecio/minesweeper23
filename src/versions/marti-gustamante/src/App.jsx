//import './App.css';
import { GameInfo } from './components/GameInfo';
import { Board } from './components/Board';
import { DifficultySetter } from './components/DifficultySetter'
import { useState } from "react"
import { DIFFICULTY, GAME_STATUS } from './constants';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { parseMockData } from './logic/mock/mockboard';


function App() {

  const [mockBoard, setMockBoard] = useState(null)

  const [gameFeatures, setGameFeatures] = useState({ mines: 10, width: 10, height: 10 })
  const [availableFlags, setAvailableFlags] = useState(gameFeatures.mines)
  const [gameStatus, setGameStatus] = useState(GAME_STATUS.NONE)

  const updateAvailableFlags = (increment) => {
    setAvailableFlags(availableFlags + increment)
  }

  // Remove if not testing
  const changeFeatures = async () => {
    if (document.getElementById('mockdata') && document.getElementById('mockdata').value !== '') {
      const mockdata = await parseMockData(document.getElementById('mockdata').value)
      setGameFeatures(mockdata.gameFeatures)
      setAvailableFlags(mockdata.gameFeatures.mines)
      setGameStatus(GAME_STATUS.RESET)
      setMockBoard(mockdata.board)
    }

  }

  const updateGameStatus = (status) => {
    if (status === GAME_STATUS.RESET) {
      setAvailableFlags(gameFeatures.mines)
      setMockBoard(null) // Remove if not testing
    } else if (status === GAME_STATUS.WON) {
      setAvailableFlags(0)
    }
    setGameStatus(status)
  }

  const setGameDifficulty = (difficulty) => {
    setMockBoard(null)
    if (difficulty === DIFFICULTY.EASY) {
      setGameFeatures({ mines: 10, width: 10, height: 10 })
      setAvailableFlags(10)
    } else if (difficulty === DIFFICULTY.MEDIUM) {
      setGameFeatures({ mines: 40, width: 16, height: 16 })
      setAvailableFlags(40)
    } else if (difficulty === DIFFICULTY.HARD) {
      setGameFeatures({ mines: 99, width: 30, height: 16 })
      setAvailableFlags(99)
    }
    updateGameStatus(GAME_STATUS.NONE)
  }

  return (
    <main className='pageContent'>
      <textarea data-testid='mockdata' id='mockdata'></textarea>
      <button type='submit' data-testid='mockbutton' id='mockbutton' onClick={changeFeatures}>mock</button>
      <h1>Buscamines (o almenys, un intent)</h1>
      <GameInfo
        availableFlags={availableFlags}
        updateGameStatus={updateGameStatus}
        gameStatus={gameStatus}
      />

      <Board
        mockBoard={mockBoard}
        updateAvailableFlags={updateAvailableFlags}
        gameFeatures={gameFeatures}
        updateGameStatus={updateGameStatus}
        gameStatus={gameStatus}
      />

      <DifficultySetter
        setGameDifficulty={setGameDifficulty}
      />
    </main>
  )
}
export default App;