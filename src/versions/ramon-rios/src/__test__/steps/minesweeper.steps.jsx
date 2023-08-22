import {render, screen, fireEvent } from "@testing-library/react"
import * as steps from "./stepsHelper"

export const MineSweeper = ({
    given: Given,
    and: And,
    when: When,
    then: Then
  }) => {
    Given('the player opens the game', () => {
        steps.openTheGame()
    })
    Given("the player loads the following mock data:", (table) => {
        const textarea = screen.getByTestId("mockDataLoader");
        const button = screen.getByTestId("mockDataLoaderButton");
        steps.openTheGame();
        steps.loadMockData(table, textarea, button);
    })
    When(/^the player uncovers the cell \((\d+),(\d+)\)$/, (arg0, arg1) => {
        steps.uncoverCell(parseInt(arg0), parseInt(arg1));
    }) 
    When(/^the player right click the cell \((\d+),(\d+)\)$/, (arg0, arg1) => {
        steps.rightClickCell(arg0,arg1)
    })
    When(/^the player tag the cell \((\d+),(\d+)\)$/, (arg0, arg1) => {
        steps.taggingCell(arg0,arg1)
    })
    When(/^the player tag inconclusively the cell \((\d+),(\d+)\)$/, (arg0, arg1) => {
        steps.taggingInconclusivelyCell(arg0,arg1)
    })
    Then('all the cells should be covered', async () => {
        steps.verifyAllCellsAreCovered();
    })
    Then('all the cells should be enabled', async () => { 
        steps.verifyAllCellsAreEnabled();
    })
    Then(/^the cell \((\d+),(\d+)\) should be disabled$/, (arg0, arg1) => {
        steps.verifyCellAreUncovered(arg0,arg1)
    })
    Then(/^the cell \((\d+),(\d+)\) should be tagged$/, (arg0, arg1) => {
        steps.verifyCellAreTagged(arg0,arg1)
    })
    Then(/^the cell \((\d+),(\d+)\) should be inconclusively tagged$/, (arg0, arg1) => {
        steps.verifyCellAreIncoclusibelyTagged(arg0,arg1)
    })
    Then(/^the cell \((\d+),(\d+)\) should not be tagged$/, (arg0, arg1) => {
        steps.verifyCellAreNotTagged(arg0,arg1)
    })
    Then('the player should lose the game', () => {
        steps.verifyLosedGame()
    })
    Then('the player should win the game', () => {
        steps.verifyWinnedGame()
    })
    Then(/^the cell \((\d+),(\d+)\) should have the value: (.*)$/, (arg0, arg1, arg2) => {
        steps.verifyValueShouldHave(arg0, arg1, arg2)
    });
    Then(/^the tag counter should have the value: "(.*)"$/, (arg0) => {
        steps.verifyFlagValue(arg0)
    });
  }


export default MineSweeper

