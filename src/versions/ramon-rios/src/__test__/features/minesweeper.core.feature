
## No he conseguido hacer ni el test 17 ni el 21

Feature: Feature: Minesweeper
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
    ENDED THE GAME
      "@" highlighted mine
      "#" mine
  Game example: http://birrell.org/andrew/minesweeper/

Background:
  Given the player opens the game

@test01
Scenario: Starting game - All the cells should be hidden
  Then all the cells should be covered

@test02
Scenario: Starting game - All the cells should be enabled
  Then all the cells should be enabled

@test03
Scenario: Uncovering a cell - Disabling the cell
  Given the player loads the following mock data:
  """
  | * | o |
  | * | o |
  """
  When the player uncovers the cell (1,2)
  Then the cell (1,2) should be disabled

@test04
Scenario: Tagging a Mine
  Given the player loads the following mock data:
  """
  | * | o |
  | o | o |
  """
  When the player right click the cell (1,1)
  Then the cell (1,1) should be tagged

@test05
Scenario: Inconclusive Tagging a Mine
  Given the player loads the following mock data:
  """
  | * | o |
  | o | o |
  """
  When the player right click the cell (1,1)
  And the player right click the cell (1,1)
  Then the cell (1,1) should be inconclusively tagged

@test06
Scenario: Untagging a tagged Mine
  Given the player loads the following mock data:
  """
  | * | o |
  | o | o |
  """
  When the player tag the cell (1,1)
  And the player right click the cell (1,1)
  And the player right click the cell (1,1)
  Then the cell (1,1) should not be tagged

@test07
Scenario: Untagging a inconclusive tagged Mine
  Given the player loads the following mock data:
  """
  | * | o |
  | o | o |
  """
  When the player tag inconclusively the cell (1,1)
  And the player right click the cell (1,1)
  Then the cell (1,1) should not be tagged

@test08
Scenario: Losing a Game
  Given the player loads the following mock data:
  """
  | * | o |
  | o | o |
  """
  When the player uncovers the cell (1,1)
  Then the player should lose the game

  @test09
Scenario: Losing a Game - uncover a tagged mine
  Given the player loads the following mock data:
  """
  | * | o |
  | o | o |
  """
  When the player tag the cell (1,1)
  And the player uncovers the cell (1,1)
  Then the player should lose the game

@test10
Scenario: Losing a Game - uncover an incoclusive tagged mine
  Given the player loads the following mock data:
  """
  | * | o |
  | o | o |
  """
  When the player tag inconclusively the cell (1,1)
  And the player uncovers the cell (1,1)
  Then the player should lose the game

  @test11
Scenario: Uncover and show the cell value
  # Given the player loads the following mock data: "<mockData>"
  # When the player uncovers the cell (2,2)
  # Then the cell (2,2) should have the value: "<values>"

# Examples:
  # | mockData      | values |
  # | "ooo-ooo-ooo" |      0 |
  # | "*oo-ooo-ooo" |      1 |
  # | "**o-ooo-ooo" |      2 |
  # | "***-ooo-ooo" |      3 |
  # | "***-*oo-ooo" |      4 |
  # | "***-*o*-ooo" |      5 |
  # | "***-*o*-*oo" |      6 |
  # | "***-*o*-**o" |      7 |
  # | "***-*o*-***" |      8 |

@test12
Scenario: Winning the game - Uncover all without tag anything
  Given the player loads the following mock data:
  """
  | * | o |
  | o | o |
  """
  When the player uncovers the cell (1,2)
  Then the player should win the game

@test13
Scenario: Winning the game - Uncover all tagging some cells
  Given the player loads the following mock data:
  """
  | * | o |
  | o | o |
  """
  When the player tag the cell (1,1)
  And the player uncovers the cell (1,2)
  Then the player should win the game

@test14
Scenario: Winning the game - Uncover all tagging some cells inconclusively
  Given the player loads the following mock data:
  """
  | * | o |
  | o | o |
  """
  When the player tag inconclusively the cell (1,1)
  And the player uncovers the cell (1,2)
  Then the player should win the game

@test15
Scenario: Winning the game - Autotag the untagged
  Given the player loads the following mock data:
  """
  | * | o |
  | o | o |
  """
  When the player uncovers the cell (1,2)
  And the player uncovers the cell (2,2)
  And the player uncovers the cell (2,1)
  Then the cell (1,1) should have the value: "!"

@test16
Scenario: Winning the game - Autotag the tagged inconclusively
  Given the player loads the following mock data:
  """
  | * | o |
  | o | o |
  """
  When the player tag inconclusively the cell (1,1)
  And the player uncovers the cell (1,2)
  And the player uncovers the cell (2,2)
  And the player uncovers the cell (2,1)
  Then the cell (1,1) should have the value: "!"

@test17
Scenario: Cascade Uncovering
  # Given the player loads the following mock data:
  # """
  # | * | o | o | * | o |
  # | o | o | o | o | * |
  # | o | o | o | o | o |
  # | o | o | o | o | * |
  # | o | * | * | o | * |
  # """
  # When the player uncovers the cell (3,1)
  # Then the display should have the next values:
  # """
  # | . | . | . | . | . |
  # | 1 | 1 | 1 | 2 | . |
  # | 0 | 0 | 0 | 2 | . |
  # | 1 | 2 | 2 | 1 | . |
  # | . | . | . | . | . |
  # """

  @test18
Scenario: Losing a Game - uncover an mine and have right tagged mines
  Given the player loads the following mock data:
  """
  | * | o | * |
  | o | o | o |
  | o | o | o |
  """
  When the player tag the cell (1,1)
  And the player uncovers the cell (1,3)
  Then the cell (1,1) should have the value: "!"

@test19
Scenario: Losing a Game - uncover an mine and have inconclusively tagged mines
  Given the player loads the following mock data:
  """
  | * | o | * |
  | o | o | o |
  | o | o | o |
  """
  When the player tag inconclusively the cell (1,1)
  And the player uncovers the cell (1,3)
  Then the cell (1,1) should have the value: "#"

@test20
Scenario: Tags Counter
  Given the player loads the following mock data:
  """
  | * | o | * |
  | o | o | o |
  | o | o | o |
  """
  When the player tag the cell (1,1)
  Then the tag counter should have the value: "9"

@test21
Scenario: Cascade Uncovering with taggeds
  # Given the player loads the following mock data:
  # """
  # | * | o | o | * | o |
  # | o | o | o | o | * |
  # | o | o | o | o | o |
  # | o | o | o | o | * |
  # | o | * | * | o | * |
  # """
  # When the player tag the cell (2,1)
  # And the player uncovers the cell (3,1)
  # Then the display should have the next values:
  # """
  # | . | . | . | . | . |
  # | ! | 1 | 1 | 2 | . |
  # | 0 | 0 | 0 | 2 | . |
  # | 1 | 2 | 2 | 1 | . |
  # | . | . | . | . | . |
  # """