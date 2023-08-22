import React from "react"
export function WinnerText ({ winner }) {
  if (winner === null) return null

  const ResultText = winner === true ? 'You Win' : 'You Lose'
  return (
    <section className='winner'>
      <div className='text'>
        <h2 data-testid='resultText'>{ResultText}</h2>      
      </div>
    </section>
  )
}

