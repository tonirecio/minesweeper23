import React, { useEffect } from 'react'
import { getFaceSource } from '../logic/info'

export const InfoModule = ({ flags, faceSource, restartGame, seconds, counter, gameInProgress }) => {
  useEffect(() => {
    if (gameInProgress) {
      const intervalID = setInterval(() => {
        counter()
      }, 1000)
      return () => { clearInterval(intervalID) }
    }
  }, [gameInProgress, seconds])

  return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <div className="flagsRemaining d-wrap justify-content-center text-align-center align-items-center">
                    <span className="w-100 counterNumber" data-testid='remainingFlags'>{flags}</span>
                    <span className="counterDescription"> flags remaining </span>
                </div>
                <div className="emojiFace d-flex justify-content-center align-items-center click-pointer" data-testid='faceStatus' onClick={restartGame}>
                    {getFaceSource(faceSource)}
                </div>
                <div className="counter d-wrap justify-content-center align-items-center">
                    <span className="w-100 counterNumber" data-testid='secondsPassed'>{seconds}</span>
                    <span className="counterDescription"> Seconds </span>
                </div>
            </div>
        </>
  )
}
