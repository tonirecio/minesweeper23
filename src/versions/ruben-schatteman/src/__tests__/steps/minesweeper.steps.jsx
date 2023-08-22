import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../../App'
import { parseMockDataToString } from '../../helpers/mockDataHelper'

export const openTheGame = () => {
  render(<App />)
}

export const loadMockData = (mockData) => {
  userEvent.keyboard('{ctrl}m')
  const text = screen.getByTestId('mockDataLoader-textarea')
  const button = screen.getByTestId('mockDataLoader-loadButton')
  userEvent.clear(text)
  userEvent.type(text, mockData)
  userEvent.click(button)
}

export const leftClickOnCell = (row, col) => {
  userEvent.click(screen.getByTestId('cell-row' + row + '-col' + col))
}

export const righClickOnCell = (row, col) => {
  fireEvent.contextMenu(screen.getByTestId('cell-row' + row + '-col' + col))
}