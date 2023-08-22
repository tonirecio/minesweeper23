  // const uncoverAllTiles = (board) => {
  //   const revealedBoard = cloneBoard(board)
  //   for (let row = 0; row < revealedBoard.length; row++) {
  //     for (let column = 0; column < revealedBoard[0].length; column++) {
  //       revealedBoard[row][column] = countAdjacentMines(minesCoordinates, row, column)
  //     }
  //   }
  //   console.log("revealed board", revealedBoard)
  //   return revealedBoard
  // }

    // const initializeBoard = (newBoard) => {
  //   const minedBoard = setMines(newBoard)

  //   for (let row = 0; row < 10; row++) {
  //     for (let column = 0; column < 10; column++) {
  //       const mineCount = countAdjacentMines(minedBoard, row, column)
  //       if ( minedBoard[row][column] !== '@' && mineCount !== 0) {
  //         minedBoard[row][column] = mineCount
  //       }
       
  //     }
  //   }
  //   return minedBoard
  // }

  
  // const updateBoard = (rowIndex, columnIndex) => {
  //   let coordinate = getTileCoordinate(rowIndex, columnIndex)

    // const newSymbolicBoard = cloneBoard(symbolicBoard)
    // newSymbolicBoard[rowIndex][columnIndex] = 'X'
    // setSymbolicBoard(newSymbolicBoard)
    //board[rowIndex][columnIndex] >= 1 && board[rowIndex][columnIndex] <= 8
    //if (clickedCells.includes(coordinate) || winner) return
    
    //let newBoard = cloneBoard(board)
    // if (minesCoordinates.includes(coordinate)) {
    //   revealAllMines(newBoard, setBoard)
    //   setWinner(false)
    //   setIsDisabled(true)
    // } else {
      // if (countAdjacentMines(minesCoordinates, rowIndex, columnIndex) === null) {
      //   cascadeEmptyTiles(newBoard, rowIndex, columnIndex)
      // } else {
      //   newBoard[rowIndex][columnIndex] = countAdjacentMines(minesCoordinates, rowIndex, columnIndex)
      //   setBoard(newBoard)
      // }
    
      // const newNumberOfTilesClicked = NumberOfTilesClicked + 1
      // setNumberOfTilesClicked(newNumberOfTilesClicked)

      // const newWinner = checkWin(newNumberOfTilesClicked)
      // setWinner(newWinner)
    //}   