import { board } from '../App.jsx'

export const changeStateCell = (updateBoard, index) => {
  const newBoard = [...board]
  updateBoard()
}
