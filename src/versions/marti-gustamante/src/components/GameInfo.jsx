import '../App.css'
import { useEffect, useState } from 'react'
import { GAME_STATUS } from '../constants'
import { Smiley } from './Smiley'
import React from "react"


export const GameInfo = ({ availableFlags, gameStatus, updateGameStatus }) => {

    const [seconds, setSeconds] = useState(0)

    useEffect(() => {
        if (gameStatus === GAME_STATUS.STARTED) {
            const timerId = setInterval(() => {
                setSeconds(seconds + 1)
            }, 1000)
            return () => clearInterval(timerId)
        }
        if (gameStatus === GAME_STATUS.NONE || gameStatus === GAME_STATUS.RESET) {
            setSeconds(0)
        }
    }, [ gameStatus, seconds])

    const resetGame = () => {
        updateGameStatus(GAME_STATUS.RESET)
    }

    return (
        <section className="infoBar">
            <span data-testid='mineCounter'>{availableFlags}</span>
            <Smiley
                gameStatus={gameStatus}
                resetGame={resetGame}
            />
            <span>{seconds}</span>
        </section>
    )
}