import ingameEmoji from '../img/ingame.png'
import loseEmoji from '../img/lose.png'
import winEmoji from '../img/win.png'

export const ResetButton = ({ setCounterOfFlags, setIsResetButtonClicked, setboardOfSpecialCells, statusGame, updateBoard, setStatusGame, generateNewBoard }) => {
  let emojiToDisplay = null

  if (statusGame === 'inGame' || statusGame === 'initGame') {
    emojiToDisplay = ingameEmoji
  } else if (statusGame === 'win') {
    emojiToDisplay = winEmoji
  } else {
    emojiToDisplay = loseEmoji
  }

  const resetGame = () => {
    const rows = 9
    const columns = 10

    const newBoardOfSpecialCells = Array(rows).fill(null).map(() => Array(columns).fill('.'))
    setboardOfSpecialCells(newBoardOfSpecialCells)
    const newBoard = generateNewBoard()
    updateBoard(newBoard)
    setIsResetButtonClicked(true)
    setCounterOfFlags(10)
    setStatusGame('initGame')
  }
  return (
    <button className='resetButton' onClick={resetGame}>
      <img className='imgEmoji' src={emojiToDisplay} alt='' />
    </button>
  )
}
