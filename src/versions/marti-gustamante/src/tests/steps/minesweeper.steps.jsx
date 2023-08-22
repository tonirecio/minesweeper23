import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import App from '../../App.jsx'

const minesweeper = ({
    given: Given,
    and: And,
    when: When,
    then: Then
}) => {
    Given('the player opens the game', () => {
        openTheGame()
    })

    Given('the player clicks the \'Reset\' button', async () => {
        const button = screen.getByTestId('reset-button')
        await userEvent.click(button)
    })

    Given(/^the player loads the following mock data: (.*)$/, async (arg0) => {
        await loadMockData(arg0)
    })

    Given('the player loads the following mock data:', async (docString) => {
        await loadMockData(docString)
    })

    Then('all the cells should be enabled', () => {
        expect(areAllCellsEnabled()).toBe(true)
    })

    Then('all the cells should be disabled', () => {
        expect(areAllCellsDisabled()).toBe(true)
    })

    Then('all the cells should be covered', () => {
        expect(areAllCellsCovered()).toBe(true)
    })

    Then('all the cells should be untagged', () => {
        expect(areAllCellsUntagged()).toBe(true)
    })

    Then(/^the mine count display should show "(.*)"$/, (arg0) => {
        const expectedDisplay = arg0.replaceAll('\"', '')
        const mineCount = getMineCount()
        expect(mineCount).toBe(expectedDisplay)
    })

    When(/^the player left clicks the cell \((\d+),(\d+)\)$/, async (arg0, arg1) => {
        await leftClickOnCell(arg0, arg1)
    })

    When(/^the player right clicks the cell \((\d+),(\d+)\)$/, async (arg0, arg1) => {
        await rightClickOnCell(arg0, arg1)
    })

    When(/^the player flags the cell \((\d+),(\d+)\)$/, async (arg0, arg1) => {
        await rightClickOnCell(arg0, arg1)
    })

    Then(/^the cell \((\d+),(\d+)\) should be flagged$/, (arg0, arg1) => {
        const currentCellContent = getCellContent(arg0, arg1)
        expect(currentCellContent).toBe('❗')
    })

    When(/^the player tags the cell \((\d+),(\d+)\) as inconclusive$/, async (arg0, arg1) => {
        await rightClickOnCell(arg0, arg1)
        await rightClickOnCell(arg0, arg1)
    })

    Then(/^the cell \((\d+),(\d+)\) should be tagged as inconclusive$/, (arg0, arg1) => {
        const currentCellContent = getCellContent(arg0, arg1)
        expect(currentCellContent).toBe('❔')
    })

    When(/^the player unflags the cell \((\d+),(\d+)\)$/, async (arg0, arg1) => {
        await rightClickOnCell(arg0, arg1)
        await rightClickOnCell(arg0, arg1)
    })

    Then(/^the cell \((\d+),(\d+)\) should be untagged$/, (arg0, arg1) => {
        const currentCellContent = getCellContent(arg0, arg1)
        expect(currentCellContent).toBe('')
    })

    When(/^the player uncovers the cell \((\d+),(\d+)\)$/, async (arg0, arg1) => {
        await leftClickOnCell(arg0, arg1)
    })

    Then(/^the cell \((\d+),(\d+)\) should be uncovered$/, (arg0, arg1) => {
        expect(screen.getByTestId(arg0 + '-' + arg1)).toHaveClass('cell-uncovered')
        //expect(isUncovered(arg0,arg1)).toBe(true)
    })

    Then(/^the cell (.*) should be uncovered!$/, (arg0) => {
        const coords = arg0.replace('(', '').replace(')', '').replaceAll('"', '').split(',')
        expect(screen.getByTestId(coords[0] + '-' + coords[1])).toHaveClass('cell-uncovered')
    })

    Then(/^the cell \((\d+),(\d+)\) should be disabled$/, (arg0, arg1) => {
        expect(isDisabled(arg0, arg1)).toBe(true)
    })

    Then(/^the cell (.*) should show: "(.*)"$/, (arg0, arg1) => {
        const coords = arg0.replace('(', '').replace(')', '').replaceAll('"', '').split(',')
        const currentCellContent = getCellContent(coords[0], coords[1])
        const expectedCellContent = translateFromGherkinToActualDisplay(arg1)
        expect(currentCellContent).toBe(expectedCellContent)
    })

    Then('the game should reset', () => {
        expect(areAllCellsCovered()).toBe(true)
        expect(areAllCellsEnabled()).toBe(true)
        expect(areAllCellsUntagged()).toBe(true)
    })
}
export default minesweeper


const openTheGame = () => {
    render(<App />)
}

const loadMockData = async (mockData) => {

    const input = screen.getByTestId('mockdata')
    const button = screen.getByTestId('mockbutton')

    await userEvent.clear(input)
    await userEvent.type(input, mockData)
    await userEvent.click(button)
}

const translateFromGherkinToActualDisplay = (display) => {
    switch (display) {
        case '.':
            return ''
        case '!':
            return '❗'
        case '?':
            return '❔'
        case '@':
            return '💣'
        case 'x':
            return '❌'
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
            return display
        default:
            return ' '
    }
}

const leftClickOnCell = async (row, column) => {
    const user = userEvent.setup()
    await user.click(screen.getByTestId(row + '-' + column))
}

const rightClickOnCell = async (row, column) => {
    await fireEvent.contextMenu(screen.getByTestId(row + '-' + column))
}

const getCellContent = (row, column) => {
    const cell = screen.getByTestId(row + '-' + column)
    return cell.querySelector('span').textContent
}

const isDisabled = (row, column) => {
    const cell = screen.getByTestId(row + '-' + column)
    return cell.classList.contains('disabled')
}

export const areAllCellsCovered = () => {
    const mineField = screen.getByTestId('minefield')
    const cells = mineField.querySelectorAll('div')
    cells.forEach(cell => {
        if (cell.classList.contains('cell-uncovered')) {
            return false
        }
    })
    return true
}

const areAllCellsDisabled = () => {
    const mineField = screen.getByTestId('minefield')
    const cells = mineField.querySelectorAll('div')
    cells.forEach(cell => {
        if (!cell.classList.contains('disabled')) {
            return false
        }
    })
    return true
}

const areAllCellsEnabled = () => {
    const mineField = screen.getByTestId('minefield')
    const cells = mineField.querySelectorAll('div')
    cells.forEach(cell => {
        if (cell.classList.contains('disabled')) {
            return false
        }
    })
    return true
}

const areAllCellsUntagged = () => {
    const mineField = screen.getByTestId('minefield')
    const cells = mineField.querySelectorAll('div')
    cells.forEach(cell => {
        if (cell.textContent !== '') {
            return false
        }
    })
    return true
}

export const getMineCount = () => {
    return screen.getByTestId('mineCounter').textContent
}
