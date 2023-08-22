const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + 1) + min
}

const isCellWithinBoard = (board, x, y) => {
  const rows = board.length
  const columns = board[0].length

  const neighborRowIndex = x
  const neighborColumnIndex = y

  return (
    neighborRowIndex >= 0 &&
    neighborRowIndex < rows &&
    neighborColumnIndex >= 0 &&
    neighborColumnIndex < columns
  )
}
export { getRandomNumber, isCellWithinBoard }
