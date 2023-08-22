export default function GameStatus ({ gameState }) {
  const iconMap = {
    playing: '🗿',
    win: '😚',
    lose: '😢',
    paused: '😐'
  }

  return <div className='game-status'>{iconMap[gameState]}</div>
}
