import { CELL_VALUES } from "../MinesweeperConstants"
import { isValidIndex } from "./GlobalHelp"

export function inicialiceCells (board) {
    const newBoard =  Array(board.length).fill()
    for ( var row = 0; row < newBoard.length; row++){
        
        newBoard[row] = Array(board.length)
        for (var col = 0; col < newBoard.length; col ++) {

            newBoard[row][col] = {

                isCovered : true,
                tag : '',
                isDisabled : false,
                cellValue : board[row][col]

            }
        }
    }
    return newBoard
}

export function getCellValueWithIndex (index, board) {
    var numberArrayIndex = index.split(',')
    var row = numberArrayIndex[0] -1
    var col = numberArrayIndex[1] - 1
    return board[row][col].cellValue
}
export function disableAllCells (cells) {
    for (var row = 0; row < cells.length; row ++) {
        for (var col = 0; col < cells[row].length; col ++) {
            cells[row][col].isDisabled = true
        }
    }
}
export function showAllBombs (cells) {
    for (var row = 0; row < cells.length; row ++) {
        for (var col = 0; col < cells[row].length; col ++) {
            if (cells[row][col].cellValue === CELL_VALUES.MINE && cells[row][col].tag !== CELL_VALUES.TAGGED) {
                cells[row][col].isCovered = false
            }
        }
    }
    showBadTaggedMine(cells)
}
export function showBadTaggedMine (cells) {
    for (var row = 0; row < cells.length; row ++) {
        for (var col = 0; col < cells[row].length; col ++) {
            if (cells[row][col].cellValue !== CELL_VALUES.MINE && cells[row][col].tag === CELL_VALUES.TAGGED) {
                cells[row][col].isCovered = false
                cells[row][col].cellValue = CELL_VALUES.BADTAGGEDMINE
            }
        }
    }
}
export function getCellValue (row, col, board) {
    return board[row][col].cellValue
}
export function cascadeUncovering (row, col, cells) {
    row = parseInt(row)
    col = parseInt(col)
    if (cells[row][col].isCovered === false && cells[row][col].cellValue === CELL_VALUES.UNCOVERED){
        for (var rowDiference = -1; rowDiference < 2; rowDiference++){
            for (var colDiference = -1; colDiference < 2; colDiference++){
                
                var rowToCheck = row + rowDiference
                var colToCheck = col + colDiference
                
                if (isValidIndex(rowToCheck, colToCheck, cells)) {
                    if (cells[rowToCheck][colToCheck].isCovered && cells[rowToCheck][colToCheck].tag !== CELL_VALUES.TAGGED) {
                        cells[rowToCheck][colToCheck].isCovered = false
                        cells[rowToCheck][colToCheck].cellValue = getCellValue(rowToCheck, colToCheck, cells)
                        cascadeUncovering(rowToCheck, colToCheck, cells)
                    }
                }

            }
        }
        
    }
}
export function handleTheTagOfTheCell (cell) {
    if (cell.isDisabled === false){
        if (cell.tag === CELL_VALUES.TAGGED) cell.tag = CELL_VALUES.INCONCLUSIVETAGGED
        else if (cell.tag === CELL_VALUES.INCONCLUSIVETAGGED) cell.tag = ''
        else cell.tag = CELL_VALUES.TAGGED
    }
}
export function checkIfisWinnedTheGame(cells) {
    var isWinned = true
    for (var row = 0; row < cells.length; row ++) {
        for (var col = 0; col < cells[row].length; col ++) {
            if (cells[row][col].isCovered && cells[row][col].cellValue !== CELL_VALUES.MINE) isWinned = false
        }
    }
    return isWinned
}
export function checkIfisFStartedTheGame(cells) {
    var started = false
    for (var row = 0; row < cells.length; row ++) {
        for (var col = 0; col < cells[row].length; col ++) {
            if (cells[row][col].isCovered === false) started = true
        }
    }
    return started
}
export function tagAllCells(cells) {
    for (var row = 0; row < cells.length; row ++) {
        for (var col = 0; col < cells[row].length; col ++) {
            if (cells[row][col].isCovered)cells[row][col].tag = CELL_VALUES.TAGGED
        }
    }
}
export function uncoverMine (newCells, row, col, cellToUncover) {
        cellToUncover = CELL_VALUES.FOUNDAMINE
        newCells[row][col].cellValue = CELL_VALUES.FOUNDAMINE
        disableAllCells(newCells)
        showAllBombs(newCells)
}