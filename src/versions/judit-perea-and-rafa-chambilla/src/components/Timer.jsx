import { useState, useEffect } from 'react'

export default function Timer ({ gameState }) {
  const [time, setTime] = useState(0)

  useEffect(() => {
    let interval = null

    if (gameState === 'playing') {
      interval = setInterval(() => {
        setTime(prevTime => prevTime + 1)
      }, 1000)
    } else if (gameState === 'paused') {
      setTime(0)
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [gameState])

  return <div className='counter'>{time > 999 ? '∞' : time}</div>
}
