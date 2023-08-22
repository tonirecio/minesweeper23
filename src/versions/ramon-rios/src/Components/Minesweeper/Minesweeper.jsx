import { useState } from "react"
import React from 'react'
import './Minesweeper.css'
import * as BOARD_BEHAVIOUR from "./Engine/BoardBehavior"
import * as VISUAL_HELP from "./Engine/VisualHelp"
import * as CELL_BEHAVIOUR from "./Engine/CellBehavior"
import * as GLOBAL_HELP from "./Engine/GlobalHelp"
import * as MINESWEEPER_INFO from "./Engine/MinesweeperInfo"
import { Cell } from "./MinesweeperCell/Cell"
import { CELL_VALUES } from "./MinesweeperConstants"
import { MineInfo } from "./MinesweeperInfo/MinesweeperInfo"
import confetti from "canvas-confetti"
import { MockData } from "./MockData/MockData"

export function Minesweeper({size, totalMines}) {

    const [currentMines, setMines] = useState(totalMines)
    const [cells, setCells] = useState(CELL_BEHAVIOUR.inicialiceCells(BOARD_BEHAVIOUR.newPreparedBoard(size, totalMines)))

    const uncoverCell = (row, col) => {
        var cellToUncover = CELL_BEHAVIOUR.getCellValue(row, col, cells)
        var newCells = Array.from(cells)
        if (cellToUncover === CELL_VALUES.MINE) CELL_BEHAVIOUR.uncoverMine(newCells, row, col, cellToUncover)
        else newCells[row][col].cellValue = cellToUncover
        newCells[row][col].isCovered = false
        newCells[row][col].isTagged = false
        newCells[row][col].isInconclusibelyTagged = false
        CELL_BEHAVIOUR.cascadeUncovering(row, col, newCells)

        if (CELL_BEHAVIOUR.checkIfisWinnedTheGame(newCells)) {
            CELL_BEHAVIOUR.disableAllCells(newCells)
            CELL_BEHAVIOUR.tagAllCells(newCells)
            confetti({
                particleCount: 1000,
                angle: 0,
                spread: 360,
                origin: { x: 0.32, y: 0.52 }
              })
        }

        setCells(newCells)
    }

    const handleClick = (index) => {
        var [row,col] = GLOBAL_HELP.convertIndexToArrayIndex(index)
        if (cells[row][col].isCovered && cells[row][col].isDisabled === false) {
            uncoverCell(row, col)
        }

    }
    const handleRightClick = (index, event) => {
        var [row,col] = GLOBAL_HELP.convertIndexToArrayIndex(index)
        var newCells = Array.from(cells)
        CELL_BEHAVIOUR.handleTheTagOfTheCell(newCells[row][col])
        setCells(newCells)
        event.preventDefault()
    }
    return (
        <>
        {VISUAL_HELP.getHtmlEmbellisher()}
        <div className="sticker">
            <MockData setCells={setCells} setMines={setMines}/>
        <MineInfo totalFlags={MINESWEEPER_INFO.getFlagsUseds(cells,currentMines)}
                  gameFinished={CELL_BEHAVIOUR.checkIfisWinnedTheGame(cells)}
                  setCells={setCells} setMines={setMines}/>
        <table className="minesweeper-table" data-testid="minesweeper-component">
        <tbody data-testid="AllCells">
        {
            cells.map((row, rowIndex) => {           
                return(
                    <tr key={rowIndex} className="minesweeper-table-tr">
                        {
                            // col es una variable que no se usa pero se tiene de poner para poder usar CellIndex
                            row.map((col,cellIndex) => {
                                if (cells[rowIndex][cellIndex].isCovered) return(
                                    <td className={`cell-Square background-covered`}
                                        key={'td'+ rowIndex + ',' + cellIndex}
                                        data-testid={(rowIndex) + ',' + (cellIndex)}
                                        onClick={() => handleClick((rowIndex) + ',' + (cellIndex))}
                                        onContextMenu={() => handleRightClick((rowIndex) + ',' + (cellIndex), event)}>
                                        <Cell key={(rowIndex) + ',' + (cellIndex)}
                                              cellValue={cells[rowIndex][cellIndex].cellValue}
                                              isCovered={cells[rowIndex][cellIndex].isCovered}
                                              tag={cells[rowIndex][cellIndex].tag}/>
                                    </td>
                                )
                                else return (
                                    <td className={`cell-Square background-uncovered number-${cells[rowIndex][cellIndex].cellValue}`}
                                        key={cellIndex}
                                        data-testid={(rowIndex) + ',' + (cellIndex)}>
                                        <Cell key={(rowIndex) + ',' + (cellIndex)}
                                              cellValue={cells[rowIndex][cellIndex].cellValue}
                                              isCovered={cells[rowIndex][cellIndex].isCovered}
                                              tag={''}/>
                                    </td>
                                )
                                
                            })
                        }
                    </tr>
                )
            })
        }
        </tbody>
        </table>
        </div>
        </>
    )
}