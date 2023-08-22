/* eslint-disable */
import React from 'react'
import { Tile } from './Tile'
export function BoardFeatures ({ winner, mineCounter, timer, resetGame, dataTestId }) {
    const changeCatFace = (winner) => {
      if (winner) {
          return '😸'
        } else if (winner === null) {
          return '😼'
        } else {
          return '😿'
        }
    }
    const catFace = changeCatFace(winner)

    return (
        <section className='board-features'>
        <div className='mine-counter' >
          <h2 data-testid='mineCounter'>Mines: {mineCounter}</h2>      
        </div>
        <div className='cat-face'>
          {
              <Tile
                key={'Cat'}
                isClicked={false}
                onLeftClick={resetGame}
                dataTestId={dataTestId}
                isCat={true}
              >
                {catFace} 
              </Tile>
            }
        </div>
        <div className='timer'>
          <h2>{timer}</h2>      
        </div>
      </section>
    )
  }

