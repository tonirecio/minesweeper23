import { useState, useEffect } from "react"
import { CELL_VALUES } from "../MinesweeperConstants"
import * as BOARD_BEHAVIOUR from "../Engine/BoardBehavior"
import * as CELL_BEHAVIOUR from "../Engine/CellBehavior"
import './MinesweeperInfo.css'
import React from 'react'

export function MineInfo ({ totalFlags, gameFinished, setCells, setMines}) {
  
  const [time, setTime] = useState([0,0])
  const [nextMines, setNextMines] = useState(10)
  const [nextSize, setNextSize] = useState(10)

  const handleIncrement = (type) => {
    if (type === 'Height') setNextSize(prevValue => Math.min(prevValue + 1, 11))
    else if (type === 'Mines') setNextMines(prevValue => prevValue + 1)
  }

  const handleDecrement = (type) => {
    if (type === 'Height') setNextSize(prevValue => Math.max(prevValue - 1, 1))
    else if (type === 'Mines') setNextMines(prevValue => Math.max(prevValue - 1, 1))
  }

  const sumar1Sec = (currentTime) => {
        var [mins, secs] = currentTime
        secs++
        if (secs >= 60) {
            secs = 0
            mins++
        }
        setTime([mins, secs])
  }

  const newGame = () => {
    var newBoard = BOARD_BEHAVIOUR.newPreparedBoard(nextSize, nextMines)
    var newCells = CELL_BEHAVIOUR.inicialiceCells(newBoard)
    setCells(newCells)
    setMines(nextMines)
    setTime([0,0])
  }

  useEffect(() => {
    const intervalId = setInterval(() => { if (gameFinished == false) sumar1Sec(time)}, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [time])

  return (
    <div className="Info-panel">
        <div className="header-info"> Game Info </div>
        <br/>
        <div className="info">&nbsp;&nbsp;&nbsp;Time: {time[0]} mins {time[1]} sec</div>
        <div className="info" data-testid="flags" value={totalFlags}>&nbsp;&nbsp;&nbsp;{CELL_VALUES.TAGGED} Flags Remaining: {totalFlags}</div>
        <br/><br/>
        <div className="header-info" onClick={newGame}> New Game </div>
        <div className="info center">Size:&nbsp;&nbsp;&nbsp;
            <button onClick={() => handleDecrement('Height')}>-</button>
            <input
                className="input-Width"
                type="number"
                min="1"
                max="11"
                value={nextSize}
                onChange={(event) => setNextSize(Number(event.target.value))}
            />
            <button onClick={() => handleIncrement('Height')}>+</button>
        </div>
        <div className="info center">Mines:&nbsp;&nbsp;&nbsp;
            <button onClick={() => handleDecrement('Mines')}>-</button>
            <input
                className="input-Width"
                type="number"
                min="1"
                max={(nextSize * nextSize - 1) + ""}
                value={nextMines}
                onChange={(event) => setNextMines(Number(event.target.value))}
            />
            <button onClick={() => handleIncrement('Mines')}>+</button>
        </div>
    </div>
  )
}
