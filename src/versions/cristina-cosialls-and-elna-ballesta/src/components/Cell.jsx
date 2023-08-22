import React from 'react';
import { useEffect, useState } from 'react';
import { GAME_STATUS, TAG_STATUS } from '../constants';
import '../style/Cell.css';

function Cell({ positionX, positionY, isMine, minesAround, isCovered, tagStatus, leftClickingCell, rightClickingCell, gameStatus }) {
   
    const changeDisplayWhenPlaying = () => {
        if (!isCovered) {
            if (minesAround > 0) {
                setDisplay(minesAround)
                setColorClassName(`cell-${minesAround}`)
            } else {
                setDisplay(TAG_STATUS.emptyCell)
            }
        } else {
            if (tagStatus === 'inconclusive') {
                setDisplay(TAG_STATUS.inconclusive)
            } else if (tagStatus === 'flag') {
                setDisplay(TAG_STATUS.flag)
            } else {
                setDisplay(TAG_STATUS.hidden)
            }
        }
    }

    const changeDisplayWhenLose = () => {
        if (isMine && tagStatus !== 'flag') {
            setDisplay(TAG_STATUS.mine)
            if (tagStatus === 'exploded') {
                setColorClassName('cell-red')
            }
        }
        if (!isMine && tagStatus === 'flag') {
            setDisplay(TAG_STATUS.wronglyTagged)
            setColorClassName('cell-red')
        }
    }

    const changeDisplayWhenWin = () => {
        if (isMine) {
            setDisplay(TAG_STATUS.flag)
        }
    }

    const [display, setDisplay] = useState(TAG_STATUS.hidden)
    const [colorClassName, setColorClassName] = useState('')

    useEffect(() => {
        switch (gameStatus) {
            case GAME_STATUS.beforeStart:
                setDisplay(TAG_STATUS.hidden)
                setColorClassName('')
                break
            case GAME_STATUS.playing:
                changeDisplayWhenPlaying()
                break
            case GAME_STATUS.lost:
                changeDisplayWhenLose()
                break
            case GAME_STATUS.won:
                changeDisplayWhenWin()
                break
        }
    }, [tagStatus, gameStatus, isCovered])

    return (
        <td
            className={(isCovered) ? "Cell covered" : "Cell uncovered"}
            data-testid={'Cell-' + (positionY+1).toString() + '-' + (positionX+1).toString()}
            onClick={() => { leftClickingCell(positionX, positionY) }}
            onContextMenu={(event) => { rightClickingCell(event, positionX, positionY) }}
        >
            <p className={colorClassName} data-testid={'Cell-' + (positionY+1).toString() + '-' + (positionX+1).toString() + '-text'}>{display}</p>
        </td>
    );
}

export default Cell;
