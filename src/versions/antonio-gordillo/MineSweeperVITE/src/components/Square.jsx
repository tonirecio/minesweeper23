import React from 'react'
import './/Components.css'

const Square = ({
  row, column,
  handleSquareDisplay,
  handleSquareClassName,
  handleSquareLeftClicked,
  handleSquareRightClicked,
  dataTestId
}) => {
  const className = handleSquareClassName(row, column)
  const cellDisplay = handleSquareDisplay(row, column)

  const handleLeftClick = () => {
    handleSquareLeftClicked(row, column)
  }

  const handleRightClick = (event) => {
    handleSquareRightClicked(row, column)
    event.preventDefault()
  }



  return (
    <div onContextMenu={handleRightClick} onClick={handleLeftClick} className={className} data-testid={dataTestId}>
      {cellDisplay}
    </div>
  )
}

export default Square
