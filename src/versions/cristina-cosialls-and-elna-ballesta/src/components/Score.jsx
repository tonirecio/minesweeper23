import React from 'react';
import { useEffect, useState } from "react";
import ResetButton from './ResetButton';
import { GAME_STATUS } from '../constants';
import pauseImg from '../assets/pause-button.png'
import playImg from '../assets/play-button.png'
import '../style/Score.css';

function Score({ remainingMines, gameStatus, resetGame, pauseGame, continueGame }) {

    const changePlayPauseStatus = () => {
        if (gameStatus === GAME_STATUS.paused) {
            continueGame()
            startTimer()
            setButtonImage(pauseImg)
        } else if (gameStatus === GAME_STATUS.playing) {
            pauseGame()
            pauseTimer()
            setButtonImage(playImg)
        } 
    }

    const startTimer = () => {
        clearInterval(timerId)
        const newTimerId = setInterval(() => {
            setTimer((t) => t + 1)
        }, 1000)
        setTimerId(newTimerId)
    }

    const pauseTimer = () => {
        clearInterval(timerId)
        setTimerId(null)
    }

    const resetTimer = () => {
        clearInterval(timerId)
        setTimer(0)
    }

    const [timer, setTimer] = useState(0)
    const [timerId, setTimerId] = useState(null)
    const [buttonImage, setButtonImage] = useState(pauseImg)

    useEffect(() => {
        switch (gameStatus) {
            case GAME_STATUS.beforeStart:
                resetTimer()
                break
            case GAME_STATUS.playing:
                startTimer()
                break
            case GAME_STATUS.won:
            case GAME_STATUS.lost:
                pauseTimer()
                break
        }
    }, [gameStatus])

    useEffect(() => {
        if (timer > 999) {
            setTimer('∞')
            pauseTimer()
        }
    }, [timer])

    return (
        <thead>
            <tr>
                <td className='Score'>
                    <div data-testid='mines-counter' className='score-mines'>{remainingMines}</div>
                    <ResetButton gameStatus={gameStatus} resetGame={resetGame} />
                    <button className='button' onClick={changePlayPauseStatus}>
                        <img src={buttonImage}></img>
                    </button>
                    <div data-testid='time-counter' className='score-time'>{(gameStatus !== GAME_STATUS.beforeStart) ? timer : ''}</div>
                </td>
            </tr>
        </thead>
    );
}

export default Score;