/* eslint-disable */
import React from "react"
export const Tile = ({ children, isClicked, onLeftClick, onRightClick, disabled, dataTestId, isCat}) => {
  const className = `tile${isCat ? 'Cat' : ''} ${isClicked ? 'is-uncovered' : ''} ${disabled ? 'is-disabled' : ''} ` 
    
    return (
      <div onClick={onLeftClick} onContextMenu={onRightClick} className={className} data-testid={dataTestId}>
        {children}
      </div>
    )
  }
