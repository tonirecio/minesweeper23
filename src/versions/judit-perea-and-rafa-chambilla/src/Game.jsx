import Board from './components/Board'
import GameStatus from './components/GameStatus'
import Timer from './components/Timer'

import { useState } from 'react'

function Game () {
  const [gameState, setGameState] = useState('paused')
  const [mineCounter, setMineCounter] = useState(10)

  return (
    <>
      <div className='header'>
        <div className='mines counter'>{mineCounter}</div>
        <GameStatus gameState={gameState} />
        <Timer gameState={gameState} />
      </div>

      <Board
        onWin={() => setGameState('win')}
        onLose={() => setGameState('lose')}
        inProcess={() => setGameState('playing')}
        onPaused={() => setGameState('paused')}
        onFlaggedCell={() => setMineCounter(mineCounter - 1)}
        onUnflaggedCell={() => setMineCounter(mineCounter + 1)}
        onReset={() => {
          setMineCounter(10)
          setGameState('paused')
        }}
      />
    </>
  )
}

export default Game
