import React, { useState, useEffect } from 'react';
import { Cell } from './Cell.jsx';
import Confetti from 'react-confetti';


export function Board({ rows, cols, mines }) {
  const [board, setBoard] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [flagsCount, setFlagsCount] = useState(10);
  const [timerCount, setTimerCount] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const startTimer = () => {
    setIsGameStarted(true);
  };

  // Función para generar una matriz vacía
  const generateEmptyBoard = () => {
    const emptyBoard = [];
    for (let i = 0; i < rows; i++) {
      emptyBoard[i] = Array(cols)
    }
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        emptyBoard[i][j] = { isMine: false, isRevealed: false, count: 0 }
      }
    }
    return emptyBoard;
  }

  const placeMines = () => {
    const newBoard = generateEmptyBoard();
    let minesPlaced = 0;

    while (minesPlaced < mines) {
      var randomRow = Math.floor(Math.random() * rows);
      var randomCol = Math.floor(Math.random() * cols);

      if (!newBoard[randomRow][randomCol].isMine) {
        newBoard[randomRow][randomCol].isMine = true;
        minesPlaced++;
      }

    }
    setBoard(newBoard);
  }

  // Función para contar el número de minas en las celdas adyacentes
  const countAdjacentMines = (row, col) => {
    let count = 0;
    for (let i = Math.max(0, row - 1); i <= Math.min(rows - 1, row + 1); i++) {
      for (let j = Math.max(0, col - 1); j <= Math.min(cols - 1, col + 1); j++) {
        if (board[i][j].isMine) {
          count++;
        }
      }
    }
    return count;
  };

  // Función para revelar las celdas adyacentes si no hay minas cercanas
  const revealAdjacentCells = (row, col) => {
    for (let i = Math.max(0, row - 1); i <= Math.min(rows - 1, row + 1); i++) {
      for (let j = Math.max(0, col - 1); j <= Math.min(cols - 1, col + 1); j++) {
        if (!board[i][j].isRevealed && board[i][j].count === 0) {
          handleCellClick(i, j);
        }
      }
    }
  };

  // Función para manejar el clic en una celda
  const handleCellClick = (row, col) => {

    if (gameOver || gameWon || board[row][col].isRevealed || board[row][col].isFlagged || board[row][col].isQuestion) {
      return;
    }
    const newBoard = [...board];
    newBoard[row][col].isRevealed = true;

    if (newBoard[row][col].isMine) {
      setGameOver(true);
      newBoard[row][col].isClickedMine = true;
      revealAllMines(newBoard);
      return;
    }

    newBoard[row][col].count = countAdjacentMines(row, col);
    setBoard(newBoard);

    if (newBoard[row][col].count === 0) {
      revealAdjacentCells(row, col);
    }

    checkGameWon(newBoard, row, col);
  };

  // Función para manejar el clic derecho en una celda
  const handleCellRightClick = (e, row, col) => {
    e.preventDefault(); // Prevenir el menú contextual por defecto

    if (gameOver || gameWon || board[row][col].isRevealed) return;

    const newBoard = [...board];
    if (!board[row][col].isFlagged && !board[row][col].isQuestion) {
      newBoard[row][col].isFlagged = true;
      setFlagsCount((prevCount) => prevCount - 1);
      setTimerCount((prevCount) => prevCount - 1);
    } else if (board[row][col].isFlagged) {
      newBoard[row][col].isFlagged = false;
      newBoard[row][col].isQuestion = true;
      setFlagsCount((prevCount) => prevCount + 1);
      setTimerCount((prevCount) => prevCount + 1);
    } else if (board[row][col].isQuestion) {
      newBoard[row][col].isQuestion = false;
    }

    setBoard(newBoard);
  };

  // Función para verificar si todas las celdas no minadas están reveladas (el jugador ha ganado)
  const checkGameWon = (currentBoard) => {
    const totalNonMineCells = rows * cols - mines;
    let revealedNonMineCells = 0;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (!currentBoard[i][j].isMine && currentBoard[i][j].isRevealed) {
          revealedNonMineCells++;
        }
      }
    }

    if (revealedNonMineCells === totalNonMineCells) {
      setGameWon(true);
      setShowConfetti(true);
    }
  };

  const revealAllMines = (currentBoard) => {
    const newBoard = currentBoard.map(row =>
      row.map(cell => {
        if (cell.isMine) {
          cell.isRevealed = true;
        }
        return cell;
      })
    );
    setBoard(newBoard);
  };

  const resetGame = () => {
    setBoard(generateEmptyBoard());
    placeMines();
    setGameOver(false);
    setGameWon(false);
    setFlagsCount(10);
    setTimerCount(0);
    setShowConfetti(false);
  };

  useEffect(() => {
    const newBoard = generateEmptyBoard();
    setBoard(newBoard);
    placeMines(newBoard);
    startTimer();
  }, []);

  // Efecto para actualizar el contador cada segundo
  useEffect(() => {
    let interval;
    if (isGameStarted && !gameOver && !gameWon) {
      interval = setInterval(() => {
        setTimerCount((prevTimerCount) => prevTimerCount + 1);
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isGameStarted, gameOver, gameWon]);

  // Renderizar el tablero
  return (
    <div className='page'>
      <h1>🅜🅘🅝🅔🅢🅦🅔🅔🅟🅔🅡</h1>
      <div className="header">
        <div className="flagsCount">Flags: {flagsCount}</div>
        <div className="reset" onClick={resetGame}>
          {gameOver ? '😭' : '😃'}
        </div>
        <div className="timerCount">Timer: {timerCount}</div>
      </div>
      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cellStyle ${cell.isRevealed ? 'revealed' : ''}`}
                onContextMenu={(e) => handleCellRightClick(e, rowIndex, colIndex)}
              >
                <Cell
                  value={cell}
                  onClick={() => handleCellClick(rowIndex, colIndex)}
                  disabled={cell.isFlagged || cell.isQuestion} 
                  style={{ color: cell.isRevealed && cell.count > 0 ? 
                    (cell.count === 1 ? 'blue' : cell.count === 2 ? 'green' : cell.count === 3 ? 'red' : 'black') : null }}
                />
              </div>
            ))}
          </div>
        ))}
        <div className='game-message'>
          {gameOver && <div>¡Fin del juego!</div>}
          {gameWon && <div>¡Has ganado!</div>}
        </div>
        {showConfetti && <Confetti />}
      </div>

    </div>
  )
}

export default Board;

