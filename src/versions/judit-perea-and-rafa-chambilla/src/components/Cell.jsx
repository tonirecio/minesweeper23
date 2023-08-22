import {
  MINE_ICON,
  FLAG_ICON,
  QUESTION_ICON,
  HIGHLIGHTED_MINE_ICON,
  WRONGLY_FLAGGED_ICON
} from '../utils/Constants'

export const Cell = ({
  value,
  isRevealed,
  isDisabled,
  tag,
  onClick,
  onContextMenu
}) => {
  let icon
  let numberClass

  if (isRevealed) {
    if (value === 'mine') {
      icon = MINE_ICON
    } else if (value === 'highlighted-mine') {
      icon = HIGHLIGHTED_MINE_ICON
    } else if (tag === 'wrongly-flagged') {
      icon = WRONGLY_FLAGGED_ICON
    } else if (value === 0) {
      icon = ''
    } else {
      icon = value
      numberClass = `number-${value}-color`
    }
  } else {
    if (tag === 'flag') {
      icon = FLAG_ICON
    } else if (tag === 'question') {
      icon = QUESTION_ICON
    }
  }

  const cellClass = `cell ${isRevealed ? 'revealed' : ''}`

  return (
    <div
      className={`${cellClass} ${numberClass}`}
      onClick={isDisabled ? () => {} : onClick}
      onContextMenu={click => {
        if (isDisabled) {
          click.preventDefault()
        } else {
          onContextMenu(click)
        }
      }}
    >
      {icon}
    </div>
  )
}
