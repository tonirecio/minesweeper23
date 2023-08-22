import { CELL_VALUES } from "../MinesweeperConstants"

export function getFlagsUseds (cells, mines) {
    var flagUseds = 0
    for (var row = 0; row < cells.length; row++){
        for (var col = 0; col < cells[row].length; col++){
            if (cells[row][col].tag === CELL_VALUES.TAGGED) flagUseds++
        }
    }
    return mines - flagUseds
}