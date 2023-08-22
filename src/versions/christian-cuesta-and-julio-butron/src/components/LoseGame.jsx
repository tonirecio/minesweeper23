// eslint-disable-next-line no-unused-vars
import React from "react";

// eslint-disable-next-line react/prop-types
function LoseGame({ resetGame }) {
  return (
    <>
      <h2 className="dark" data-testid="lose-game">
        Game Over
      </h2>
      <button className="reset-button" onClick={resetGame}>
        Try Again
      </button>
    </>
  );
}

export default LoseGame;
