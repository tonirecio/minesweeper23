import React, { useState, useEffect } from 'react';
import Square from './Square';  
import MockDataLoader from './mockData'


const ROW_SIZE = 8;
const MINE_COUNT = 10;
const TOTAL_SQUARES = ROW_SIZE * ROW_SIZE;

const generateMines = () => {
  const mines = Array(TOTAL_SQUARES).fill(false);
  let minesGenerated = 0;

  while (minesGenerated < MINE_COUNT) {
    const randomIndex = Math.floor(Math.random() * TOTAL_SQUARES);
    if (!mines[randomIndex]) {
      mines[randomIndex] = true;
      minesGenerated++;
    }
  }

  return mines;
};

const countAdjacentMines = (index, boardState, mines) => {
  const row = Math.floor(index / ROW_SIZE);
  const col = index % ROW_SIZE;
  let count = 0;

  for (let r = Math.max(0, row - 1); r <= Math.min(row + 1, ROW_SIZE - 1); r++) {
    for (let c = Math.max(0, col - 1); c <= Math.min(col + 1, ROW_SIZE - 1); c++) {
      const neighborIndex = r * ROW_SIZE + c;
      if (mines[neighborIndex]) {
        count++;
      }
    }
  }

  return count;
};

const revealEmptySquares = (index, boardState, mines, setBoardState) => {
  if (boardState[index] !== null || mines[index]) {
    return;
  }

  const newBoardState = [...boardState];
  const queue = [index];

  while (queue.length > 0) {
    const currentIndex = queue.shift();
    const adjacentMines = countAdjacentMines(currentIndex, newBoardState, mines);
    newBoardState[currentIndex] = adjacentMines === 0 ? '' : adjacentMines.toString();

    if (adjacentMines === 0) {
      const offsets = [-1, -ROW_SIZE - 1, -ROW_SIZE, -ROW_SIZE + 1, 1, ROW_SIZE - 1, ROW_SIZE, ROW_SIZE + 1];

      for (let i = 0; i < offsets.length; i++) {
        const neighborIndex = currentIndex + offsets[i];
        if (
          neighborIndex >= 0 &&
          neighborIndex < boardState.length &&
          newBoardState[neighborIndex] === null &&
          !mines[neighborIndex]
        ) {
          queue.push(neighborIndex);
        }
      }
    }
  }

  setBoardState(newBoardState);
};

const Minesweeper = () => {
  const initialBoard = Array(TOTAL_SQUARES).fill(null);
  const [boardState, setBoardState] = useState(initialBoard);
  const [mines, setMines] = useState(generateMines());
  const [flagCount, setFlagCount] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  const isWinConditionMet = () => {
    const allNonMinesRevealed = boardState.every((value, index) => {
      return !mines[index] || value !== null;
    });

    const flaggedSquaresCount = boardState.reduce((count, value) => {
      return count + (value === '🚩' ? 1 : 0);
    }, 0);

    return allNonMinesRevealed && flaggedSquaresCount === MINE_COUNT;
  };

  useEffect(() => {
    if (isWinConditionMet()) {
      setGameOver(true);
    }
  }, [boardState, mines]);

  useEffect(() => {
    let interval;
    if (timerRunning && !gameOver) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, gameOver]);

  const handleSquareClick = (index) => {
    if (!timerRunning) {
      setTimerRunning(true);
    }

    if (mines[index]) {
      const newBoardState = [...boardState];
      newBoardState[index] = '💣';
      setBoardState(newBoardState);
      setGameOver(true);

      const allMines = mines.map((isMine, i) => (isMine ? '💣' : newBoardState[i]));
      setBoardState(allMines);
    } else {
      if (!gameOver) {
        revealEmptySquares(index, boardState, mines, setBoardState);

        if (isWinConditionMet()) {
          setGameOver(true);
        }
      }
    }
  };

  const handleSquareRightClick = (e, index) => {
    e.preventDefault();

    if (!gameOver) {
      if (boardState[index] === '🚩') {
        const newBoardState = [...boardState];
        newBoardState[index] = null;
        setBoardState(newBoardState);
        setFlagCount(flagCount - 1);
      } else if (boardState[index] === null && flagCount < MINE_COUNT) {
        const newBoardState = [...boardState];
        newBoardState[index] = '🚩';
        setBoardState(newBoardState);
        setFlagCount(flagCount + 1);
      }
    }
  };

  const handleRestartGame = () => {
    setBoardState(initialBoard);
    setMines(generateMines());
    setFlagCount(0);
    setGameOver(false);
    setTime(0);
    setTimerRunning(false);
  };

  const handleMockDataSubmit = (mockData) => {
    // Split the mock data into rows
    const rows = mockData.split('\n');
  
    // Map the rows to a new board state with all cells hidden
    const newBoard = Array(rows.length * ROW_SIZE).fill(null);
  
    // Store the positions of mines for later use
    const minePositions = [];
  
    // Process the rows and update the board state with mines
    rows.forEach((row, rowIndex) => {
      const cells = row.split(/[-|]/).map((cell) => cell.trim()).filter((cell) => cell);
      cells.forEach((cell, colIndex) => {
        if (cell === '*') {
          // Set the mine position to true without revealing it
          minePositions.push(rowIndex * ROW_SIZE + colIndex);
        }
      });
    });
  
    // Set the mine positions in the board state without revealing them
    minePositions.forEach((position) => {
      newBoard[position] = false;
    });
  
    // Update the board state with the new board and mine positions
    setBoardState(newBoard);
    setMines(minePositions);
  };
    
  
  return (
    <main className="board">
        <MockDataLoader onSubmit={handleMockDataSubmit} />

      <button className="smiley-face" onClick={handleRestartGame}>
        {gameOver ? (isWinConditionMet() ? '🫡' : '☠️') : '🙂'}
      </button>
      <p className='banderas'>Bandera restantes: {MINE_COUNT - flagCount}</p>
      <p className='tiempo'>Tiempo: {time} segundos</p>
      <section className="game">
        {boardState.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => handleSquareClick(index)}
            onRightClick={(e) => handleSquareRightClick(e, index)}
          />
        ))}
      </section>
    </main>
  );
};

export default Minesweeper;
