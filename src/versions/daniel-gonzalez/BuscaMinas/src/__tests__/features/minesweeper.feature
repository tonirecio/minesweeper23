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
      "***-ooo-*oo"
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

    MINE
      "@" Highlighted mine
      "#" Non highlighted mine
    

  Game example: http://birrell.org/andrew/minesweeper/


Feature: MinesWeeper
  Background:
    Given the player opens the game


  # Scenario: Default display screen
  #   Then Timer has the following value: "0"


Scenario: Starting game - All the cells should be hidden
  Then all the cells should be covered


Scenario: Starting game - All the cells should be enabled
  Then all the cells should be enabled


# @4
# Scenario: Starting game - Show default counter
#   Given the player loads the following mock data:
#   Then The counter starts at 10 

# @5
# Scenario: Uncovering a mine cell - Time counter at 0 
#   Given the player loads the following mock data:
#   """
#   | * | o |
#   """
#   When the player uncovers the cell (1,1)
#   Then the timer stop

# @6
# Scenario: Click a cell - Time counter at 0 
#   When the player click a cell
#   Then the timer starts at 0

# @7
# Scenario: Time counter limit
#   When the timer value is < 999
#   Then the timer display shows "∞" 

# @8
# Scenario: Uncovering a cell - Disabling the cell
#   Given the player loads the following mock data:
#   """
#   | * | o |
#   """
#   When the player uncovers the cell (1,2)
#   Then the cell (1,2) should be disabled

# @9
# Scenario: Uncovering a cell - the cell has mine
#   Given the player loads the following mock data:
#   """
#   | * | o |
#   """
#   When the player uncovers the cell (1,1)
#   Then the cell has a mine

# #COVERED CELLS

# @10
# Scenario: Covered a cell - user tagged a cell by !
#   Given the player loads the following mock data:
#   """
#   | * | o |
#   """
#   When the player right clicks covered cell (1,1)
#   Then the cell should show "!"

# @11
# Scenario: Covered a cell - user tagged a cell by ?
#   Given the player loads the following mock data:
#   """
#   | * | o |
#   """
#   When the player double right clicks covered cell (1,1)
#   Then the cell should show "?"

# #LOSING GAME 

# @12
# Scenario: Uncovering a mine - Losing game 
#   Given the player loads the following mock data:
#   """
#   | * | o |
#   """
#   When the cell has a mine
#   Then the player loses the game 

# @13
# Scenario: Losing game - Highlighted mine
#   Given the player loads the following mock data:
#   """
#   | @ | o |
#   """
#   When the cell has a mine
#   Then the mine should be Highlighted

# @14
# Scenario: Losing game - Showing display
#   Given the player loads the following mock data:
#   """
#   | * | o |
#   """
#   When the cell has a mine
#   Then the player loses the game 

# @15
# Scenario: Losing game - Uncovering a mine after tagged cell
#   Given the player loads the following mock data:
#   """
#   | * | o |
#   """
#   When the cell has a "!"
#   Then the player sholud uncovers the cell

# @16
# Scenario: Losing game - Uncovering a mine after tagged cell
#   Given the player loads the following mock data:
#   """
#   | * | o |
#   """
#   When the cell has a "?"
#   Then the player sholud uncovers the cell

# @17
# Scenario: Losing game - Cell wrongly tagged
#   Given the player loads the following mock data:
#   """
#   | * | o |
#   """
#   When the cell has a ? 
#   And the player loses the game 
#   Then the cell should show "x"

# #

# @18
# Scenario: Disabling the cell - Verify adjacent 
#   Given the player loads the following mock data:
#   """
#   | * | o |
#   """
#   When the player uncovers the cell (1,2)
#   Then the cell (1,2) should be disabled

# @19
# Scenario: Counting adjacents mines 
#   Given the player loads the following mock data:
#   """
#   | o | o | * |
#   | o | o | o |
#   | o | o | o |
#   """
#   When the player uncovers the cell (1,2)
#   Then the cell (1,2) should be disabled

# @20
# Scenario: Uncovering a cell - Verify adjacent cells 1
#   Given the player loads the following mockData: "<table>"
#   When the player uncovers the cell (2,2)
#   Then the cell (2,2) sould show the following "<displayNumber>"
# Examples:
# | table         | displayNumber |
# | *oo-ooo-ooo   |      1        |
# | **o-ooo-ooo   |      2        |
# | ***-ooo-ooo   |      3        |
# | ***-*oo-ooo   |      4        |
# | ***-*o*-ooo   |      5        |
# | ***-*o*-*oo   |      6        |
# | ***-*o*-**o   |      7        |
# | ***-*o*-***   |      8        |


# # WIN

# @21
# Scenario: Win the game - Verify tagged cell (!)
#   Given the player loads the following mock data:
#   """
#   | * | o |
#   """
#   When the player tagged "!" (1,1) 
#   Then the player wins the game

# @22
# Scenario: Win the game - Verify tagged cell (?)
#   Given the player loads the following mock data:
#   """
#   | * | o |
#   """
#   When the player tagged "?" (1,1) 
#   Then the player wins the game

# @23
# Scenario: Win the game - automatically tagged cells
#   Given the player loads the following mock data:
#   """
#   | o | * | * | * |
#   """
#   When the player uncovers a cell (1,1) 
#   Then the player wins the game













