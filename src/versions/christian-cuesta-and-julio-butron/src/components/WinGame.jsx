// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
function WinGame({ resetGame }) {
  return (
    <>
      <h2 className="dark" data-testid="win-game">
        You Win!
      </h2>
      <button className="reset-button" onClick={resetGame}>
        Play Again
      </button>
    </>
  );
}

export default WinGame;
