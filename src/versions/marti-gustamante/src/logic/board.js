import { TAG } from "../constants"

export const createGameBoard = ({ width, height, mines }) => {
    // Creating a matrix and filling it with initial objects
    let gameBoard = createEmptyBoard(width, height)
    // Putting mines inside the board
    gameBoard = putMinesToBoard(width, height, gameBoard, mines)
    // Adding numbers for each cell depending on the sorrounding mines
    gameBoard = putAdjacentMinesNumberToBoard(width, height, gameBoard)

    return gameBoard
}

const createEmptyBoard = (width, height) => {
    let gameBoard = []
    for (let rowCount = 0; rowCount < height; rowCount++) {
        gameBoard.push([])
        for (let columnCount = 0; columnCount < width; columnCount++) {
            gameBoard[rowCount][columnCount] = {
                content: 0,
                isCovered: true,
                tag: TAG.NONE
            }
        }
    }
    return gameBoard
}

const putMinesToBoard = (width, height, gameBoard, mines) => {
    let putMines = 0
    while (putMines < mines) {
        let randomRowIndex = Math.floor(Math.random() * height)
        let randomColumnIndex = Math.floor(Math.random() * width)
        if (gameBoard[randomRowIndex][randomColumnIndex].content === 0) {
            gameBoard[randomRowIndex][randomColumnIndex].content = -1
            putMines++
        }
    }
    return gameBoard
}

export const putAdjacentMinesNumberToBoard = (width, height, gameBoard) => {
    for (let rowIndex = 0; rowIndex < height; rowIndex++) {
        for (let columnIndex = 0; columnIndex < width; columnIndex++) {
            if (gameBoard[rowIndex][columnIndex].content !== -1) {
                gameBoard[rowIndex][columnIndex].content = getAdjacentMinesCount(columnIndex, rowIndex, gameBoard)
            }
        }
    }
    return gameBoard
}

const getAdjacentMinesCount = (xPosition, yPosition, gameBoard) => {
    let mineCount = 0

    let height = gameBoard.length
    let width = gameBoard[0].length

    const initialY = Math.max(0, yPosition - 1)
    const initialX = Math.max(0, xPosition - 1)

    const finalY = Math.min(yPosition + 1, height - 1)
    const finalX = Math.min(xPosition + 1, width - 1)

    for (let rowIndex = initialY; rowIndex <= finalY; rowIndex++) {
        for (let columnIndex = initialX; columnIndex <= finalX; columnIndex++) {
            if (gameBoard[rowIndex][columnIndex].content === -1) mineCount++
        }
    }
    return mineCount
}

export const getUncoveredCellCount = (board) => {
    let totalUncovered = 0
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < board[0].length; columnIndex++) {
            if (board[rowIndex][columnIndex].isCovered === false) {
                totalUncovered++
            }
        }
    }
    return totalUncovered
}