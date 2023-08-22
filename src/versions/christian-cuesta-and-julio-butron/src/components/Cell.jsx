// eslint-disable-next-line no-unused-vars
import React from "react";
// eslint-disable-next-line react/prop-types
function Cell({ onClick, value, onContextMenu, flagged, i, j }) {
  const isFlagged = flagged[`${i}-${j}`];
  const row = parseInt(i) + 1;
  const col = parseInt(j) + 1;

  const getClassName = () => {
    return `cell ${
      typeof value === "number" || value === "B_clicked" ? "clicked" : ""
    }`;
  };

  const getContent = () => {
    if (isFlagged) return "🚩";
    return typeof value === "number"
      ? value !== 0 // Check if the value is not 0
        ? value
        : "" // If the value is 0, return an empty string
      : value === "B_clicked"
      ? "💣"
      : "";
  };

  return (
    <div
      data-testid={`cell-${row}-${col}`}
      onClick={onClick}
      className={getClassName()}
      onContextMenu={onContextMenu}
    >
      {getContent()}
    </div>
  );
}

export default Cell;
