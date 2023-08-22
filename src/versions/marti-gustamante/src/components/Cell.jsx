import { GAME_STATUS, MOUSE_CLICK } from "../constants"
import { CellDisplay } from "./CellDisplay"
import React from "react"


export const Cell = ({ content, isCovered, tag, x, y, gameStatus, updateBoard, cells }) => {

    let cellClass = isCovered ? 'cell-covered' : 'cell-uncovered'
    if (cells > 10) cellClass += ' small'
    if (gameStatus === GAME_STATUS.WON || gameStatus === GAME_STATUS.LOST || !isCovered) cellClass += ' disabled'

    const handleLeftClick = () => {
        updateBoard(x, y, MOUSE_CLICK.LEFT)
    }

    const handleRightClick = (event) => {
        event.preventDefault()
        updateBoard(x, y, MOUSE_CLICK.RIGHT)
    }

    return (
        <div
            data-testid={`${y+1}-${x+1}`}
            className={cellClass}
            onContextMenu={handleRightClick}
            onClick={handleLeftClick}
        >
            <CellDisplay
                gameStatus={gameStatus}
                content={content}
                isCovered={isCovered}
                tag={tag}
            />
        </div>
    )
}