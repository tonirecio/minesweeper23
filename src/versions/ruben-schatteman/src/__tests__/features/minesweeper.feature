@AUTHORS:________Adrian_Lopez__Ruben_Schatteman
​
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
  MINE STATUS
  "@" highlighted mine
  "#" mine that was not exploded when losing the game
  Game example: http://birrell.org/andrew/minesweeper/
​
  Background:
    Given the player opens the game
​
  Scenario: Starting game - All the cells should be hidden
    Then all the cells should be covered
​
  Scenario: Starting game - All the cells should be enabled
    Then all the cells should be enabled
​
  Scenario: Starting game - Timer check
    Given the player loads the following mock data:
      """
      | * | o |
      """
    When the player uncovers the cell (1,2)
    Then the counter should display "1" after "1" second
    And the counter should display "2" after "1" second
    And the counter should display "3" after "1" second
​
  Scenario: Uncovering a cell - Disabling the cell
    Given the player loads the following mock data:
      """
      | * | o |
      """
    When the player uncovers the cell (1,2)
    Then the cell (1,2) should be disabled
​
  Scenario Outline: Uncovering a cell - Showing the adjacent mines number
    Given the player loads the inline mock data "<inlineData>"
    When the player uncovers the cell (2,2)
    Then the cell has the value "<value>"
​
    Examples:
      | inlineData  | value |
      | *oo-ooo-ooo | 1     |
      | **o-ooo-ooo | 2     |
      | ***-ooo-ooo | 3     |
      | ***-*oo-ooo | 4     |
      | ***-*o*-ooo | 5     |
      | ***-*o*-*oo | 6     |
      | ***-*o*-**o | 7     |
      | ***-*o*-*** | 8     |
​
  Scenario: Uncovering a cell - Cell doesn't have close mines (cascade)
    Given the player loads the following mock data:
      """
      | * | o | o | * | o |
      | o | o | o | o | o |
      | o | o | o | o | o |
      | o | o | o | o | o |
      | o | o | o | o | o |
      """
    When the player uncovers the cell (4,4)
    Then the board should be shown like this:
      """
      | . | 1 | 1 | . | 1 |
      | 1 | 1 | 1 | 1 | 1 |
      | 0 | 0 | 0 | 0 | 0 |
      | 0 | 0 | 0 | 0 | 0 |
      | 0 | 0 | 0 | 0 | 0 |
      """
​
  Scenario: Uncovering a cell - Flags block the cascade
    Given the player loads the following mock data:
      """
      | * | * | ! | o | o |
      | * | ! | o | o | o |
      | ! | o | o | o | o |
      | o | o | o | o | o |
      | o | o | o | o | o |
      """
    When the player uncovers the cell (4,4)
    Then the board should be shown like this:
      """
      | . | . | ! | 0 | 0 |
      | . | ! | 0 | 0 | 0 |
      | ! | 0 | 0 | 0 | 0 |
      | 0 | 0 | 0 | 0 | 0 |
      | 0 | 0 | 0 | 0 | 0 |
      """
​
  Scenario: Uncovering a cell -  Cell has close mines
    Given the player loads the inline mock data "<inlineData>"
    When the player uncovers the cell ("<cellRow>","<cellColumn>")
    Then the board should be shown as "<resultInterface>"
​
    Examples:
      | inlineData  | cellRow | cellColumn | resultInterface |
      | *oo-ooo-oo* | 2       | 2          | ...-.2.-...     |
      | o*o-*oo-ooo | 1       | 3          | ...-.2.-...     |
​
  Scenario: Flag logic - Starting number of flags
    Given the player loads the following mock data:
      """
      | * | * | o |
      | o | * | * |
      """
    Then the number of remaining flags should be "4"
​
  Scenario: Flag logic - Adding a flag
    Given the player loads the following mock data:
      """
      | * |
      """
    When the player marks "1" times the cell (1,1)
    Then the board should be shown like this:
      """
      | ! |
      """
​
  Scenario: Flag logic - Adding several flags
    Given the player loads the following mock data:
      """
      | * | * | o |
      """
    When the player marks "1" times the cell (1,1)
    Then the number of remaining flags should be "1"
​
  Scenario: Flag logic - Adding an inconclusive flag
    Given the player loads the following mock data:
      """
      | * |
      """
    When the player marks "2" times the cell (1,1)
    Then the board should be shown like this:
      """
      | ? |
      """
​
  Scenario: Flag logic - Unflagging a space
    Given the player loads the following mock data:
      """
      | * |
      """
    When the player marks "3" times the cell (1,1)
    Then the board should be shown like this:
      """
      | . |
      """
​
  Scenario: Winning the game - Success state
    Given the player loads the following mock data:
      """
      | * | o |
      """
    When the player uncovers the cell (1,2)
    Then the game should be in a "SUCCESS" state
​
  Scenario: Winning the game - Showing a correctly tagged flag
    Given the player loads the following mock data:
      """
      | * | o |
      """
    And the player tags the board like this:
      """
      | ! | . |
      """
    When the player uncovers the cell (1,2)
    Then the board should be shown like this:
      """
      | ! | 1 |
      """
​
  Scenario: Losing the game - Game over state
    Given the player loads the following mock data:
      """
      | * |
      """
    When the player uncovers the cell (1,1)
    Then the game should be in a "GAME OVER" state
​
  Scenario: Losing the game - Uncovering a mine
    Given the player loads the following mock data:
      """
      | * |
      """
    When the player uncovers the cell (1,1)
    Then the board should be shown like this:
      """
      | @ |
      """
​
  Scenario: Losing the game - Showing a wrong tagged flag
    Given the player loads the following mock data:
      """
      | * | o |
      """
    And the player tags the board like this:
      """
      | . | ! |
      """
    When the player uncovers the cell (1,1)
    Then the board should be shown like this:
      """
      | @ | x |
      """
​
  Scenario: Losing the game - Uncovering a mine with uncovered spaces
    Given the player loads the following mock data:
      """
      | * | o |
      """
    When the player uncovers the cell (1,1)
    Then the board should be shown like this:
      """
      | @ | . |
      """
​
  Scenario: Losing the game - Uncovering a mine with uncovered mines
    Given the player loads the following mock data:
      """
      | * | * |
      """
    When the player uncovers the cell (1,1)
    Then the board should be shown like this:
      """
      | @ | # |
      """
​
  @Manual
  Scenario: Finishing the game - Timer stops
    When the game has been finished
    Then the counter should stop counting