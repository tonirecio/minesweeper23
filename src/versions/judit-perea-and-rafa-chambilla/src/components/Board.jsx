import { useState, useEffect } from 'react'
import CreateBoard from '../utils/CreateBoard' //porque no deja importar con corchetes?
import { Cell } from './Cell'
import { isCellWithinBoard } from '../utils/Helpers'
import { DIRECTIONS } from '../utils/Constants'

function Board ({
  onWin,
  onLose,
  inProcess,
  onReset,
  onFlaggedCell,
  onUnflaggedCell
}) {
  const [board, setBoard] = useState(Array(0))
  const [minesLocation, setMinesLocation] = useState(Array(0))
  useEffect(() => {
    const { board, minesLocation } = CreateBoard(8, 8, 1)
    setBoard(board)
    setMinesLocation(minesLocation)
  }, [])

  const updateCellTag = (x, y) => {
    let newTag
    const newBoard = [...board]

    const currentCell = board[x][y]
    if (currentCell.tag === '') {
      newTag = 'flag'
      onFlaggedCell()
    } else if (currentCell.tag === 'flag') {
      newTag = 'question'
      onUnflaggedCell()
    } else {
      newTag = ''
    }
    currentCell.tag = newTag
    setBoard(newBoard)
  }

  const resetBoard = () => {
    const { board, minesLocation } = CreateBoard(8, 8, 1)
    setBoard(board)
    setMinesLocation(minesLocation)
    onReset()
  }

  const checkWin = () => {
    let win = true

    board.forEach(row => {
      row.forEach(cell => {
        if (cell.value !== 'mine' && !cell.isRevealed) {
          win = false
        }
      })
    })

    return win
  }

  const getCellProps = (x, y) => {
    const cell = board[x][y]
    return {
      key: `${x}-${y}`,
      value: cell.value,
      isRevealed: cell.isRevealed,
      isDisabled: cell.isDisabled,
      tag: cell.tag,
      onClick: () => handleCellClick(x, y),
      onContextMenu: click => handleRightClick(click, x, y)
    }
  }

  const renderCell = (x, y) => <Cell {...getCellProps(x, y)} />

  const revealCell = (x, y) => {
    const newBoard = [...board]
    const cell = newBoard[x][y]

    cell.isRevealed = true
    cell.isDisabled = true

    setBoard(newBoard)
  }

  const revealAllAdjacentCells = (x, y) => {
    const newBoard = [...board]
    let stack = [[x, y]]

    while (stack.length > 0) {
      let [x, y] = stack.pop()

      if (
        isCellWithinBoard(newBoard, x, y) &&
        !newBoard[x][y].isRevealed &&
        newBoard[x][y].tag !== 'flag'
      ) {
        revealCell(x, y)
        if (newBoard[x][y].value === 0) {
          DIRECTIONS.forEach(([dx, dy]) => {
            stack.push([x + dx, y + dy])
          })
        }
      }
    }

    setBoard(newBoard)
  }

  const handleCellClick = (x, y) => {
    const cell = board[x][y]
    if (cell.value === 'mine') {
      cell.value = 'highlighted-mine'
    } else if (cell.value === 0) {
      revealAllAdjacentCells(x, y)
    } else {
      revealCell(x, y)
    }

    updateGameState(cell.value)
  }

  const updateGameState = clickedCellValue => {
    const win = checkWin()
    const loss = clickedCellValue === 'highlighted-mine'

    if (win) {
      onWin()
      updateAllMinesTag('flag')
    } else if (loss) {
      revealMines()
      revealWronglyFlaggedCells()
      onLose()
    } else {
      inProcess()
    }
    if (win || loss) {
      disableAllCells()
    }
  }

  const disableAllCells = () => {
    const newBoard = board.map(row =>
      row.map(cell => ({
        ...cell,
        isDisabled: true
      }))
    )

    setBoard(newBoard)
  }

  const handleRightClick = (click, x, y) => {
    click.preventDefault()
    updateCellTag(x, y)
  }

  const revealMines = () => {
    const newBoard = [...board]
    minesLocation.forEach(([x, y]) => {
      revealCell(x, y)
    })
    setBoard(newBoard)
  }

  const revealWronglyFlaggedCells = () => {
    board.forEach((row, x) => {
      row.forEach((cell, y) => {
        if (cell.tag === 'flag' && cell.value !== 'mine') {
          cell.tag = 'wrongly-flagged'
          revealCell(x, y)
        }
      })
    })
  }

  const updateAllMinesTag = tag => {
    const newBoard = [...board]
    minesLocation.forEach(([x, y]) => {
      const mineCell = newBoard[x][y]

      if (mineCell.tag !== tag) {
        mineCell.tag = tag
      }
    })

    setBoard(newBoard)
  }

  return (
    <div className='board'>
      {board.map((row, x) => (
        <div key={x} className='board-row'>
          {row.map((_, y) => renderCell(x, y))}
        </div>
      ))}

      <button className='restart-button' onClick={resetBoard}>
        RESTART
      </button>
    </div>
  )
}

export default Board
