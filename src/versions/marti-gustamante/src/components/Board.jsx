/* eslint-disable react-hooks/exhaustive-deps */
import { Cell } from "./Cell"
import React from "react"
import { useState } from "react"
import { useEffect } from "react"
import { createGameBoard, getUncoveredCellCount } from "../logic/board"
import { GAME_STATUS, MOUSE_CLICK, TAG } from "../constants"

export const Board = ({ updateAvailableFlags, gameFeatures, gameStatus, updateGameStatus, mockBoard }) => {

    useEffect(() => {
        if (mockBoard !== null) {
            setBoard(mockBoard)
        }
    }, [mockBoard])

    const [board, setBoard] = useState(mockBoard === null ? createGameBoard(gameFeatures) : mockBoard)
    const { width, height, mines } = gameFeatures

    const updateBoard = (x, y, click) => {

        const boardCopy = [...board]
        let currentCell = boardCopy[y][x]
        if (gameStatus === GAME_STATUS.WON || gameStatus === GAME_STATUS.LOST) return

        if (click === MOUSE_CLICK.LEFT) {
            if (gameStatus !== GAME_STATUS.STARTED) {
                updateGameStatus(GAME_STATUS.STARTED)
            }
            if (currentCell.isCovered) {
                setUncovered(x, y)
            }
            if (currentCell.tag === TAG.FLAG) {
                updateAvailableFlags(+1)
                if (currentCell.content !== -1) {
                    currentCell.tag = TAG.NONE
                }
            }
            if (currentCell.content === -1) {
                updateGameStatus(GAME_STATUS.LOST)
            } else {
                checkVictory()
            }
        }
        if (click === MOUSE_CLICK.RIGHT) {
            if (!currentCell.isCovered) return
            if (gameStatus !== GAME_STATUS.STARTED) {
                updateGameStatus(GAME_STATUS.STARTED)
            }
            if (currentCell.tag === TAG.NONE) {
                updateAvailableFlags(-1)
                currentCell.tag = TAG.FLAG
            } else if (currentCell.tag === TAG.FLAG) {
                updateAvailableFlags(+1)
                currentCell.tag = TAG.INCONCLUSIVE
            } else if (currentCell.tag === TAG.INCONCLUSIVE) {
                currentCell.tag = TAG.NONE
            }
        }
        setBoard(boardCopy)
    }

    const uncoverSorrounding = (xPos, yPos) => {

        let height = board.length
        let width = board[0].length

        const initialY = Math.max(0, yPos - 1)
        const initialX = Math.max(0, xPos - 1)

        const finalY = Math.min(yPos + 1, height - 1)
        const finalX = Math.min(xPos + 1, width - 1)

        for (let rowIndex = initialY; rowIndex <= finalY; rowIndex++) {
            for (let columnIndex = initialX; columnIndex <= finalX; columnIndex++) {
                if (board[rowIndex][columnIndex].isCovered
                    && board[rowIndex][columnIndex].tag !== TAG.FLAG) {
                    setUncovered(columnIndex, rowIndex)
                }
            }
        }
    }

    const setUncovered = (x, y) => {
        const boardCopy = [...board]
        boardCopy[y][x].isCovered = false
        setBoard(boardCopy)

        const content = board[y][x].content
        if (content === 0) {
            uncoverSorrounding(x, y)
        }
    }

    const checkVictory = () => {
        const uncoveredCellTotal = getUncoveredCellCount(board)
        const cellTotal = width * height
        if (uncoveredCellTotal === cellTotal - mines) {
            updateGameStatus(GAME_STATUS.WON)
        }
    }

    useEffect(() => {
        const boardCopy = [...board]
        for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
            for (let columnIndex = 0; columnIndex < board[0].length; columnIndex++) {
                let currentCell = boardCopy[rowIndex][columnIndex]
                // When losing the game, all cells with mine are uncovered
                if (gameStatus === GAME_STATUS.LOST && (currentCell.content === -1)) {
                    currentCell.isCovered = false
                }
                // When winning the game, all cells with mine are flagged
                if (gameStatus === GAME_STATUS.WON && currentCell.content === -1) {
                    currentCell.tag = TAG.FLAG
                }
            }
        }
        setBoard(boardCopy)
        if (gameStatus === GAME_STATUS.RESET || gameStatus === GAME_STATUS.NONE) {
            const newBoard = mockBoard === null ? createGameBoard(gameFeatures) : mockBoard
            setBoard(newBoard)
        }
    }, [gameStatus, mines])

    return (
        <>
            <section className="game"
                data-testid='minefield'
                style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${width},1fr)`,
                }}>
                {
                    board.map((row, rowIndex) => row.map((cell, columnIndex) => {
                        const key = rowIndex + '-' + columnIndex
                        return (
                            <Cell
                                key={key}
                                content={cell.content}
                                isCovered={cell.isCovered}
                                tag={cell.tag}
                                x={columnIndex}
                                y={rowIndex}
                                gameStatus={gameStatus}
                                updateBoard={updateBoard}
                                cells={width}
                            >
                            </Cell>
                        )
                    }))
                }
            </section>
        </>
    )
}