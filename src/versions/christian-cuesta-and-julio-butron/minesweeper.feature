Feature: Minesweeper
  As a player:
  - I want to play to the classic minesweeper game
  - So I want to detect all the mines in the board
  How to refer to a cell:
  - Using the (row,column) nomenclature
  - Rows and columns starts from 1
  How to load mock data:
  - Using the <ctrl>+m keyboard combination to discover
    the load mock data form
  To define the board data will use:
    "o" No mine
    "*" Mine
    "-" Row separator
    Thera are two ways to define mock data:
    - Inline:
      "*-ooo-*oo"
    - Table:
      | * | * | * |
      | o | o | o |
      | * | o | o |
  To define the board display will use:
    COVERED CELLS
      "." Hidden cell
      "!" Cell tagged has mined cell by the user
      "?" Cell tagged has inconclusive cell by the user
      "x" Cell wrongly tagged has no mined cell by the user
    UNCOVERED CELLS
      "0" Empty cell
      "1" Clean cell with 1 adjacent mine
      "2" Clean cell with 2 adjacent mines
      "3" Clean cell with 3 adjacent mines
      "4" Clean cell with 4 adjacent mines
      "5" Clean cell with 5 adjacent mines
      "6" Clean cell with 6 adjacent mines
      "7" Clean cell with 7 adjacent mines
      "8" Clean cell with 8 adjacent mines
      "9" Clean cell with 9 adjacent mines
      "@" highlighted mine
  Game example: http://birrell.org/andrew/minesweeper/
Background:
  Given the player opens the game

Scenario: Starting game - All the cells should be hidden
  Then all the cells should be covered

Scenario: Starting game - All the cells should be enabled
Then all the cells should be enabled

Scenario: Pump Marker Counter
  Then the counter should start with 10

Scenario: Uncovering a cell - Disabling the cell
  Given the player loads the following mock data:
  """
  | * | o |
  """
  When the player uncovers the cell (1,2)
  Then the cell (1,2) should be disabled

Scenario: Timer Start
  When the player on click cell (1,2) and if the cell (1,2) don't have bomb
  """
  | * | o |
  """
  Then the timer should start

Scenario: Timer don't Start
  When the player on click cell (1,2) and if the cell (1,2) have bomb
  """
  | * | o |
  """
  Then the timer shouldn't start

Scenario: Timer limit
  When the timer show < 999
  Then the display timer show infinite image 

Scenario: Lose the game
  Given the player loads the following mock data:
  """
  | * | o |
  """
  When the player uncovers the cell (1,1)
  Then the player should lose the game

Scenario: Lose the game - Highlighted mine
  Given the player loads the following mock data:
  """
  | * | o |
  """
  When the player uncovers the cell (1,1)
  Then the mine should be highlighted

Scenario: Lose the game - Show all the mines
  Given the player loads the following mock data:
  """
  | * | o | * |
  """
  When the player uncovers the cell (1,1)
  Then all mines should be revealed

Scenario: Empty cell
  When the player

Scenario: Cell with adjacent mines - 1 mine
Given the player loads the following mock data:
"""
| o | o | * |
| o | o | o |
"""
When the player uncovers the cell (2,2)
Then the cell (2,2) should show "1"

Scenario: Cell with adjacent mines - 2 mines
Given the player loads the following mock data:
"""
| * | o | * |
| o | o | o |
"""
When the player uncovers the cell (2,2)
Then the cell (2,2) should show "2"

Scenario: Cell with adjacent mines - 3 mines
Given the player loads the following mock data:
"""
| * | * | * |
| o | o | o |
"""
When the player uncovers the cell (2,2)
Then the cell (2,2) should show "3"

Scenario: Cell with adjacent mines - 4 mines
Given the player loads the following mock data:
"""
| * | * | * |
| * | o | o |
"""
When the player uncovers the cell (2,2)
Then the cell (2,2) should show "4"

Scenario: Cell with adjacent mines - 5 mine
Given the player loads the following mock data:
"""
| * | * | * |
| * | o | * |
"""
When the player uncovers the cell (2,2)
Then the cell (2,2) should show "5"

Scenario: Cell with adjacent mines - 6 mines
Given the player loads the following mock data:
"""
| * | * | * |
| * | o | * |
| * | o | o |
"""
When the player uncovers the cell (2,2)
Then the cell (2,2) should show "6"

Scenario: Cell with adjacent mines - 7 mine
Given the player loads the following mock data:
"""
| * | * | * |
| * | o | * |
| * | * | o |
"""
When the player uncovers the cell (2,2)
Then the cell (2,2) should show "7"

Scenario: Cell with adjacent mines - 8 mines
Given the player loads the following mock data:
"""
| * | * | * |
| * | o | * |
| * | * | * |
"""
When the player uncovers the cell (2,2)
Then the cell (2,2) should show "8"

Scenario: Tagging a cell as mined
Given the player loads the following mock data:
"""
| * | o |
"""
When the player tags the cell (1,1) as mined
Then the cell (1,1) should be marked as "!"

Scenario: Tagging a cell as inconclusive
Given the player loads the following mock data:
"""
| * | o |
"""
When the player tags the cell (1,2) as inconclusive
Then the cell (1,2) should be marked as "?"

Scenario: Winning the game
Given the player loads the following mock data:
"""
| * | o |
"""
When the player uncovers the cell (1,2)
Then the player wins the game