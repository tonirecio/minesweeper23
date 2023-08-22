import { fillBoardWithProximities } from "../boardLogic"

export const generateBoardFromMockData = (mockData) => {
    let mockDataFormated = null
    if (mockData.includes('|')) {
        mockDataFormated = mockData.split('\n')
        mockDataFormated = mockDataFormated.map((row) => {
            return (row.split('|').filter(element => element).map((cell) => {
                return (cell.trim())
            }))
        })
    } else {
        mockDataFormated = mockData.split('-')
        mockDataFormated = mockDataFormated.map((row) => {
            return (row.split(''))
        })
    }

    const board = mockDataFormated.map((row) => {
        return (row.map((cell) => {
            const newCell = {
                isCovered: true,
                isMine: false,
                minesAround: 0,
                tagStatus: 'hidden'
            }
            if (cell === '*') {
                newCell.isMine = true
                newCell.minesAround = -1
            }
            return (newCell)
        }))
    })

    fillBoardWithProximities(board, board[0].length, board.length)

    return (board)
}

export const countMines = (board) => {
    let numberMines = 0
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < board[0].length; columnIndex++) {
            if (board[rowIndex][columnIndex].isMine) {
                numberMines++
            }
        }
    }
    return (numberMines)
}