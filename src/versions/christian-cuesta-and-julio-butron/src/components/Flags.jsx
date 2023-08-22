// eslint-disable-next-line no-unused-vars
import React from "react";
// eslint-disable-next-line react/prop-types
const Flags = ({ flagged, initialBombs }) => {
  const flagsUsed = Object.values(flagged).filter(Boolean).length;
  const flagsRemaining = initialBombs - flagsUsed;

  return <div className="flags dark">Flags: {flagsRemaining}</div>;
};

export default Flags;
