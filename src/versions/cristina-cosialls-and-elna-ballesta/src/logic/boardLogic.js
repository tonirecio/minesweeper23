const getNumMinesAround = (newBoard, y, x, width, height) => {
    let numMinesAround = 0
    let startY = Math.max(y- 1, 0)
    let startX = Math.max(x - 1, 0)
    let finishY = Math.min(y + 1, height - 1)
    let finishX = Math.min(x + 1, width - 1)

    for (let rowIndex = startY; rowIndex <= finishY; rowIndex++) {
        for (let columnIndex = startX; columnIndex <= finishX; columnIndex++) {
            if (newBoard[rowIndex][columnIndex].isMine !== false) {
                numMinesAround++
            }
        }
    }
    return numMinesAround
}

export const fillBoardWithProximities = (board, width, height) => {
    for (let rowIndex = 0; rowIndex < height; rowIndex++) {
        for (let columnIndex = 0; columnIndex < width; columnIndex++) {
            if (board[rowIndex][columnIndex].isMine === false) {
                let numMinesAround = getNumMinesAround(board, rowIndex, columnIndex, width, height)
                board[rowIndex][columnIndex].minesAround = numMinesAround
            }
        }
    }
}

const generateMines = (width, height, numberTotalMines) => {
    const mines = []

    while (mines.length < numberTotalMines) {
        const positionX = Math.floor(Math.random() * width)
        const positionY = Math.floor(Math.random() * height)
        const newMinePosition = positionX.toString() + '-' + positionY.toString()
        if (!mines.includes(newMinePosition)) {
            mines.push(newMinePosition)
        }
    }
    return (mines)
}

export const generateBoard = (width, height, numberMines) => {
    let newBoard = []
    const mines = generateMines(width, height, numberMines)
    for (let rowIndex = 0; rowIndex < height; rowIndex++) {
        const row = []
        for (let columnIndex = 0; columnIndex < width; columnIndex++) {
            const idCell = columnIndex.toString() + '-' + rowIndex.toString()
            const newCell = {
                isCovered: true,
                isMine: false,
                minesAround: 0,
                tagStatus: 'hidden'
            }
            if (mines.includes(idCell)) {
                newCell.isMine = true
                newCell.minesAround = -1
            }
            row.push(newCell) 
        }
        newBoard.push(row)
    }
    fillBoardWithProximities(newBoard, width, height)
    return (newBoard)
}

export const copyObject = (boardToCopy) => {
    return JSON.parse(JSON.stringify(boardToCopy))
}

export const uncoverAllMines = (newBoard ) => {
    for (let rowIndex = 0; rowIndex < newBoard.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < newBoard[0].length; columnIndex++) {
            if (newBoard[rowIndex][columnIndex].isMine && newBoard[rowIndex][columnIndex].tagStatus !== 'flag' ) {
                newBoard[rowIndex][columnIndex].isCovered = false
            }
        }
    }
}

export const uncoverAllBadTagedMines = (newBoard) => {
    for (let rowIndex = 0; rowIndex < newBoard.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < newBoard[0].length; columnIndex++) {
            if (newBoard[rowIndex][columnIndex].isMine === false &&
                 newBoard[rowIndex][columnIndex].tagStatus === 'flag') {
                newBoard[rowIndex][columnIndex].isCovered = false
            }
        }
    }
}

export const uncoverCascade = (newBoard, x, y) => {
    let newCellsUncovered = 0
    let startY = Math.max(y - 1, 0)
    let startX = Math.max(x - 1, 0)
    let finishY = Math.min(y + 1, newBoard.length - 1)
    let finishX = Math.min(x + 1, newBoard[0].length - 1)

    for (let rowIndex = startY; rowIndex <= finishY; rowIndex++) {
        for (let columnIndex = startX; columnIndex <= finishX; columnIndex++) {
            if (!(rowIndex === y && columnIndex === x)) {
                if (newBoard[rowIndex][columnIndex].isCovered === true && newBoard[rowIndex][columnIndex].tagStatus !== 'flag') {
                    newBoard[rowIndex][columnIndex].isCovered = false
                    newCellsUncovered++
                    if (newBoard[rowIndex][columnIndex].minesAround === 0) {
                        newCellsUncovered += uncoverCascade(newBoard, columnIndex, rowIndex)
                    }
                }
            }
        }
    }
    return newCellsUncovered
}