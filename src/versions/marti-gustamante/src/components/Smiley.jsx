import { GAME_STATUS, SMILEY } from "../constants"
import React from "react"



export const Smiley = ({ gameStatus, resetGame }) => {

    let smileySrc = ''
    if (gameStatus === GAME_STATUS.LOST) {
        smileySrc = SMILEY.SAD
    } else if (gameStatus === GAME_STATUS.WON) {
        smileySrc = SMILEY.VICTORIUS
    } else {
        smileySrc = SMILEY.NORMAL
    }

    return (
        <img
            data-testid='reset-button'
            onClick={resetGame}
            className='smileyImage'
            src={smileySrc}
            alt='Smiley-style face which changes expression when winning or losing the game'
        />
    )
}