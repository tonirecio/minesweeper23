import '@testing-library/jest-dom/extend-expect'
import { openTheGame, fillMockData, tagCell, leftClickOnCell, rightClickOnCell, pressRestartButton, allCellsHidden, allCellsEnabled, allCellsDisabled, isUncovered, isCovered, isDisabled, theCellIs, theCounterIs, resetButtonIs } from './utils/stepsUtils.js'

export const minesweeperSteps = ({
    given: Given,
    and: And,
    when: When,
    then: Then
}) => {
    Given(/^the player opens the game$/, () => {
        openTheGame()
    })
    Given('the player loads the following mock data:', async(docString) => {
        await fillMockData(docString)
    })
    Given(/^the player puts "(.*)" in the cell \((\d+),(\d+)\)$/, (tag, row, col) => {
        tagCell(row, col, tag)
    })
    When(/^the player left clicks the cell \((\d+),(\d+)\)$/, async(row, col) => {
        await leftClickOnCell(row, col)
    })
    When(/^the player uncovers the cell \((\d+),(\d+)\)$/, async(row, col) => {
        await leftClickOnCell(row, col)
    })
    When(/^the player right clicks "(.*)" times on the cell \((\d+),(\d+)\)$/, (times, row, col) => {
        rightClickOnCell(times, row, col)
    })
    When('the player presses the restart button', async() => {
        await pressRestartButton()
    })
    Then(/^all the cells should be hidden$/, () => {
        allCellsHidden()
    })
    Then('all the cells should be enabled', () => {
        allCellsEnabled()
    })
    Then('all the cells should be disabled', () => {
        allCellsDisabled()
    })
    Then(/^the cell \((\d+),(\d+)\) should be uncovered$/, (row, col) => {
        isUncovered(row, col)
    })
    Then(/^the cell \((\d+),(\d+)\) should be covered$/, (row, col) => {
        isCovered(row, col)
    })
    Then(/^the cell \((\d+),(\d+)\) should be disabled$/, (row, col) => {
        isDisabled(row, col)
    })
    Then(/^the cell \((\d+),(\d+)\) should be "(.*)"$/, (row, col, status) => {
        theCellIs(row, col, status)
    })
    Then('the player should lose', () => {
        resetButtonIs('lose')
    })
    Then('the player should win', () => {
        resetButtonIs('win')
    })
    Then(/^the counter should be "(.*)"$/, (num) => {
        theCounterIs(num)
    })
    Then(/^the reset button should show "(.*)-face"$/, (status) => {
        resetButtonIs(status)
    })
    Then('the game should restart', () => {
        resetButtonIs('before-start')
    })
}
export default minesweeperSteps