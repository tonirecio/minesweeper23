import React from "react"
import { isValidCell, getTileCoordinate } from "./BoardLogic"
import { X_AXYS_DIRECTIONS, Y_AXYS_DIRECTIONS, MAX_ROWS, MAX_COLUMNS, MAX_MINES } from "./Constants"


export const setMines = () => {
    const minesCoordinates = []
    for (let mine = 0; minesCoordinates.length < MAX_MINES; mine++) {
      const rowIndex = Math.floor(Math.random() * MAX_ROWS)
      const columnIndex = Math.floor(Math.random() * MAX_COLUMNS)
      const mineCoordinate = getTileCoordinate(rowIndex, columnIndex)
      
      if (!minesCoordinates.includes(mineCoordinate)) {
        minesCoordinates.push(mineCoordinate) 
      }    
    }
    return minesCoordinates
  }

export const countAdjacentMines = (minesCoordinates, row, column, board) => {
    let mineCount = 0

    for (let direction = 0; direction < X_AXYS_DIRECTIONS.length; direction++) {
      const newRow = row + X_AXYS_DIRECTIONS[direction]
      const newColumn = column + Y_AXYS_DIRECTIONS[direction]
      const newCoordinate = newRow.toString() + "-" + newColumn.toString()

      if (isValidCell(newRow, newColumn, board.length, board[0].length) && minesCoordinates.includes(newCoordinate)) {
          mineCount++
      }
    }
    return mineCount === 0 ? null : mineCount
}

export const revealAllMines = (newBoard ,setBoard, clickedCells, setClickedCells, minesCoordinates) => {
const newClickedCells = [...clickedCells].concat(minesCoordinates)
minesCoordinates.forEach(minePlacement => {
    let row = Number(minePlacement.split('-')[0])
    let column = Number(minePlacement.split('-')[1])
    newBoard[row][column] = '💣'
    
})
setBoard(newBoard)
setClickedCells(newClickedCells)
}
  