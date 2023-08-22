/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Board from "../../components/Board";
import "@testing-library/jest-dom/extend-expect";

const loadMockData = async (mockData) => {
  fireEvent.keyDown(document, { key: "m", ctrlKey: true });
  const textarea = screen.getByTestId("mockDataLoader-textarea");
  const submitButton = screen.getByTestId("mockDataLoader-loadButton");

  fireEvent.change(textarea, { target: { value: mockData } });

  fireEvent.click(submitButton);

  await waitFor(() => expect(textarea.value).toBe(mockData));
};

const leftClickOnCell = async (row, col) => {
  const cell = screen.getByTestId("cell-" + row + "-" + col);

  await waitFor(() => {
    fireEvent.click(cell);
  });
};

const minesweeperSteps = ({ given: Given, when: When, then: Then }) => {
  let boardComponent;

  Given("the player opens the game", () => {
    boardComponent = render(<Board />);
  });

  Given("the player loads the following mock data:", async (mockData) => {
    await loadMockData(mockData);
  });

  When(/^the player uncovers the cell \((\d+),(\d+)\)$/, (row, col) => {
    leftClickOnCell(row, col);
  });

  When(/^the player tags the cell \((\d+),(\d+)\) as mined$/, (row, col) => {
    const cell = screen.getByTestId("cell-" + row + "-" + col);
    fireEvent.contextMenu(cell);
  });

  Then("all the cells should be covered", () => {
    const cells = boardComponent.container.querySelectorAll(".cell");
    cells.forEach((cell) => {
      expect(cell).not.toHaveAttribute("cell.clicked");
    });
  });

  Then("all the cells should be enabled", () => {
    const cells = boardComponent.container.querySelectorAll(".cell");
    cells.forEach((cell) => {
      expect(cell).toBeEnabled();
    });
  });

  Then(/^the counter should start with (\d+)$/, (expectedInitialBombs) => {
    const flagsElement = screen.getByText(/Flags: \d+/);

    expect(flagsElement).toHaveTextContent(`Flags: ${expectedInitialBombs}`);
  });

  Then(/^the cell \((\d+),(\d+)\) should be disabled$/, (row, col) => {
    const cell = screen.getByTestId("cell-" + row + "-" + col);

    expect(cell).toHaveClass("cell clicked");
  });

  Then(/^the timer should show (\d+)$/, (expectedTime) => {
    const timerElement = screen.queryByTestId("timer");

    waitFor(() => {
      const timeText = timerElement.textContent;
      const currentTime = parseInt(timeText.replace("Time: ", ""));
      expect(currentTime).toBe(expectedTime);
    });
  });

  Then("the player should lose the game", () => {
    const loseGameElement = screen.getByTestId("lose-game");
    expect(loseGameElement).toBeInTheDocument();
  });

  Then("the player should win the game", () => {
    const winGameElement = screen.getByTestId("win-game");
    expect(winGameElement).toBeInTheDocument();
  });

  Then(
    /^the cell \((\d+),(\d+)\) should show "(.*)"$/,
    (row, col, expectedNumber) => {
      const cell = screen.getByTestId(`cell-${row}-${col}`);
      expect(cell).toHaveTextContent(expectedNumber);
    }
  );
};

export default minesweeperSteps;
