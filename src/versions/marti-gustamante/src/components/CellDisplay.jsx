import { GAME_STATUS, TAG, NUMBER_COLORS, DISPLAY } from "../constants"
import React from "react"


export const CellDisplay = ({ gameStatus, content, isCovered, tag }) => {

    let shownDisplay = ' '
    if (isCovered) {
        if (tag === TAG.NONE) {
            shownDisplay = DISPLAY.NONE
        } else if (tag === TAG.INCONCLUSIVE) {
            shownDisplay = DISPLAY.INCONCLUSIVE
        } else if (tag === TAG.FLAG) {
            if (gameStatus !== GAME_STATUS.LOST) {
                shownDisplay = DISPLAY.FLAG
            } else {
                shownDisplay = DISPLAY.WRONG_FLAG
            }
        }
    } else {
        if (content < 0) {
            shownDisplay = DISPLAY.BOMB
        } else {
            if (content > 0) {
                shownDisplay = content
            }

        }
    }

    return (
        <span
            style={{
                color: (content > 0 && !isCovered) ? NUMBER_COLORS[content] : 'black',
            }}
        >{shownDisplay}</span>
    )
}