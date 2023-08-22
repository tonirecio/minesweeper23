import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App.jsx'

export const openTheGame = () => {
  render(<App />)
}

export const getAnyElementById = (id) => {
  return screen.getByTestId(id)
}

export const loadMockData = (mockData) => {

}

export const leftClickOnCell = (row, col) => {
  userEvent.click(screen.getByTestId('cell-row' + row + '-col' + col))
}

export const rightClickOnCell = (row, col) => {
  userEvent.click(screen.getByTestId('cell-row' + row + '-col' + col))
}

export const tagCell = (row, col, tag) => {

}

export const isGameOver = () => {
  return screen.getByTestId('game-status').textContent === 'Game Over'
}

export const isGameWon = () => {
  return screen.getByTestId('game-status').textContent === 'You Win!'
}
