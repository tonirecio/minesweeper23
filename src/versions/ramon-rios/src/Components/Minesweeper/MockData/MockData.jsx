import * as BOARD_BEHAVIOR from '../Engine/BoardBehavior'
import * as CELL_BEHAVIOR from '../Engine/CellBehavior'
import { useState } from "react";
import { CELL_VALUES } from '../MinesweeperConstants';
import React from 'react'

export function MockData ({setCells, setMines}) {
    const [text, setText] = useState('')

    const handleInputChange = (event) => {
        setText(event.target.value)
    }

    const handleButtonClick = () => {
        parseMockDataToString(text)
        setText('')
    }

    const parseMockDataToString = (mockData) => {
        if (mockData.includes("-")){
            var data = mockData.split("-")
            var mines = mockData.split('*').length - 1
            var newBoard = BOARD_BEHAVIOR.newBoard(data.length)
            fillMockDataMines(newBoard, data)
            BOARD_BEHAVIOR.countMinesAndRealodValues(newBoard)
            console.log(newBoard);
            newBoard = CELL_BEHAVIOR.inicialiceCells(newBoard)
            setCells(newBoard)
            setMines(mines)
        }
    }

    const fillMockDataMines = (newBoard, data) => {
        for (var row = 0; row < newBoard.length; row++) {
            for (var col = 0; col < newBoard[row].length; col++) {
                newBoard[row][col] = createCell(data[row][col])
            }
        }
        
    }

    const createCell = (mockDataCellToCheck) => {
        console.log(mockDataCellToCheck);
        if (mockDataCellToCheck == '*') return CELL_VALUES.MINE
        else return CELL_VALUES.COVERED
    }

    return (
        <>
         <div>
            <input data-testid="mockDataLoader" type="text" value={text} onChange={handleInputChange} />
            <button data-testid="mockDataLoaderButton" onClick={handleButtonClick}>OK</button>
        </div>
        </>
    )

}