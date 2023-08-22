import React from 'react';
import '../style/Game.css';
import { useEffect, useState } from "react";
import Board from "./Board";
import Score from "./Score";
import PauseModal from './PauseModal';
import MockData from './MockData';
import { generateBoard, copyObject, uncoverAllBadTagedMines, uncoverAllMines, uncoverCascade } from "../logic/boardLogic.js"
import { generateBoardFromMockData, countMines } from '../logic/testsUtils/mockData';
import { GAME_STATUS } from '../constants';

function Game({ width, height, numberMines, test }) {

    const getBoardFromMockData = (mockDataText) => {
        const newBoard = generateBoardFromMockData(mockDataText)
        const numberMinesInBoard = countMines(newBoard)
        const rowLenght = newBoard.length
        const columnLenght = newBoard[0].length
        if (newBoard !== null) {
            setRemainingMines(numberMinesInBoard)
            setGameStatus(GAME_STATUS.beforeStart)
            setRemainingCellsToWin(rowLenght * columnLenght - numberMinesInBoard)
            setBoard(newBoard)
        }
    }

    const leftClickingCell = (positionX, positionY) => {
        if (gameStatus === GAME_STATUS.beforeStart) {
            setGameStatus(GAME_STATUS.playing)
        }
        const newBoard = copyObject(board)
        newBoard[positionY][positionX].isCovered = false
        if (board[positionY][positionX].isMine) {
            setGameStatus(GAME_STATUS.lost)
            uncoverAllMines(newBoard)
            uncoverAllBadTagedMines(newBoard)
            newBoard[positionY][positionX].tagStatus = 'exploded'
        } else {
            let newRemainingCellsToWin = remainingCellsToWin
            if (board[positionY][positionX].tagStatus === 'flag') {
                setRemainingMines(remainingMines + 1)
            }
            if (board[positionY][positionX].minesAround === 0) {
                newRemainingCellsToWin -= uncoverCascade(newBoard, positionX, positionY)

            }
            setRemainingCellsToWin(newRemainingCellsToWin - 1)
        }
        setBoard(newBoard)
    }

    const rightClickingCell = (event, positionX, positionY) => {
        event.preventDefault()
        if (gameStatus === GAME_STATUS.beforeStart) {
            setGameStatus(GAME_STATUS.playing)
        }
        const newBoard = copyObject(board)
        if (board[positionY][positionX].tagStatus === 'hidden') {
            newBoard[positionY][positionX].tagStatus = 'flag'
            setRemainingMines(remainingMines - 1)
        } else if (board[positionY][positionX].tagStatus === 'flag') {
            newBoard[positionY][positionX].tagStatus = 'inconclusive'
            setRemainingMines(remainingMines + 1)
        } else {
            newBoard[positionY][positionX].tagStatus = 'hidden'
        }
        setBoard(newBoard)
    }

    const resetGame = () => {
        setRemainingMines(numberMines)
        setBoard(generateBoard(width, height, numberMines))
        setGameStatus(GAME_STATUS.beforeStart)
        setRemainingCellsToWin(width * height - numberMines)
    }

    const pauseGame = () => {
        setGameStatus(GAME_STATUS.paused)
    }

    const continueGame = () => {
        setGameStatus(GAME_STATUS.playing)
    }

    const [board, setBoard] = useState(() => {
        return (generateBoard(width, height, numberMines))
    })
    const [remainingMines, setRemainingMines] = useState(numberMines)
    const [gameStatus, setGameStatus] = useState(GAME_STATUS.beforeStart)
    const [remainingCellsToWin, setRemainingCellsToWin] = useState(width * height - numberMines)

    useEffect(() => {
        if (remainingCellsToWin === 0) {
            setGameStatus(GAME_STATUS.won)
            setRemainingMines(0)
        }
    }, [remainingCellsToWin])

    useEffect(() => {
        resetGame()
    }, [width, height, numberMines])

    return (
        <>
            {test && <MockData getMockData={getBoardFromMockData} />}
            <table className="Game">
                <Score remainingMines={remainingMines} resetGame={resetGame} gameStatus={gameStatus} pauseGame={pauseGame} continueGame={continueGame} />
                {(gameStatus === GAME_STATUS.paused) && <PauseModal width={board[0].length} height={board.length}/>}
                <Board board={board} leftClickingCell={leftClickingCell} rightClickingCell={rightClickingCell} gameStatus={gameStatus} />
            </table>
        </>
    );
}

export default Game;
