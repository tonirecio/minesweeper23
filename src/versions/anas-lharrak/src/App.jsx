import './App.css'
import { Emojis } from './constants/constants'
import { Square } from './components/Square'
import { ResetButton } from './components/ResetButton'
import { useState, useEffect } from 'react'
import { Timer } from './components/Timer'

function App() {
  const rows = 9
  const columns = 10

  // Initialize the board as a 2D array
  const [board, updateBoard] = useState(Array(rows).fill(Array(columns).fill('.')))
  const [statusGame, setStatusGame] = useState('initGame')
  const [boardOfSpecialCells, setboardOfSpecialCells] = useState(Array(rows).fill(Array(columns).fill('.')))
  const [isResetButtonClicked, setIsResetButtonClicked] = useState(false)
  const [counterOfFlags, setCounterOfFlags] = useState(10)

  let statusGameMessage = ''
  if (statusGame === 'inGame' || statusGame === 'initGame') {
    statusGameMessage = 'Minesweeper'
  } else if (statusGame === 'lose') {
    statusGameMessage = 'Game Over'
  } else {
    statusGameMessage = 'You win!'
  }

  // Function to put mines in random cells
  const putMinesInRandomCells = (board) => {
    let minesCount = 10

    while (minesCount > 0) {
      const randomRow = Math.floor(Math.random() * rows)
      const randomColumn = Math.floor(Math.random() * columns)

      if (board[randomRow][randomColumn] === '.') {
        board[randomRow][randomColumn] = '*'
        minesCount--
      }
    }
    updateBoard(board)
  }

  const checkWin = () => {
    // Flatten the 2D array and check if there are any unrevealed cells left
    const flatBoard = board.flat()
    const isWin = !flatBoard.includes('.')
    if (isWin) {
      setStatusGame('win')
    }

    return isWin
  }

  const generateNewBoard = () => {
    const newBoard = Array.from({ length: rows }, () => Array.from({ length: columns }, () => '.'))
    putMinesInRandomCells(newBoard)
    return newBoard
  }

  useEffect(() => {
    const newBoard = generateNewBoard()
    updateBoard(newBoard)
  }, [])

  useEffect(() => {
    if (statusGame === 'win') {
      // Replace mines with flags on the special board
      const newBoard = replaceMinesWithFlags(board)
      updateBoard(newBoard)
    }
  }, [statusGame])

  const replaceMinesWithFlags = (board) => {
    // Crea una copia independiente del tablero
    const newBoard = board.map((row) => [...row])

    // Recorre el tablero para buscar las bombas y reemplazarlas por banderas
    for (let rowIndex = 0; rowIndex < newBoard.length; rowIndex++) {
      for (let columnIndex = 0; columnIndex < newBoard[0].length; columnIndex++) {
        if (newBoard[rowIndex][columnIndex] === '*') {
          newBoard[rowIndex][columnIndex] = <div className='emojis'>{Emojis.flag}</div> // Reemplaza la bomba con una bandera (p)
        }
      }
    }

    return newBoard
  }

  const setClassNameOfSquare = (children, rowIndex, columnIndex) => {
    let className = null
    if (children === '.' && (statusGame === 'inGame' || statusGame === 'initGame')) {
      className = 'square'
    } else if (children >= 0 && children <= 8 && boardOfSpecialCells[rowIndex][columnIndex] !== '!') {
      className = 'uncovered'
    } else if (board[rowIndex][columnIndex] === '@') {
      className = 'explotedMine'
    } else if (checkWin()) {
      className = 'uncovered disabled'
    } else {
      if (statusGame === 'inGame' || statusGame === 'initGame') {
        className = 'square'
      } else if (statusGame === 'win') {
        className = 'uncovered'
      } else {
        className = 'disabled'
      }
    }
    return className
  }

  const gameOver = () => {
    const newBoard = board.map((row) => row.map((cell) => (cell === '*' ? <div className='emojis'>{Emojis.mine}</div> : cell)))
    updateBoard(newBoard)
    setStatusGame('lose')
  }

  const revealAdjacentZeros = (customBoard, customRowIndex, customColumnIndex, visited, cellsToReveal) => {
    // Condiciones para NO entrar en la funcion
    if (
      customRowIndex < 0 ||
      customRowIndex >= customBoard.length ||
      customColumnIndex < 0 ||
      customColumnIndex >= customBoard[0].length ||
      visited.has(`${customRowIndex}-${customColumnIndex}`) ||
      customBoard[customRowIndex][customColumnIndex] !== '.'
    ) {
      return
    }
    // Guardo el row y la columna para evitar loops infinitos
    visited.add(`${customRowIndex}-${customColumnIndex}`)

    let numberToDisplay = checkMinesAround(customBoard, customRowIndex, customColumnIndex)
    numberToDisplay = numberToDisplay === 0 ? '' : numberToDisplay
    // Guardo las cells para hacer el updateBoard y ahorrarme problemas con la asincronia
    cellsToReveal.push({ index: `${customRowIndex}-${customColumnIndex}`, number: numberToDisplay })

    if (numberToDisplay === '') {
      revealAdjacentZeros(customBoard, customRowIndex - 1, customColumnIndex, visited, cellsToReveal) // Casilla superior
      revealAdjacentZeros(customBoard, customRowIndex + 1, customColumnIndex, visited, cellsToReveal) // Casilla inferior
      if (customColumnIndex > 0) {
        revealAdjacentZeros(customBoard, customRowIndex, customColumnIndex - 1, visited, cellsToReveal) // Casilla izquierda
        revealAdjacentZeros(customBoard, customRowIndex - 1, customColumnIndex - 1, visited, cellsToReveal) // Casilla superior izquierda
        revealAdjacentZeros(customBoard, customRowIndex + 1, customColumnIndex - 1, visited, cellsToReveal) // Casilla inferior izquierda
      }
      if (customColumnIndex < customBoard[0].length - 1) {
        revealAdjacentZeros(customBoard, customRowIndex, customColumnIndex + 1, visited, cellsToReveal) // Casilla derecha
        revealAdjacentZeros(customBoard, customRowIndex - 1, customColumnIndex + 1, visited, cellsToReveal) // Casilla inferior derecha
        revealAdjacentZeros(customBoard, customRowIndex + 1, customColumnIndex + 1, visited, cellsToReveal) // Casilla superior derecha
      }
    }
  }

  const changeStateCell = (rowIndex, columnIndex) => {
    if (statusGame !== 'inGame') {
      setStatusGame('inGame')
    }


    if (board[rowIndex][columnIndex] !== '*') {
      // Coleccion de elementos unicos (es una coleccion para evitar que se genere un loop infinito)
      const visited = new Set()
      // Hago esto para revelar todas las square de una y evitar problemas con la asincronia
      const cellsToReveal = []
      revealAdjacentZeros(board, rowIndex, columnIndex, visited, cellsToReveal)

      const newBoard = [...board]
      cellsToReveal.forEach(({ index, number }) => {
        // Esto lo hago para conseguir el row y el col que he guardado como string
        const [row, col] = index.split('-').map(Number)
        newBoard[row][col] = number
      })

      updateBoard(newBoard)

      const newSpecialBoard = [...boardOfSpecialCells]
      newSpecialBoard[rowIndex][columnIndex] = '.'
      setboardOfSpecialCells(newSpecialBoard)
    } else if (board[rowIndex][columnIndex] === '*') {
      const newBoard = [...board]
      newBoard[rowIndex][columnIndex] = '@'
      updateBoard(newBoard)
      gameOver()
    }
  }

  const checkMinesAround = (customBoard, rowIndex, columnIndex) => {
    const rows = customBoard.length
    const columns = customBoard[0].length

    const adjacentPos = [
      [-1, 0], // Izquierda
      [+1, 0], // Derecha
      [0, -1], // Superior
      [0, +1], // Inferior
      [-1, -1], // Superior izquierda
      [-1, +1], // Superior derecha
      [+1, -1], // Inferior izquierda
      [+1, +1] // Inferior derecha
    ]

    let contMines = 0

    for (const [rowPos, colPos] of adjacentPos) {
      const newRow = rowIndex + rowPos
      const newColumn = columnIndex + colPos
      const isWithinBounds = newRow >= 0 && newRow < rows && newColumn >= 0 && newColumn < columns

      if (isWithinBounds && customBoard[newRow][newColumn] === '*') {
        contMines++
      }
    }

    return contMines
  }

  const putFlagOrInconclusiveInCell = (rowIndex, columnIndex) => {
    let typeOfCell = null
    const newBoardOfSpecialCells = boardOfSpecialCells.map((row) => [...row]) // Create a new copy of the board

    if (newBoardOfSpecialCells[rowIndex][columnIndex] === '.') {
      typeOfCell = '!'
      setCounterOfFlags((prevCounter) => prevCounter - 1) // Use the functional update to avoid issues with concurrency
    } else if (newBoardOfSpecialCells[rowIndex][columnIndex] === '!') {
      typeOfCell = '?'
      setCounterOfFlags((prevCounter) => prevCounter + 1) // Use the functional update to avoid issues with concurrency
    } else if (newBoardOfSpecialCells[rowIndex][columnIndex] === '?') {
      typeOfCell = '.'
    }

    newBoardOfSpecialCells[rowIndex][columnIndex] = typeOfCell
    setboardOfSpecialCells(newBoardOfSpecialCells)
  }

  const setEmojiForSpecialCells = (rowIndex, columnIndex) => {
    if (board[rowIndex][columnIndex] === '@') {
      return Emojis.higlightedMine
    } else if (
      boardOfSpecialCells[rowIndex][columnIndex] === '!' &&
      board[rowIndex][columnIndex] === '.' &&
      board.flat().includes('@')
    ) {
      return Emojis.wrongFlag
    } else if (
      boardOfSpecialCells[rowIndex][columnIndex] === '?' &&
      board[rowIndex][columnIndex] !== '.' &&
      board.flat().includes('@')
    ) {
      return Emojis.mine
    } else if (boardOfSpecialCells[rowIndex][columnIndex] === '!') {
      return Emojis.flag
    } else if (board[rowIndex][columnIndex] === '#') {
      return Emojis.mine
    } else if (boardOfSpecialCells[rowIndex][columnIndex] === '?') {
      return Emojis.inconclusive
    }
    return null
  }

  return (
    <>
      <main className='board'>
        <h1 data-testid='game-status'>{statusGameMessage}</h1>
        <div className='header'>
          <h2>Flags: {counterOfFlags}</h2>
          <ResetButton
            setIsResetButtonClicked={setIsResetButtonClicked}
            statusGame={statusGame}
            updateBoard={updateBoard}
            setStatusGame={setStatusGame}
            generateNewBoard={generateNewBoard}
            setboardOfSpecialCells={setboardOfSpecialCells}
            setCounterOfFlags={setCounterOfFlags}
          />
          <Timer statusGame={statusGame} setIsResetButtonClicked={setIsResetButtonClicked}
            isResetButtonClicked={isResetButtonClicked} ></Timer>
        </div>

        <section className='game'>
          {board.map((row, rowIndex) => {
            return row.map((cell, columnIndex) => (
              <Square
                key={`${rowIndex}-${columnIndex}`}
                rowIndex={rowIndex}
                columnIndex={columnIndex}
                setClassNameOfSquare={setClassNameOfSquare}
                changeStateCell={changeStateCell}
                putFlagOrInconclusiveInCell={putFlagOrInconclusiveInCell}
                setEmojiForSpecialCells={setEmojiForSpecialCells}
              >{cell}</Square>
            ))
          })}
        </section>
      </main>
    </>
  )
}

export default App
