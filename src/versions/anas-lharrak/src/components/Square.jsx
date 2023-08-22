import { useState } from 'react'

export const Square = ({ setEmojiForSpecialCells, putFlagOrInconclusiveInCell, changeStateCell, children, rowIndex, columnIndex, setClassNameOfSquare }) => {
  const [isSpecialCell, setIsSpecialCell] = useState(false)

  const className = setClassNameOfSquare(children, rowIndex, columnIndex, isSpecialCell)

  return (
    <button
      className={className}
      onClick={() => {
        changeStateCell(rowIndex, columnIndex)
        if (children !== '*') {
          setIsSpecialCell(false)
        } else {
          setIsSpecialCell(true)
        }
      }}
      onContextMenu={(event) => {
        event.preventDefault()
        putFlagOrInconclusiveInCell(rowIndex, columnIndex)
        setIsSpecialCell(true) // Reiniciamos el estado isSpecialCell después de cada clic con el botón derecho
      }}
    >
      {isSpecialCell ? <div className='emojis'>{setEmojiForSpecialCells(rowIndex, columnIndex)}</div> : children}
    </button>
  )
}
