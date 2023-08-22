import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Game from '../../../components/Game'
import React from 'react'

export const openTheGame = () => {
    render(<Game width={8} height={8} numberMines={10} test={true} />)
}

export const fillMockData = async(mockData) => {
    const text = screen.getByTestId('mockDataLoader-textarea')
    const button = screen.getByTestId('mockDataLoader-loadButton')
    await userEvent.clear(text)
    await userEvent.type(text, mockData)
    await userEvent.click(button)
}

export const tagCell = (row, col, tag) => {
    const cell = screen.getByTestId('Cell-' + row + '-' + col)
    const cellText = cell.querySelector('p').textContent
    switch (tag) {
        case '!': {
            if (cellText === '') {
                fireEvent.contextMenu(cell)
            } else if (cellText === '?') {
                fireEvent.contextMenu(cell)
                fireEvent.contextMenu(cell)
            }
            break
        }
        case '?': {
            if (cellText === '') {
                fireEvent.contextMenu(cell)
                fireEvent.contextMenu(cell)
            } else if (cellText === '!') {
                fireEvent.contextMenu(cell)
            }
            break
        }
    }
}

export const leftClickOnCell = async(row, col) => {
    await userEvent.click(screen.getByTestId('Cell-' + row + '-' + col))
}

export const rightClickOnCell = (times, row, col) => {
    for (let i = 0; i < times; i++) {
        fireEvent.contextMenu(screen.getByTestId('Cell-' + row + '-' + col))
    }
}

export const pressRestartButton = async() => {
    await userEvent.click(screen.getByTestId('reset-button'))
}

export const allCellsHidden = () => {
    const board = screen.getByTestId('board')
    const cells = board.querySelectorAll('td')
    cells.forEach((cell) => {
        expect(cell).toHaveTextContent('')
    })
}

export const allCellsEnabled = () => {
    const board = screen.getByTestId('board')
    expect(board).not.toHaveClass('disabled')
}

export const allCellsDisabled = () => {
    const board = screen.getByTestId('board')
    expect(board).toHaveClass('disabled')
}

export const isUncovered = (row, col) => {
    const cell = screen.getByTestId('Cell-' + row + '-' + col)
    const cellContent = cell.textContent
    expect(cellContent).not.toBe('')
    expect(cellContent).not.toBe('!')
    expect(cellContent).not.toBe('?')
}

export const isCovered = (row, col) => {
    const cell = screen.getByTestId('Cell-' + row + '-' + col)
    const cellContent = cell.textContent
    expect(['','!','?']).toContain(cellContent)
}

export const isDisabled = (row, col) => {
    const cell = screen.getByTestId('Cell-' + row + '-' + col)
    expect(cell).toHaveClass('uncovered')
}

export const theCellIs = (row, col, status) => {
    const cell = screen.getByTestId('Cell-' + row + '-' + col)
    const cellText = screen.getByTestId('Cell-' + row + '-' + col + '-text')
    let display = status
    switch (status) {
        case "x":
            display = "×"
            break
        case '0':
            display = " "
            break
        case '.':
            display = ""
            break
        case '@':
            expect(cellText).toHaveClass('cell-red')
        case '#':
            display = '☀'
            break
    }
    expect(cell.textContent).toBe(display)
}

export const theCounterIs = (numberMines) => {
    const counter = screen.getByTestId('mines-counter')
    expect(counter.textContent).toBe(numberMines)
}

export const resetButtonIs = (status) => {
    const resetButton = screen.getByTestId('reset-button')
    const img = resetButton.querySelector('img')
    expect(img.alt).toContain(status)
}

