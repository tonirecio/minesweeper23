import { CELL_VALUES } from "../MinesweeperConstants"

export function  countMinesAroundThisCell (row, col, board) {
    var minesCounted = 0
    try { if (board[row - 1][col - 1] === CELL_VALUES.MINE) minesCounted++ } catch(error) {}
    try { if (board[row - 1][col] === CELL_VALUES.MINE) minesCounted++ } catch(error) {}
    try { if (board[row - 1][col + 1] === CELL_VALUES.MINE) minesCounted++ } catch(error) {}
    try { if (board[row + 1][col - 1] === CELL_VALUES.MINE) minesCounted++ } catch(error) {}
    try { if (board[row + 1][col] === CELL_VALUES.MINE) minesCounted++ } catch(error) {}
    try { if (board[row + 1][col + 1] === CELL_VALUES.MINE) minesCounted++ } catch(error) {}
    try { if (board[row][col + 1] === CELL_VALUES.MINE) minesCounted++ } catch(error) {}
    try { if (board[row][col - 1] === CELL_VALUES.MINE) minesCounted++ } catch(error) {}
    return minesCounted == 0 ? CELL_VALUES.UNCOVERED : minesCounted
}
export function newBoard (size) {

    const newBoard =  Array(size).fill()
    for ( var i = 0; i < newBoard.length; i++) newBoard[i] = Array(size).fill(CELL_VALUES.COVERED)
    return newBoard

}
export function newVisualBoard (width, height) {
    const newBoard =  Array(height).fill()
    for ( var i = 0; i < newBoard.length; i++) newBoard[i] = Array(width).fill(CELL_VALUES.COVERED)
    return newBoard
}
export function fillWithMines (board, numberOfMines) {

    const height = board.length
    const width = board[0].length
    const totalCells = height * width
    const minesToSet = numberOfMines < totalCells ? numberOfMines : totalCells - 1
    for (var minesSetted = 0; minesSetted < minesToSet; minesSetted ++) {
        
        do{
            var randomYCell = Math.floor(Math.random() * height)
            var randnomXCell = Math.floor(Math.random() * width)
        } while (board[randomYCell][randnomXCell] !== CELL_VALUES.COVERED)

        board[randomYCell][randnomXCell] = CELL_VALUES.MINE
    }

}
export function countMinesAndRealodValues (board) {
    for (var row = 0; row < board.length; row++){
        for (var col = 0; col < board[row].length; col++){
            if (board[row][col] === CELL_VALUES.COVERED) board[row][col] = countMinesAroundThisCell(row, col, board)
        }
    }
}
export function newPreparedBoard (size, numberOfMines) {
    const board = newBoard(size)
    fillWithMines(board, numberOfMines)
    countMinesAndRealodValues(board)
    return board
}