import { DIFFICULTY } from "../constants"
import React from "react"


export const DifficultySetter = ({ setGameDifficulty }) => {

    return (
        <div className="difficultySetter">
            <button className='button-easy'
                onClick={() => setGameDifficulty(DIFFICULTY.EASY)}>
                Easy
            </button>
            <button className='button-medium'
                onClick={() => setGameDifficulty(DIFFICULTY.MEDIUM)}>
                Medium
            </button>
            <button className='button-hard'
                onClick={() => setGameDifficulty(DIFFICULTY.HARD)}>
                Hard
            </button>
        </div>
    )
}