import React from 'react';
import { useEffect, useState } from "react";
import { GAME_STATUS } from '../constants';
import happyFace from '../assets/win.gif';
import sadFace from '../assets/lose.gif';
import neutralFace from '../assets/playing.gif';

function ResetButton({ gameStatus, resetGame }) {

    const [imagePath, setImagePath] = useState(neutralFace)

    useEffect(() => {
        switch (gameStatus) {
            case GAME_STATUS.beforeStart:
            case GAME_STATUS.playing:
                setImagePath(neutralFace)
                break
            case GAME_STATUS.won:
                setImagePath(happyFace)
                break
            case GAME_STATUS.lost:
                setImagePath(sadFace)
                break
        }
    }, [gameStatus])

    return (
        <button className='button' data-testid='reset-button' onClick={resetGame}>
            <img src={imagePath} alt={gameStatus}></img>
        </button>

    );
}

export default ResetButton;
