/* eslint-disable */
import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Minesweeper from '../../components/Minesweeper.jsx'

const rightClickTile = (rowIndex, columnIndex) => {
  const coordinate = `${rowIndex-1}-${columnIndex-1}`
  const cell = screen.getByTestId(coordinate + ' tile')
  fireEvent.contextMenu(cell)
}

const leftClickTile = (rowIndex, columnIndex) => {
  const coordinate = `${rowIndex-1}-${columnIndex-1}`
  const cell = screen.getByTestId(coordinate + ' tile')
  fireEvent.click(cell)
}

const loadMockData = async (mockData) => {  
  const textarea = screen.getByTestId("mockData-text");
  const submitButton = screen.getByTestId("mockData-submit");

  fireEvent.change(textarea, { target: { value: mockData } });
  fireEvent.click(submitButton);
  await waitFor(() => expect(textarea.value).toBe(mockData));
}

const tagAsInconclusive = async (rowIndex, columnIndex) => {
  const coordinate = `${rowIndex-1}-${columnIndex-1}`
  const cell = screen.getByTestId(coordinate + ' tile')
  rightClickTile(rowIndex, columnIndex)
  await waitFor(() => fireEvent.contextMenu(cell))
  
}

export const MineSweeperSteps = ({
    given: Given,
    and : And,
    when: When,
    then: Then
}) => {

  let game

    Given("the player opens the game", () => {
      game = render(<Minesweeper/>)
    })
    Then("all the cells should be covered", () => {
      const tiles = game.container.querySelectorAll(".tile")
      tiles.forEach(tile => {
          expect(tile).not.toHaveClass('tile is-uncovered')
      })
    })
    Then("all the cells should be untagged", () => {
      const tiles = game.container.querySelectorAll(".tile")
      tiles.forEach(tile => {
        expect(tile.textContent).toBe('')
      })
      
    })
    Then("all the cells should be enabled", () => {
      const tiles = game.container.querySelectorAll(".tile")
      tiles.forEach(tile => {
        expect(tile).not.toHaveClass('tile is-disabled')
      })
    })

    // Given(/^the player loads the following mock data: (.*)$/, (data) => {
    //   const textbox = screen.getByTestId('mockData-text')
    //   const button = screen.getByTestId('mockData-submit')
    //   userEvent.clear(textbox)
    //   userEvent.type(textbox, data)
    //   userEvent.click(button)
    // })

    Then(/^the mine count display should show "([^"]*)"$/, (mineNumber) => {
        const mineCounter = screen.getByTestId('mineCounter')
        expect(mineCounter.textContent).toBe("Mines: " + mineNumber)

    })
    
    Given('the player loads the following mock data:', (mockData) => {
      loadMockData(mockData)
    })

    When(/^the player right clicks the cell \((\d+),(\d+)\)$/, (rowIndex, columnIndex) => {
      rightClickTile(rowIndex, columnIndex)
    })

    Then(/^the cell \((\d+),(\d+)\) should be flagged$/, (rowIndex, columnIndex) => {
      const coordinate = `${rowIndex-1}-${columnIndex-1}`
      const cell = screen.getByTestId(coordinate + ' tile')
      expect(cell.textContent).toBe('🚩')
    });

    And(/^the player tags the cell \((\d+),(\d+)\) as inconclusive$/, (rowIndex, columnIndex) => {
      tagAsInconclusive(rowIndex, columnIndex)
    })

    Then(/^the cell \((\d+),(\d+)\) should be tagged as inconclusive$/, (rowIndex, columnIndex) => {
      const coordinate = `${rowIndex-1}-${columnIndex-1}`
      const cell = screen.getByTestId(coordinate + ' tile')
      expect(cell.textContent).toBe('🤨')
    });
  
    And(/^the player flags the cell \((\d+),(\d+)\)$/, (rowIndex, columnIndex) => {
      rightClickTile(rowIndex, columnIndex)
    })

    Then(/^the cell \((\d+),(\d+)\) should be untagged$/, (rowIndex, columnIndex) => {
      const coordinate = `${rowIndex-1}-${columnIndex-1}`
      const cell = screen.getByTestId(coordinate + ' tile')
      expect(cell.textContent).toBe('')
    });


    When(/^the player left clicks the cell \((\d+),(\d+)\)$/, (rowIndex, columnIndex) => {
      leftClickTile(rowIndex, columnIndex)
    })

    Then(/^the cell \((\d+),(\d+)\) should be uncovered$/, (rowIndex, columnIndex) => {
      const coordinate = `${rowIndex-1}-${columnIndex-1}`
      const cell = screen.getByTestId(coordinate + ' tile')
      expect(cell).toHaveClass('tile is-uncovered')
    });

    And(/^the player uncovers the cell \((\d+),(\d+)\)$/, (rowIndex, columnIndex) => {
      leftClickTile(rowIndex, columnIndex)
    });

    Then(/^the cell \((\d+),(\d+)\) should show "(.*)"$/, (rowIndex, columnIndex, value) => {
      const coordinate = `${rowIndex-1}-${columnIndex-1}`
      const cell = screen.getByTestId(coordinate + ' tile')
      expect(cell.textContent).toBe(value)
    });

    When(/^the player unflags the cell \((\d+),(\d+)\)$/, (rowIndex, columnIndex) => {
      rightClickTile(rowIndex, columnIndex)
    });

    Then('the player should win the game', () => {
      const mineCounter = screen.getByTestId('resultText')
      expect(mineCounter.textContent).toBe("You Win")
    });

    Then('the player should lose the game', () => {
      const mineCounter = screen.getByTestId('resultText')
      expect(mineCounter.textContent).toBe("You Lose")
    });

    Then(/^the cell \((\d+),(\d+)\) should be disabled$/, (rowIndex, columnIndex) => {
      const coordinate = `${rowIndex-1}-${columnIndex-1}`
      const cell = screen.getByTestId(coordinate + ' tile')
    });

    Then('all the cells should be disabled', () => {
      const tiles = game.container.querySelectorAll(".tile")
      tiles.forEach(tile => {
          expect(tile).toHaveClass('tile is-disabled')
      })
    });

    Given('the player clicks the Reset button', () => {
      const resetButton = screen.getByTestId('catFace')
      fireEvent.click(resetButton)
    });

    Then('the game should reset', () => {
      const tiles = game.container.querySelectorAll(".tile")
      tiles.forEach(tile => {
          expect(tile).not.toHaveClass('tile is-uncovered')
          expect(tile).not.toHaveClass('tile is-disabled')
      })
    });
}



