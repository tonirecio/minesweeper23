import React from 'react'
import {render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Minesweeper } from "../../Components/Minesweeper/Minesweeper";
import App from '../../Components/App/App'
import { expect } from "@jest/globals";
import { CELL_VALUES } from '../../Components/Minesweeper/MinesweeperConstants';

export const openTheGame = () => {
    render(<App/>)
}

export const verifyAllCellsAreCovered = () => {

    const cells = screen.getAllByTestId("minesweeper-cell")
    cells.forEach((cell) => {
        const parentElement = cell.parentElement;
        expect(parentElement).toHaveClass("background-covered")
    })
}
export const verifyAllCellsAreEnabled = () => {
  const { container } = render(<Minesweeper size={10} totalMines={20} />)
  const coveredCells = container.querySelectorAll(".cell-Square")
  const allCellsNotDisabled = Array.from(coveredCells).every(
    (cell) => !cell.dataset.isDisabled
  )
  expect(allCellsNotDisabled).toBe(true);
}
export const perseMockDataToString = (table) => {
    if (table.includes("|")){
        const cleanInput = table.trim().replace(/\s+/g, '').replace('||', '-').replace(/\|/g, '')
        return cleanInput
    }
    else return table
}
export const loadMockData = (table, textarea, button) => {

    const mockData = perseMockDataToString(table)
    userEvent.type(textarea, mockData)
    fireEvent.click(button)

}
export const uncoverCell = (row, cell) => {
    var cellTestId = (row - 1) + ',' + (cell - 1)
    const button = screen.getAllByTestId(cellTestId)
    button.forEach((button) => {
        fireEvent.click(button)
    })
    
}

export const verifyCellAreUncovered = (row, cell) => {
    var cellTestId = (row - 1) + ',' + (cell - 1)
    const cells = screen.getAllByTestId(cellTestId)
    cells.forEach((cell) => {
        expect(cell).toHaveClass("background-uncovered")
    })
}

export const rightClickCell = (row, cell) => {
    var cellTestId = (row - 1) + ',' + (cell - 1)
    const button = screen.getAllByTestId(cellTestId)
    button.forEach((button) => {
        fireEvent.contextMenu(button)
    })
}

export const verifyCellAreTagged = (row, cell) => {
    var cellTestId = (row - 1) + ',' + (cell - 1)
    const cells = screen.getAllByTestId(cellTestId)
    cells.forEach((cell) => {
        const childCell = cell.querySelector("span");
        const spanContent = childCell?.textContent;
        expect(spanContent).toBe(CELL_VALUES.TAGGED);
    })
}
export const verifyCellAreIncoclusibelyTagged = (row, cell) => {
    var cellTestId = (row - 1) + ',' + (cell - 1)
    const cells = screen.getAllByTestId(cellTestId)
    cells.forEach((cell) => {
        const childCell = cell.querySelector("span");
        const spanContent = childCell?.textContent;
        expect(spanContent).toBe(CELL_VALUES.INCONCLUSIVETAGGED);
    })
}
export const verifyCellAreNotTagged = (row, cell) => {
    var cellTestId = (row - 1) + ',' + (cell - 1)
    const cells = screen.getAllByTestId(cellTestId)
    cells.forEach((cell) => {
        const childCell = cell.querySelector("span");
        const spanContent = childCell?.textContent;
        expect(spanContent).toBe('');
    })
}
export const taggingCell = (row, col) => {
    rightClickCell(row, col)
}
export const taggingInconclusivelyCell = (row, col) => {
    rightClickCell(row, col)
    rightClickCell(row, col)
}
export const verifyLosedGame = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const cells = screen.getAllByTestId("minesweeper-cell");
    var losed = false
    cells.forEach((cell) => {
        const cellValue = cell.textContent;
        if (cellValue === CELL_VALUES.FOUNDAMINE ||
            cellValue === CELL_VALUES.MINE ||
            cellValue === CELL_VALUES.BADTAGGEDMINE) losed = true
    });
    expect(losed).toBe(true);
}
export const verifyWinnedGame = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const cells = screen.getAllByTestId("minesweeper-cell");
    var losed = false
    cells.forEach((cell) => {
        const cellValue = cell.textContent;
        if (cellValue === CELL_VALUES.FOUNDAMINE ||
            cellValue === CELL_VALUES.MINE ||
            cellValue === CELL_VALUES.BADTAGGEDMINE) losed = true
    });
    expect(losed).toBe(false);
}
export const verifyValueShouldHave = async (row, col, expct) => {

    if (expct === '!') expct = CELL_VALUES.TAGGED
    else if (expct === '@') expct = CELL_VALUES.FOUNDAMINE
    else if (expct === '#') expct = CELL_VALUES.MINE
    else if (expct === '?') expct = CELL_VALUES.INCONCLUSIVETAGGED

    await new Promise((resolve) => setTimeout(resolve, 1000));
    var cellTestId = (row - 1) + ',' + (col - 1)
    const cells = screen.getAllByTestId(cellTestId)
    cells.forEach((cell) => {
        const childCell = cell.querySelector("span");
        const spanContent = childCell?.textContent;
        expect(spanContent).toBe(expct);
    })

}
export const verifyFlagValue = async (expectedFlags) => {

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const flags = screen.getByTestId("flags").value
    expect(flags).toBe(expectedFlags);
}