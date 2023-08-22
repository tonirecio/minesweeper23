/* eslint-disable */
import React from "react"
import { MAX_ROWS, MAX_COLUMNS } from "./Constants"

export const createBoard = (maxRows, maxColumns, value) => {
  return Array.from({ length: maxRows }, () => Array(maxColumns).fill(value))
}

export const getTileCoordinate = (rowIndex, columnIndex) => {
  return rowIndex.toString() + "-" + columnIndex.toString() // `${rowIndex}-${colIndex}`
}

export const isValidCell = (rowIndex, columnIndex, maxRows, maxColumns) => {
  return rowIndex >= 0 && rowIndex < maxRows && columnIndex >= 0 && columnIndex < maxColumns
}

// Recursive function: if the mapped row is an array, then it calls itself providing the row, and then copies the row values one at a time (Matrix)  
export function cloneBoard(board) {
  return board.map(row => Array.isArray(row) ? cloneBoard(row) : row)
}


