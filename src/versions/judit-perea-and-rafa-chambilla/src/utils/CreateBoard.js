import { getRandomNumber, isCellWithinBoard } from './Helpers'

import { DIRECTIONS } from './Constants'

const createCell = (rowIndex, columnIndex) => ({
  value: 0,
  isRevealed: false,
  isDisabled: false,
  posX: rowIndex,
  posY: columnIndex,
  tag: ''
})

const placeMines = (board, mines) => {
  const rows = board.length
  const columns = board[0].length

  let mineCount = 0
  let minesLocation = []

  while (mineCount < mines) {
    let posX = getRandomNumber(0, rows - 1)
    let posY = getRandomNumber(0, columns - 1)

    if (board[posX][posY].value === 0) {
      board[posX][posY].value = 'mine'
      minesLocation.push([posX, posY])
      mineCount++
    }
  }

  return minesLocation
}

const calculateAdjacentMines = board => {
  const rows = board.length
  const columns = board[0].length

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
      const currentCell = board[rowIndex][columnIndex]
      if (currentCell.value != 'mine') {
        DIRECTIONS.forEach(([distanceX, distanceY]) => {
          const neighborRowIndex = rowIndex + distanceX
          const neighborColumnIndex = columnIndex + distanceY

          if (
            isCellWithinBoard(board, neighborRowIndex, neighborColumnIndex) &&
            board[neighborRowIndex][neighborColumnIndex].value === 'mine'
          ) {
            currentCell.value++
          }
        })
      }
    }
  }
}

function CreateBoard (rows, columns, mines) {
  let board = Array.from({ length: rows }, (_, rowIndex) =>
    Array.from({ length: columns }, (_, columnIndex) =>
      createCell(rowIndex, columnIndex)
    )
  )

  let minesLocation = placeMines(board, mines)

  calculateAdjacentMines(board)

  return { board, minesLocation }
}

export default CreateBoard
