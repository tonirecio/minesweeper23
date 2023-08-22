import { TAG } from "../../constants"
import {putAdjacentMinesNumberToBoard } from '../board.js'

export const parseMockData = (mockData) => {
    //console.log(mockData);
    let board = []
    if (mockData.includes('-')) {
        board = loadBoardFromLineMock(mockData)
    } else {
        board = loadBoardFromTableMock(mockData)
    }
    const height = board.length
    const width = board[0].length
    board = putAdjacentMinesNumberToBoard(width, height, board)
    const mines = countMines(board)
    const data = {
        board: board,
        gameFeatures: {
            width: width,
            height: height,
            mines: mines
        }
    }
    return data
}

const loadBoardFromLineMock = (mockData) => {
    let rows = mockData.replaceAll('"', '').split('-')
    let board = rows.map(row => row.split(''))

    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < board[0].length; columnIndex++) {
            if (board[rowIndex][columnIndex] === 'o') {
                board[rowIndex][columnIndex] = {
                    content: 0,
                    isCovered: true,
                    tag: TAG.NONE
                }
            } else {
                board[rowIndex][columnIndex] = {
                    content: -1,
                    isCovered: true,
                    tag: TAG.NONE
                }
            }
        }
    }
    return board
}

const loadBoardFromTableMock = (mockData) => {
    let rows = mockData.replaceAll('"','').substring(mockData.indexOf('|')).split('\n')
    let board = rows.map(row => row.split('|').filter(elem=>elem).map(cell=>cell.trim()))
    
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < board[0].length; columnIndex++) {
            if (board[rowIndex][columnIndex] === 'o') {
                board[rowIndex][columnIndex] = {
                    content: 0,
                    isCovered: true,
                    tag: TAG.NONE
                }
            } else {
                board[rowIndex][columnIndex] = {
                    content: -1,
                    isCovered: true,
                    tag: TAG.NONE
                }
            }
        }
    }
    return board
}

const countMines = (board) => {
    let mines = 0
    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < board[0].length; columnIndex++) {
            if (board[rowIndex][columnIndex].content === -1) {
                mines++
            }
        }
    }
    return mines
}