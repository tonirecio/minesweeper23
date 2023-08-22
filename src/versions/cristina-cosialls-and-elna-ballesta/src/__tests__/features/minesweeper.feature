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
    AFTER FINISH GAME CELLS
    "@" highlighted mine
    "#" normal mine
Game example: http://birrell.org/andrew/minesweeper/

Background:
Given the player opens the game

#CASES OF STARTING GAME
Scenario: Starting game - All the cells should be hidden
Then all the cells should be hidden

Scenario: Starting game - All the cells should be enabled
Then all the cells should be enabled

#CASES OF CLICKING CELL
Scenario: Left clicking a cell - The cell should be uncovered
Given the player loads the following mock data:
"""
| * | o |
"""
When the player left clicks the cell (1,2)
Then the cell (1,2) should be uncovered

Scenario: Uncovering a cell - The cell should be disabled
Given the player loads the following mock data:
"""
| * | o |
"""
When the player uncovers the cell (1,2)
Then the cell (1,2) should be disabled

Scenario: Right-clicking one time on a cell - The cell should be a flag
Given the player loads the following mock data:
"""
| * | o |
"""
When the player right clicks "1" times on the cell (1,2)
Then the cell (1,2) should be "!"

Scenario: Right-clicking two times on a cell - The cell should be inconclusive
Given the player loads the following mock data:
"""
| * | o |
"""
When the player right clicks "2" times on the cell (1,2)
Then the cell (1,2) should be "?"

Scenario: Right-clicking three times on a cell - Remove the inconclusive
Given the player loads the following mock data:
"""
| * | o |
"""
When the player right clicks "3" times on the cell (1,2)
Then the cell (1,2) should be "."

Scenario: Uncovering a cell with a flag - The cell should be uncovered
Given the player loads the following mock data:
"""
| * | o |
"""
And the player puts "!" in the cell (1,2)
When the player uncovers the cell (1,2)
Then the cell (1,2) should be uncovered

Scenario: Uncovering a cell with a flag - The cell should be disabled
Given the player loads the following mock data:
"""
| * | o |
"""
And the player puts "!" in the cell (1,2)
When the player uncovers the cell (1,2)
Then the cell (1,2) should be disabled

Scenario: Uncovering a mine cell with a flag - The cell should be a highlighted mine
Given the player loads the following mock data:
"""
| * | o |
"""
And the player puts "!" in the cell (1,1)
When the player uncovers the cell (1,1)
Then the cell (1,1) should be "@"

Scenario: Putting a flag on an uncovered cell - The cell should stay uncovered
Given the player loads the following mock data:
"""
| * | o |
"""
And the player uncovers the cell (1,2)
When the player puts "?" in the cell (1,2)
Then the cell (1,2) should be uncovered

Scenario: Putting a flag on an uncovered cell - The cell should stay disabled
Given the player loads the following mock data:
"""
| * | o |
"""
And the player uncovers the cell (1,2)
When the player puts "?" in the cell (1,2)
Then the cell (1,2) should be disabled

#CASES OF LOSING
Scenario: Uncovering a mine - The player should lose the game
Given the player loads the following mock data:
"""
| * | o |
"""
When the player uncovers the cell (1,1)
Then the player should lose

Scenario: Losing the game - All the cells should be disabled
Given the player loads the following mock data:
"""
| * | o |
"""
When the player uncovers the cell (1,1)
Then all the cells should be disabled

Scenario: Losing the game - The inconclusive cells with no mine should stay inconclusive
Given the player loads the following mock data:
"""
| * | o |
| * | o |
"""
And the player puts "?" in the cell (1,2)
When the player uncovers the cell (1,1)
Then the cell (1,2) should be "?"

Scenario: Losing the game - The inconclusive cells with mines should change to mine
Given the player loads the following mock data:
"""
| * | o |
| * | o |
"""
And the player puts "?" in the cell (2,1)
When the player uncovers the cell (1,1)
Then the cell (2,1) should be "#"

Scenario: Losing the game - The flags with mine cells should stay as flags
Given the player loads the following mock data:
"""
| * | o |
| * | o |
"""
And the player puts "!" in the cell (2,1)
When the player uncovers the cell (1,1)
Then the cell (2,1) should be "!"

Scenario: Losing the game - The flags with no mine cells should change to incorrect flags
Given the player loads the following mock data:
"""
| * | o |
| * | o |
"""
And the player puts "!" in the cell (1,2)
When the player uncovers the cell (1,1)
Then the cell (1,2) should be "x"

Scenario: Losing the game - The hidden cells with no mines should stay hidden
Given the player loads the following mock data:
"""
| * | o |
| * | o |
"""
When the player uncovers the cell (1,1)
Then the cell (1,2) should be "."
And the cell (2,2) should be "."

Scenario: Losing the game - The mine clicked should change to highlighted mine
Given the player loads the following mock data:
"""
| * | o |
| * | o |
"""
When the player uncovers the cell (1,1)
Then the cell (1,1) should be "@"

Scenario: Losing the game - The hidden cells with mines should change to normal mines
Given the player loads the following mock data:
"""
| * | o |
| * | o |
"""
When the player uncovers the cell (1,1)
Then the cell (2,1) should be "#"

Scenario: Losing the game - The uncovered cells should stay uncovered
Given the player loads the following mock data:
"""
| * | o | * | o |
| * | o | o | * |
"""
And the player uncovers the cell (1,2)
And the player uncovers the cell (1,4)
When the player uncovers the cell (1,1)
Then the cell (1,2) should be uncovered
And the cell (1,4) should be uncovered

#CASES OF WINNING
Scenario: Uncovering all the cells without mines - The player should win the game
Given the player loads the following mock data:
"""
| * | o |
"""
When the player uncovers the cell (1,2)
Then the player should win

Scenario: Winning the game - All the cells should be disabled
Given the player loads the following mock data:
"""
| * | o |
"""
When the player uncovers the cell (1,2)
Then all the cells should be disabled

Scenario: Winning the game - All the mines should change to flags
Given the player loads the following mock data:
"""
| o | * | o |
| * | o | * |
"""
And the player puts "!" in the cell (2,1)
And the player puts "?" in the cell (1,2)
And the player uncovers the cell (1,1)
And the player uncovers the cell (1,3)
When the player uncovers the cell (2,2)
Then the cell (2,1) should be "!"
And the cell (1,2) should be "!"
And the cell (2,3) should be "!"

Scenario: Winning the game - The uncovered cells should stay uncovered
Given the player loads the following mock data:
"""
| * | o |
| * | o |
"""
And the player uncovers the cell (1,2)
When the player uncovers the cell (2,2)
Then the cell (1,2) should be uncovered
And the cell (2,2) should be uncovered

#CASES OF UNCOVERED CELLS
Scenario Outline: Uncovering a middle cell surrounded with mines - The status should be the count of mines
Given the player loads the following mock data: 
"""
<board>
"""
When the player uncovers the cell (2,2)
Then the cell (2,2) should be "<status>"

Examples:
|       board | status |
| *oo-ooo-ooo |      1 |
| **o-ooo-ooo |      2 |
| ***-ooo-ooo |      3 |
| ***-*oo-ooo |      4 |
| ***-*o*-ooo |      5 |
| ***-*o*-*oo |      6 |
| ***-*o*-**o |      7 |
| ***-*o*-*** |      8 |

Scenario Outline: Uncovering a border cell surrounded with mines - The status should be the count of mines
Given the player loads the following mock data: 
"""
<board>
"""
When the player uncovers the cell (1,2)
Then the cell (1,2) should be "<status>"

Examples:
|       board | status |
| *oo-ooo-ooo |      1 |
| *o*-ooo-ooo |      2 |
| *o*-*oo-ooo |      3 |
| *o*-**o-ooo |      4 |
| *o*-***-ooo |      5 |
| *o*-***-*oo |      5 |
| *o*-***-**o |      5 |

Scenario Outline: Uncovering a corner cell surrounded with mines - The status should be the count of mines
Given the player loads the following mock data: 
"""
<board>
"""
When the player uncovers the cell (1,1)
Then the cell (1,1) should be "<status>"

Examples:
|       board | status |
| o*o-ooo-ooo |      1 |
| o*o-*oo-ooo |      2 |
| o*o-**o-ooo |      3 |
| o**-***-ooo |      3 |
| o**-***-*** |      3 |

Scenario: Uncovering a cell - The waterfall should work
Given the player loads the following mock data:
"""
| * | o | o | o |
| o | o | o | o |
| o | * | o | o |
"""
When the player uncovers the cell (1,4)
Then the cell (1,3) should be uncovered
And the cell (1,2) should be uncovered
And the cell (2,4) should be uncovered
And the cell (2,3) should be uncovered
And the cell (2,2) should be uncovered
And the cell (3,4) should be uncovered
And the cell (3,3) should be uncovered
And the cell (1,1) should be covered
And the cell (2,1) should be covered

Scenario: Uncovering cells without mines around - The cells should be empty cells
Given the player loads the following mock data:
"""
| * | o | o | o |
| o | o | o | o |
| o | * | o | o |
"""
When the player uncovers the cell (1,4)
Then the cell (1,4) should be "0"
And the cell (2,4) should be "0"
And the cell (3,4) should be "0"

Scenario: The waterfall triggers - The flags should stay covered
Given the player loads the following mock data:
"""
| * | o | o | o |
| o | o | o | o |
| o | * | o | o |
| o | * | o | o |
"""
And the player puts "!" in the cell (1,3)
And the player puts "!" in the cell (4,3)
When the player uncovers the cell (1,4)
Then the cell (1,3) should be "!"
And the cell (4,3) should be "!"
And the cell (1,2) should be covered

Scenario: The waterfall triggers - The inconclusive cells without mines should be uncovered
Given the player loads the following mock data:
"""
| * | o | o | o |
| o | o | o | o |
| o | * | o | o |
| o | * | o | o |
"""
And the player puts "?" in the cell (1,3)
And the player puts "?" in the cell (4,3)
When the player uncovers the cell (1,4)
Then the cell (1,3) should be uncovered
And the cell (4,3) should be uncovered
And the cell (1,2) should be uncovered

#CASES OF COUNTER
Scenario: Starting the game - The counter should show the count of mines
Given the player loads the following mock data:
"""
| * | o | * | o |
| * | o | * | * |
| o | * | * | * |
"""
Then the counter should be "8"

Scenario: Putting flags - The counter should show the correct number
Given the player loads the following mock data:
"""
| * | o | * | o |
| * | o | * | * |
| o | * | * | * |
"""
And the player puts "!" in the cell (1,1)
And the player puts "!" in the cell (1,3)
And the player puts "!" in the cell (2,4)
And the player puts "!" in the cell (3,2)
When the player puts "!" in the cell (2,2)
Then the counter should be "3"

Scenario: Putting more flags than mines - The counter should show a negative number
Given the player loads the following mock data:
"""
| * | o | * |
| o | o | o |
| o | * | * |
"""
And the player puts "!" in the cell (1,1)
And the player puts "!" in the cell (1,2)
And the player puts "!" in the cell (1,3)
And the player puts "!" in the cell (2,1)
When the player puts "!" in the cell (2,2)
Then the counter should be "-1"

Scenario: Putting an inconclusive - The counter should increase by one
Given the player loads the following mock data:
"""
| * | o |
| * | o |
"""
And the player puts "!" in the cell (1,1)
When the player puts "?" in the cell (1,1)
Then the counter should be "2"

Scenario: Taking out an inconclusive - The counter shouldn't change
Given the player loads the following mock data:
"""
| * | o |
| * | o |
"""
And the player puts "!" in the cell (1,1)
And the player puts "?" in the cell (1,1)
When the player puts "." in the cell (1,1)
Then the counter should be "2"

Scenario: Uncovering a cell with a flag - The counter should increase by one
Given the player loads the following mock data:
"""
| * | o |
| * | o |
"""
And the player puts "!" in the cell (1,2)
When the player uncovers the cell (1,2)
Then the counter should be "2"

Scenario: Losing the game - The counter should show the correct number
Given the player loads the following mock data:
"""
| * | o |
| * | o |
"""
And the player puts "!" in the cell (1,1)
When the player uncovers the cell (1,1)
Then the counter should be "1"

Scenario: Winning the game - The counter should show zero
Given the player loads the following mock data:
"""
| * | o |
| * | o |
"""
And the player puts "!" in the cell (1,1)
And the player uncovers the cell (1,2)
When the player uncovers the cell (2,2)
Then the counter should be "0"
