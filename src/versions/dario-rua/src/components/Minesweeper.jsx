/* eslint-disable */
import React, { useState, useEffect } from 'react' 
import { Tile } from './Tile'
import { WinnerText } from './WinnerModal'
import { MAX_ROWS, MAX_COLUMNS, MAX_MINES, X_AXYS_DIRECTIONS, Y_AXYS_DIRECTIONS, TILES_TO_CLICK} from './Constants.jsx'
import { getTileCoordinate, createBoard, isValidCell, cloneBoard } from './BoardLogic'
import { BoardFeatures } from './BoardFeatures'
import { setMines, countAdjacentMines, revealAllMines } from './MinesLogic'
import { MockDataLoader } from './MockDataLoader'
//import { checkWinner, checkEndGame } from './Logic/board'
//import { saveGameStorage, resetGameStorage } from './Storage/StorageLocal'

export function Minesweeper () {

  const [tilesToBeClicked, setTilesToBeClicked] = useState(MAX_ROWS * MAX_COLUMNS - MAX_MINES)

  const [mineCounter, setMineCounter] = useState(MAX_MINES)

  const [isDisabled, setIsDisabled] = useState(false)

  const [clickedCells, setClickedCells] = useState([])

  const [board, setBoard] = useState(createBoard(MAX_ROWS, MAX_COLUMNS, null))

  const [minesCoordinates, setminesCoordinates] = useState(setMines())

  const [winner, setWinner] = useState(null)

  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const timer =
      counter > - 1 && setInterval(() => setCounter(counter + 1), 1000)
    return () => clearInterval(timer)
  }, [counter])

  const resetGame = () => {
    setBoard(Array(10).fill(Array(10).fill(null)))
    setWinner(null)
    setminesCoordinates(setMines())
    setClickedCells([])
    setIsDisabled(false)
    setCounter(0)
    setMineCounter(MAX_MINES)
    //resetGameStorage()
  }

  const checkWin = (NumberOfTilesClicked) => {
    return NumberOfTilesClicked === tilesToBeClicked ? true : null
  }

  const uncoverTilesCascadeEffect = (clickedCells, board, rowIndex, columnIndex) => {
    const coordinate = getTileCoordinate(rowIndex, columnIndex) 
      if (!clickedCells.includes(coordinate) && !minesCoordinates.includes(coordinate)) {
        clickedCells.push(getTileCoordinate(rowIndex, columnIndex))
        const numberOfAdjacentMines = countAdjacentMines(minesCoordinates, rowIndex, columnIndex, board)
        board[rowIndex][columnIndex] = numberOfAdjacentMines

        if (numberOfAdjacentMines === null) {
          for (let direction = 0; direction < X_AXYS_DIRECTIONS.length; direction++) {
            const newRow = rowIndex + X_AXYS_DIRECTIONS[direction];
            const newColumn = columnIndex + Y_AXYS_DIRECTIONS[direction];

            if (
              isValidCell(newRow, newColumn, board.length, board[0].length)
              && board[newRow][newColumn] !== '🚩'
            ) {
            uncoverTilesCascadeEffect(clickedCells, board, newRow, newColumn)
          }
          }
        }
      }
    setBoard(board)
    setClickedCells(clickedCells)
  } 

const setTileTag = (rowIndex, columnIndex, tag) => {
  const newBoard = cloneBoard(board)
  newBoard[rowIndex][columnIndex] = tag
  setBoard(newBoard)
}

const uncoverTile = (clickedCells, coordinate) => {
  if (!clickedCells.includes(coordinate)) {
    clickedCells.push(coordinate)
    setClickedCells(clickedCells)
  }
}

const handleRightClick = (event, rowIndex, columnIndex) => {
  event.preventDefault()
  if (clickedCells.includes(getTileCoordinate(rowIndex, columnIndex))) return
  if (cloneBoard(board)[rowIndex][columnIndex] === '🚩') {
    setTileTag(rowIndex, columnIndex, '🤨')
    setMineCounter(mineCounter + 1)
  } else if (cloneBoard(board)[rowIndex][columnIndex] === '🤨') {
    setTileTag(rowIndex, columnIndex, '')
  } else {
    setTileTag(rowIndex, columnIndex, '🚩')
    setMineCounter(mineCounter - 1)
  }
}

const checkTileIsFlagged = (newBoard, rowIndex, columnIndex) => {
  if ( newBoard[rowIndex][columnIndex] === '🚩') {
    setMineCounter(mineCounter+1)
  }
}

const handleLeftClick = (rowIndex, columnIndex) => {
  const tileCoordinate = getTileCoordinate(rowIndex, columnIndex)
  const newBoard = cloneBoard(board)
  const newClickedCells = [...clickedCells]
  if (minesCoordinates.includes(tileCoordinate)) {
    revealAllMines(newBoard, setBoard, newClickedCells, setClickedCells, minesCoordinates)
    setWinner(false)
    setIsDisabled(true)
  } else {
    checkTileIsFlagged(newBoard, rowIndex, columnIndex)
    if (countAdjacentMines(minesCoordinates, rowIndex, columnIndex, newBoard) !== null) {
      newBoard[rowIndex][columnIndex] = countAdjacentMines(minesCoordinates, rowIndex, columnIndex, newBoard)
      setBoard(newBoard)
      uncoverTile(newClickedCells, tileCoordinate)  
    } else {
      uncoverTilesCascadeEffect(newClickedCells, newBoard, rowIndex, columnIndex)
    }
    const numberOfTilesClicked = newClickedCells.length
    const newWinner = checkWin(numberOfTilesClicked)
    setWinner(newWinner)
    if (newWinner) {
      setIsDisabled(true)
      setMineCounter(0)
    } else {
      setIsDisabled(false)
    }
    //newWinner ? setIsDisabled(true) && setMineCounter (0): setIsDisabled(false) 
  }
}

  const getCleanMockData = (mockData) => {
  const cleanMockData = []
  const rows = mockData.split('\n')
  rows.map((row) => {
    let newRows = []
    for (let value = 0; value < row.length; value++) {
      if (row[value] === '*' || row[value] === 'o') {
        newRows.push(row[value])
      }
    }
    cleanMockData.push(newRows)
  })
  return cleanMockData
  }

  const handleMockData= (mockData) => {
    const newMinesCoordinates = []
    const newBoard = []
    let rowCounter = 0
    let columnCounter = 0
    let mineCounter = 0
    let rows = []

    rows = mockData.includes('|') ? getCleanMockData(mockData) : mockData.split('-')

    rowCounter = rows.length
      rows.map((row, rowIndex) => {
        const newRows = []
        columnCounter = row.length
        for (let value = 0; value < row.length; value++) {
          if (row[value] === '*') {
            mineCounter++
            newMinesCoordinates.push(getTileCoordinate(rowIndex, value))
          }
          newRows.push(row[null])
        }
        newBoard.push(newRows)
      })

    setMineCounter(mineCounter)
    setminesCoordinates(newMinesCoordinates)
    setBoard(newBoard)
    setTilesToBeClicked(rowCounter * columnCounter - mineCounter)  
    changeLayout(columnCounter)
  } 

  const changeLayout = (columnCounter) => {
    document.getElementById("gameGrid").style.gridTemplateColumns = "repeat("+columnCounter.toString()+", 1fr)"
  }

  return (
    <main className='board'>
      <h1 className='title'>Minesweeper</h1>
      <BoardFeatures winner={winner} mineCounter={mineCounter} timer={counter} resetGame={resetGame} dataTestId={'catFace'}/>
      <section className='game' id='gameGrid'>
        {  
          board.map((row, rowIndex) => {
            return row.map((value, columnIndex) => {
              const cellCoordinate = getTileCoordinate(rowIndex, columnIndex)
              const isClicked = clickedCells.includes(cellCoordinate)
              
              return (
                <Tile
                  key={getTileCoordinate(rowIndex, columnIndex)}
                  isClicked={isClicked}
                  onLeftClick={() => handleLeftClick(rowIndex, columnIndex)}
                  onRightClick={(event) => handleRightClick(event, rowIndex, columnIndex)}
                  disabled={isDisabled}
                  dataTestId={getTileCoordinate(rowIndex, columnIndex) + ' tile'}
                  isCat={false}
                >
                  {value}
                </Tile>)
            })
          })
        }
      </section>
      <section>
        <WinnerText winner={winner} />
      </section> 
      <section>
        <MockDataLoader onSubmit={handleMockData}/>
      </section> 
      
    </main>
  )
}

export default Minesweeper

// To DO:
//Separate the board display and the board logic (Number, symols)