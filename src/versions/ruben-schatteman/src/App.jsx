import { useState } from 'react'
import './App.css'

function Square ({ children, updateBoard, cellCoords, value }) {

  const [isUncovered, setIsUncovered] = useState(false)
  const className = `square ${isUncovered ? 'is-uncovered' : ''}`

  const handleClick = () => {
    setIsUncovered(true)
    updateBoard(cellCoords)
  }

  return (

    <div className={className} onClick={handleClick}>
      <span className='cell_content'>
        {children}
      </span>
    </div>
  )
}

function App() {

  const BOARD_PATHS = {
    rows: 10,
    cols: 10
  }

  const totalCells = BOARD_PATHS.rows * BOARD_PATHS.cols
  const TOTAL_MINES = totalCells * 0.10

  const createBoard = (value) => {
    const board = []
    for (let rowIndex = 0; rowIndex < BOARD_PATHS.rows; rowIndex++) {
      const row = [];
      for (let colIndex = 0; colIndex < BOARD_PATHS.cols; colIndex++) {
        row.push(value)
        
      }
      board.push(row)
    }
    return board
  }

  const [board, setBoard] = useState(createBoard(null))
  // console.log(board)

  // const mineGenerator = () => {
  //   const mineCoords = []
  
  //   // Bucle que decide las posiciones donde estarán las minas colocadas aleatoriamente
  //   while (mineCoords.length < TOTAL_MINES) {
  //     const randomRow = Math.floor(Math.random() * BOARD_PATHS.rows)
  //     const randomCol = Math.floor(Math.random() * BOARD_PATHS.cols)
  //     const newMine = [randomRow, randomCol]
  
  //     // Verifica si la coordenada ya existe en el array mineCoords
  //     if (!mineCoords.some(coord => coord[0] === randomRow && coord[1] === randomCol)) {
  //       mineCoords.push(newMine)
  //     }
  //   }

  //   console.log(mineCoords)
  //   return mineCoords
  // }

  const updateBoard = () => {
    
    const newBoard = [...board]
    setBoard(newBoard)
  }

  return (
    <main className='board'>
      <h1>The Minesweeper</h1>
      <section className='game'>
        {
          board.map((row, rowIndex) => {
            return row.map((_, colIndex) => {
              const cellCoords = [rowIndex, colIndex]
              // console.log(cellCoords)
              return (
                <Square 
                  key={`${rowIndex}${colIndex}`}
                  cellCoords={cellCoords}
                  updateBoard={updateBoard}
                >
                  {board[cellCoords]}
                </Square>
              )
            })
          })
        }
      </section>
    </main>
  )
}

export default App
