import React from 'react';
import Cell from "./Cell";
import { GAME_STATUS } from '../constants';
import '../style/Board.css';

function Board({ board, leftClickingCell, rightClickingCell, gameStatus }) {

    return (
        <tbody data-testid='board' className={(gameStatus === GAME_STATUS.playing || gameStatus === GAME_STATUS.beforeStart) ? "Board" : "Board disabled"}>
            {
                board.map((row, indexY) => {
                    return (
                        <tr key={indexY}>
                            {row.map((cell, indexX) => {
                                return (
                                    <Cell
                                        positionX={indexX}
                                        positionY={indexY}
                                        isMine={cell.isMine}
                                        minesAround={cell.minesAround}
                                        isCovered={cell.isCovered}
                                        tagStatus={cell.tagStatus}
                                        leftClickingCell={leftClickingCell}
                                        rightClickingCell={rightClickingCell}
                                        gameStatus={gameStatus}
                                        key={indexX.toString() + '-' + indexY.toString()}
                                    />
                                )
                            })}
                        </tr>
                    )
                })
            }
        </tbody>
    );
}

export default Board;