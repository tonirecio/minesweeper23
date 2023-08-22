export function generateBoard(INITIAL_BOMBS) {
  let board = Array.from({ length: 10 }, () => Array(10).fill(false));
  for (let i = 0; i < INITIAL_BOMBS; i++) {
    let row = Math.floor(Math.random() * 10);
    let col = Math.floor(Math.random() * 10);
    if (board[row][col] === "B") {
      i--;
    }
    board[row][col] = "B";
  }
  return board;
}

export const checkWin = (board) => {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] !== "B" && typeof board[i][j] !== "number") {
        return false;
      }
    }
  }
  return true;
};
