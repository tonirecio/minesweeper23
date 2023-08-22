Feature: Minesweeper  As a player:
            - I want to play to the classic minesweeper game
            - So I want to detect all the mines in the board  How to refer to a cell:
            - Using the (row,column) nomenclature
            - Rows and columns starts from 1  How to load mock data:
            - Using the <ctrl>+m keyboard combination to discover
            the load mock data form  To define the board data will use:
            "o" No mine
            "*" Mine
            "-" Row separator    Thera are two ways to define mock data:
            - Inline:
            "***-ooo-*oo"
            - Table:
            | * | * | * |
            | o | o | o |
            | * | o | o |
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
    "@" highlighted mine  Game example: http://birrell.org/andrew/minesweeper/


    ## INITIAL STATE
    Background:
        Given the player opens the game

    Scenario: Starting game - All the cells should be hidden
        Then all the cells should be covered
  
    Scenario: Starting game - All the cells should be untagged
        Then all the cells should be untagged

    Scenario: Starting game - All the cells should be enabled
        Then all the cells should be enabled

    # Scenario: Starting game - Displaying mine count
    #     Given the player loads the following mock data: "<data>"
    #     Then the mine count display should show "<mineNumber>"

    #     Examples:
    #         | data        | mineNumber |
    #         | o*o-*oo-ooo | 2          |
    #         | ***-ooo-ooo | 3          |
    #         | *oo-o*o-**o | 4          |

    Scenario: Starting game - Displaying mine count
        Given the player loads the following mock data: 
        """
        o*o-*oo-ooo
        """
        Then the mine count display should show "2"


    Scenario: Flagging a cell - From an untagged cell

        Given the player loads the following mock data:
            """
            | * | o |
            """
        When the player right clicks the cell (1,2)
        Then the cell (1,2) should be flagged

     Scenario: Flagging a cell - From cell tagged as inconclusive

        Given the player loads the following mock data:
            """
            | * | o |
            """
        And the player tags the cell (1,2) as inconclusive
        And the player right clicks the cell (1,2)
        When the player right clicks the cell (1,2)
        Then the cell (1,2) should be flagged

    Scenario: Tagging a cell as inconclusive - From an untagged cell

        Given the player loads the following mock data:
            """
            | * | o |
            """
        And the player right clicks the cell (1,2)
        When the player right clicks the cell (1,2)
        Then the cell (1,2) should be tagged as inconclusive


     Scenario: Tagging a cell as inconclusive - From a flagged cell

        Given the player loads the following mock data:
            """
            | * | o |
            """
        And the player flags the cell (1,2)
        When the player right clicks the cell (1,2)
        Then the cell (1,2) should be tagged as inconclusive

    Scenario: Removing cell tag - From cell tagged as inconclusive

        Given the player loads the following mock data:
            """
            | * | o |
            """
        And the player tags the cell (1,2) as inconclusive
        When the player right clicks the cell (1,2)
        Then the cell (1,2) should be untagged

     Scenario: Removing cell tag - From flagged cell

        Given the player loads the following mock data:
            """
            | * | o |
            """
        And the player flags the cell (1,2)
        And the player right clicks the cell (1,2)
        When the player right clicks the cell (1,2)
        Then the cell (1,2) should be untagged

    Scenario: Using left click on a hidden cell

        Given the player loads the following mock data:
            """
            | * | o |
            """
        When the player left clicks the cell (1,2)
        Then the cell (1,2) should be uncovered

    Scenario: Using left click on a flagged cell
        Given the player loads the following mock data:
            """
            | * | o |
            """
        And the player flags the cell (1,2)
        When the player left clicks the cell (1,2)
        Then the cell (1,2) should be uncovered

    Scenario: Using left click on an inconclusive cell
        Given the player loads the following mock data:
            """
            | * | o |
            """
        And the player tags the cell (1,2) as inconclusive
        When the player left clicks the cell (1,2)
        Then the cell (1,2) should be uncovered

    Scenario: Using right click on an uncovered cell - The cell display doesn't change
        Given the player loads the following mock data:
            """
            | * | o |
            | o | o |
            """
        And the player uncovers the cell (1,2)
        When the player right clicks the cell (1,2)
        Then the cell (1,2) should show "1"

    Scenario: Using right click on an uncovered cell - The cell stays uncovered
        Given the player loads the following mock data:
            """
            | * | o |
            | o | o |
            """
        And the player uncovers the cell (1,2)
        When the player right clicks the cell (1,2)
        Then the cell (1,2) should be uncovered

    ## DISPLAYING MINE COUNT
    # Scenario: Flagging a cell - Updating mine count
    #     Given the player loads the following mock data: "<data>"
    #     And the player flags the cell (1,1)
    #     Then the mine count display should show "<mineNumber>"

    #     Examples:
    #         | data        | mineNumber |
    #         | o*o-*oo-ooo | 1          |
    #         | ***-ooo-ooo | 2          |
    #         | *oo-o*o-**o | 3          |

    Scenario: Flagging more cells than mines present - Updating mine count
        Given the player loads the following mock data:
            """
            | * | o |
            | o | o |
            """
        And the player flags the cell (1,1)
        When the player flags the cell (1,2)
        Then the mine count display should show "-1"

    Scenario: Tagging a flagged cell as inconclusive - Updating mine count
        Given the player loads the following mock data:
            """
            | * | o |
            | o | o |
            """
        And the player flags the cell (1,1)
        When the player tags the cell (1,1) as inconclusive
        Then the mine count display should show "1"

    Scenario: Unflagging a flagged cell - Updating mine count
        Given the player loads the following mock data:
            """
            | * | o |
            | o | o |
            """
        And the player flags the cell (1,1)
        When the player unflags the cell (1,1)
        Then the mine count display should show "1"

    Scenario: Uncovering a flagged cell - Updating mine count
        Given the player loads the following mock data:
            """
            | * | o |
            | o | o |
            """
        And the player flags the cell (1,2)
        When the player uncovers the cell (1,2)
        Then the mine count display should show "1"

    ## ADJACENT MINES CELL DISPLAY

    # Scenario: Displaying adjacent mines number - Sorrounded from 1 to 8
    #     Given the player loads the following mock data: "<data>"
    #     When the player uncovers the cell (2,2)
    #     Then the cell (2,2) should show "<number>"

    #     Examples:
    #         | data        | number |
    #         | *oo-ooo-ooo | 1      |
    #         | **o-ooo-ooo | 2      |
    #         | ***-ooo-ooo | 3      |
    #         | ***-*oo-ooo | 4      |
    #         | ***-*o*-ooo | 5      |
    #         | ***-*o*-*oo | 6      |
    #         | ***-*o*-**o | 7      |
    #         | ***-*o*-*** | 8      |

    Scenario: Displaying adjacent mines number - 1 mine
        Given the player loads the following mock data:
        """
        | o | o | * |
        | o | o | o |
        """
        When the player uncovers the cell (2,2)
        Then the cell (2,2) should show "1"

    Scenario: Displaying adjacent mines number - 2 mines
        Given the player loads the following mock data:
        """
        | * | o | * |
        | o | o | o |
        """
        When the player uncovers the cell (2,2)
        Then the cell (2,2) should show "2"

    Scenario: Displaying adjacent mines number - 3 mines
        Given the player loads the following mock data:
        """
        | * | * | * |
        | o | o | o |
        """
        When the player uncovers the cell (2,2)
        Then the cell (2,2) should show "3"

     Scenario: Displaying adjacent mines number - 4 mines
    Given the player loads the following mock data:
      """
      | * | * | * |
      | * | o | o |
      """
    When the player uncovers the cell (2,2)
    Then the cell (2,2) should show "4"

    Scenario: Displaying adjacent mines number - 5 mine
        Given the player loads the following mock data:
        """
        | * | * | * |
        | * | o | * |
        """
        When the player uncovers the cell (2,2)
        Then the cell (2,2) should show "5"

    Scenario: Displaying adjacent mines number - 6 mines
        Given the player loads the following mock data:
        """
        | o | * | o |
        | * | o | * |
        | * | * | * |
        """
        When the player uncovers the cell (2,2)
        Then the cell (2,2) should show "6"

    Scenario: Displaying adjacent mines number - 7 mine
        Given the player loads the following mock data:
        """
        | * | * | * |
        | o | o | * |
        | * | * | * |
        """
        When the player uncovers the cell (2,2)
        Then the cell (2,2) should show "7"

    Scenario: Displaying adjacent mines number - 8 mines
        Given the player loads the following mock data:
        """
        | * | * | * |
        | * | o | * |
        | * | * | * |
        """
        When the player uncovers the cell (2,2)
        Then the cell (2,2) should show "8"

    Scenario: Displaying adjacent mines number - Corner cell
        Given the player loads the following mock data:
            """
            | * | o |
            | * | o |
            """
        When the player uncovers the cell (2,2)
        Then the cell (2,2) should show "2"

    Scenario: Displaying adjacent mines number - Border cell
        Given the player loads the following mock data:
            """
            | * | o | * |
            | * | o | o |
            | o | * | o |
            """
        When the player uncovers the cell (2,3)
        Then the cell (2,3) should show "2"

    # Scenario: Displaying mines number - 1 mine at different positions
    #     Given the player loads the following mock data: "<data>"
    #     When the player uncovers the cell (2,2)
    #     Then the cell (2,2) should show "1"

    #     Examples:
    #         | data        |
    #         | *oo-ooo-ooo |
    #         | o*o-ooo-ooo |
    #         | oo*-ooo-ooo |
    #         | ooo-*oo-ooo |
    #         | ooo-oo*-ooo |
    #         | ooo-ooo-*oo |
    #         | ooo-ooo-o*o |
    #         | ooo-ooo-oo* |

    # Scenario: Displaying mines number - 2 mines at different positions
    #     Given the player loads the following mock data: "<data>"
    #     When the player uncovers the cell (2,2)
    #     Then the cell (2,2) should show "2"

    #     Examples:
    #         | data        |
    #         | **o-ooo-ooo |
    #         | *o*-ooo-ooo |
    #         | o**-ooo-ooo |
    #         | ooo-*o*-ooo |
    #         | ooo-ooo-**o |
    #         | ooo-ooo-*o* |
    #         | ooo-ooo-o** |
    #         | *oo-*oo-ooo |

    # Scenario: Displaying mines number - 3 mines at different positions
    #     Given the player loads the following mock data: "<data>"
    #     When the player uncovers the cell (2,2)
    #     Then the cell (2,2) should show "3"

    #     Examples:
    #         | data        |
    #         | ***-ooo-ooo |
    #         | **o-*oo-ooo |
    #         | **o-oo*-ooo |
    #         | **o-ooo-*oo |
    #         | **o-ooo-o*o |
    #         | **o-ooo-oo* |
    #         | *o*-*oo-ooo |
    #         | *o*-oo*-ooo |
    #         | *o*-ooo-*oo |

    ## Note: these scenarios could be expanded if needed

    ## DISPLAY: MULTIPLE EXAMPLES

    # Scenario: Cell display - Hidden cell
    #     Given the player loads the following mock data:
    #         """
    #         | * | o |
    #         | o | o |
    #         """
    #     Then the cell "<cell>" should show "<display>"
    #     Examples:
    #         | cell  | display |
    #         | (1,1) | .       |
    #         | (1,2) | .       |
    #         | (2,1) | .       |
    #         | (2,2) | .       |

    Scenario: Cell display - Hidden cell
        Given the player loads the following mock data:
            """
            | * | o |
            | o | o |
            """
        Then the cell (1,1) should show ""
        And the cell (1,2) should show ""
        And the cell (2,1) should show ""
        And the cell (2,2) should show ""

    Scenario: Cell display - Flagged cell
        Given the player loads the following mock data:
            """
            | * | o |
            | o | o |
            """
        And the player flags the cell (1,1)
        Then the cell (1,1) should show "🚩"

    Scenario: Cell display - Inconclusive cell
        Given the player loads the following mock data:
            """
            | * | o |
            | o | o |
            """
        And the player tags the cell (1,1) as inconclusive
        Then the cell (1,1) should show "🤨"

    Scenario: Cell display - Uncovered cell without adjacent mines
        Given the player loads the following mock data:
            """
            | * | o | o |
            | o | o | o |
            | o | o | o |
            """
        When the player uncovers the cell (1,3)
        Then the cell (1,3) should show ""
        And the cell (3,3) should show ""
        And the cell (3,1) should show ""

    ## WINNING AND LOSING

    Scenario: Winning the game
        Given the player loads the following mock data:
            """
            | * | o |
            """
        When the player uncovers the cell (1,2)
        Then the player should win the game

    Scenario: Losing the game
        Given the player loads the following mock data:
            """
            | * | o |
            """
        When the player uncovers the cell (1,1)
        Then the player should lose the game

    ## CELL ENABLING AND DISABLING

    # Scenario: Uncovering a cell - Disabling the cell
    #     Given the player loads the following mock data:
    #         """
    #         | * | o |
    #         """
    #     When the player uncovers the cell (1,2)
    #     Then the cell (1,2) should be disabled

        ##  LOSING

    Scenario: Losing the game - Disabling all cells
        Given the player loads the following mock data:
            """
            | * | o |
            """
        When the player uncovers the cell (1,1)
        Then all the cells should be disabled

    # Scenario: Losing the game - Displaying wrong flag

    #     Given the player loads the following mock data:
    #         """
    #         | * | o |
    #         | o | o |
    #         """
    #     And the player flags the cell (1,2)
    #     When the player uncovers the cell (1,1)
    #     Then the cell (1,2) should show "💣"

    Scenario: Losing the game - Displaying the exploded bomb
        Given the player loads the following mock data:
            """
            | * | o |
            | o | o |
            """
        When the player uncovers the cell (1,1)
        Then the cell (1,1) should show "💣"

    Scenario: Losing the game - Displaying the covered cells as hidden
        Given the player loads the following mock data:
            """
            | * | o |
            | o | o |
            """
        When the player uncovers the cell (1,1)
        Then the cell (1,2) should show ""
        Then the cell (2,1) should show ""
        Then the cell (2,2) should show ""

    Scenario: Losing the game - Displaying cell tagged as inconclusive
        Given the player loads the following mock data:
            """
            | * | o |
            | o | o |
            """
        And the player tags the cell (1,2) as inconclusive
        When the player uncovers the cell (1,1)
        Then the cell (1,2) should show "🤨"

    Scenario: Losing the game - Displaying all mines
        Given the player loads the following mock data:
            """
            | * | o |
            | o | * |
            """
        When the player uncovers the cell (1,1)
        Then the cell (2,2) should show "💣"

    Scenario: Losing the game - Displaying number of uncovered cells
        Given the player loads the following mock data:
            """
            | * | o |
            | o | * |
            """
        And the player uncovers the cell (1,2)
        When the player uncovers the cell (1,1)
        Then the cell (1,2) should show "2"

     Scenario: Losing the game - Showing current count
        Given the player loads the following mock data:
            """
            | * | o |
            | o | * |
            """
        And the player flags the cell (1,2)
        When the player uncovers the cell (1,1)
        Then the mine count display should show "1"

    ##  WINNING

    Scenario: Winning the game - Disabling all cells
        Given the player loads the following mock data:
            """
            | * | o |
            """
        And the player uncovers the cell (1,2)
        Then all the cells should be disabled

    Scenario: Winning the game - Displaying flagged cell
        Given the player loads the following mock data:
            """
            | * | o |
            """
        And the player flags the cell (1,1)
        When the player uncovers the cell (1,2)
        Then the cell (1,1) should show "🚩"

    # Scenario: Winning the game - Displaying cell with mine but not flagged
    #     Given the player loads the following mock data:
    #         """
    #         | * | o |
    #         """
    #     When the player uncovers the cell (1,2)
    #     Then the cell (1,1) should show "!"

    # Scenario: Winning the game - Displaying cell with mine tagged as inconclusive

    #     Given the player loads the following mock data:
    #         """
    #         | * | o |
    #         """
    #     And the player tags the cell (1,1) as inconclusive
    #     When the player uncovers the cell (1,2)
    #     Then the cell (1,1) should show "!"

    Scenario: Winning the game - Displaying number of uncovered cells
        Given the player loads the following mock data:
            """
            | * | o |
            | o | * |
            """
        And the player uncovers the cell (1,2)
        When the player uncovers the cell (2,1)
        Then the cell (1,2) should show "2"
        And the cell (2,1) should show "2"

    Scenario: Winning the game - Setting mine count to 0
        Given the player loads the following mock data:
            """
            | * | o |
            | o | * |
            """
        And the player uncovers the cell (1,2)
        When the player uncovers the cell (2,1)
        Then the mine count display should show "0"

    ## UNCOVERING ADJACENT CELLS (CASCADING) WHEN NO MINES PRESENT

    Scenario: Uncovering adjacent cells
        Given the player loads the following mock data:
            """
            | * | * | o | o | o |
            | * | o | o | o | o |
            | o | o | o | o | o |
            | o | o | o | o | * |
            | o | o | o | * | * |
            """
        When the player uncovers the cell (1,5)
        Then the cell (1,3) should be uncovered
        And the cell (1,4) should be uncovered
        And the cell (1,5) should be uncovered
        And the cell (2,3) should be uncovered
        And the cell (2,4) should be uncovered
        And the cell (2,5) should be uncovered
        And the cell (3,3) should be uncovered
        And the cell (3,4) should be uncovered
        And the cell (3,5) should be uncovered
        And the cell (4,3) should be uncovered
        And the cell (4,4) should be uncovered
        And the cell (5,1) should be uncovered
        And the cell (5,3) should be uncovered
    
    # Examples:
    #         | cell  |
    #         | (1,3) |
    #         | (1,4) |
    #         | (1,5) |
    #         | (2,2) |
    #         | (2,3) |
    #         | (2,4) |
    #         | (2,5) |
    #         | (3,1) |
    #         | (3,2) |
    #         | (3,3) |
    #         | (3,4) |
    #         | (3,5) |
    #         | (4,1) |
    #         | (4,2) |
    #         | (4,3) |
    #         | (4,4) |
    #         | (5,1) |
    #         | (5,2) |
    #         | (5,3) |

    Scenario: Uncovering adjacent cells - Display after cascading
        Given the player loads the following mock data:
            """
            | * | * | o | o | o |
            | * | o | o | o | o |
            | o | o | o | o | o |
            | o | o | o | o | * |
            | o | o | o | * | * |
            """
        When the player uncovers the cell (3,3)
        Then the cell (1,1) should show ""
        And the cell (1,2) should show ""
        And the cell (1,3) should show "1"
        And the cell (2,3) should show "1"
        And the cell (2,2) should show "3"
        And the cell (4,4) should show "3"
        And the cell (3,1) should show "1"
        And the cell (3,2) should show "1"
        And the cell (5,1) should show ""
        And the cell (5,4) should show ""
        And the cell (5,5) should show ""


        # Examples:
        #     | cell  | display |
        #     | (1,1) | .       |
        #     | (1,2) | .       |
        #     | (1,3) | 1       |
        #     | (1,4) | 0       |
        #     | (1,5) | 0       |
        #     | (2,1) | .       |
        #     | (2,2) | 3       |
        #     | (2,3) | 1       |
        #     | (2,4) | 0       |
        #     | (2,5) | 0       |
        #     | (3,1) | 1       |
        #     | (3,2) | 1       |
        #     | (3,3) | 0       |
        #     | (3,4) | 1       |
        #     | (3,5) | 1       |
        #     | (4,1) | 0       |
        #     | (4,2) | 0       |
        #     | (4,3) | 1       |
        #     | (4,4) | 3       |
        #     | (4,5) | .       |
        #     | (5,1) | 0       |
        #     | (5,2) | 0       |
        #     | (5,3) | 1       |
        #     | (5,4) | .       |
        #     | (5,5) | .       |


    Scenario: Uncovering adjacent cells - Flagged cell stops the cascading process
        Given the player loads the following mock data:
            """
            | * | * | o | o | o |
            | * | o | o | o | o |
            | o | o | o | o | o |
            | o | o | o | o | * |
            | o | o | o | * | * |
            """
        And the player flags the cell (3,3)
        When the player uncovers the cell (5,1)
        Then the cell (1,1) should show ""
        And the cell (1,2) should show ""
        And the cell (1,3) should show ""
        And the cell (2,3) should show ""
        And the cell (2,2) should show ""
        And the cell (4,3) should show "1"
        And the cell (3,3) should show "🚩"
        And the cell (3,2) should show "1"
        And the cell (3,1) should show "1"
        And the cell (5,4) should show ""
        And the cell (5,5) should show "" 

        # Examples:
        #     | cell  | display |
        #     | (1,1) | .       |
        #     | (1,2) | .       |
        #     | (1,3) | .       |
        #     | (1,4) | .       |
        #     | (1,5) | .       |
        #     | (2,1) | .       |
        #     | (2,2) | .       |
        #     | (2,3) | .       |
        #     | (2,4) | .       |
        #     | (2,5) | .       |
        #     | (3,1) | 1       |
        #     | (3,2) | 1       |
        #     | (3,3) | !       |
        #     | (3,4) | .       |
        #     | (3,5) | .       |
        #     | (4,1) | 0       |
        #     | (4,2) | 0       |
        #     | (4,3) | 1       |
        #     | (4,4) | .       |
        #     | (4,5) | .       |
        #     | (5,1) | 0       |
        #     | (5,2) | 0       |
        #     | (5,3) | 1       |
        #     | (5,4) | .       |
        #     | (5,5) | .       |

    Scenario: Uncovering adjacent cells - Ignoring and uncovering inconclusive cell
        Given the player loads the following mock data:
            """
            | * | * | o | o | o |
            | * | o | o | o | o |
            | o | o | o | o | o |
            | o | o | o | o | * |
            | o | o | o | * | * |
            """
        And the player tags the cell (3,3) as inconclusive
        When the player uncovers the cell (5,1)
        Then the cell (1,3) should be uncovered
        And the cell (1,4) should be uncovered
        And the cell (1,5) should be uncovered
        And the cell (2,2) should be uncovered
        And the cell (2,3) should be uncovered
        And the cell (3,4) should be uncovered
        And the cell (3,5) should be uncovered
        And the cell (4,2) should be uncovered
        And the cell (4,3) should be uncovered

        # Examples:
        #     | cell  |
        #     | (1,3) |
        #     | (1,4) |
        #     | (1,5) |
        #     | (2,2) |
        #     | (2,3) |
        #     | (2,4) |
        #     | (2,5) |
        #     | (3,1) |
        #     | (3,2) |
        #     | (3,3) |
        #     | (3,4) |
        #     | (3,5) |
        #     | (4,1) |
        #     | (4,2) |
        #     | (4,3) |


    Scenario: Uncovering adjacent cells - Winning automatically when only hidden cells are mines
        Given the player loads the following mock data:
            """
            | * | o | o | o |
            | o | o | o | o |
            | o | o | o | o |
            | o | o | o | o |
            """
        When the player uncovers the cell (3,3)
        Then the player should win the game

    ## RESETTING THE GAME

    Scenario: Resetting the game - All cells should be hidden
        Given the player clicks the Reset button
        Then all the cells should be covered

    Scenario: Resetting the game - All cells should be enabled
        Given the player clicks the Reset button
        Then all the cells should be enabled

    Scenario: Resetting the game - After losing
        Given the player loads the following mock data:
            """
            | * | o |
            | o | * |
            """
        And the player uncovers the cell (1,1)
        When the player clicks the Reset button
        Then the game should reset

    Scenario: Resetting the game - After winning
        Given the player loads the following mock data:
            """
            | * | o |
            | o | * |
            """
        And the player uncovers the cell (1,2)
        And the player uncovers the cell (2,1)
        When the player clicks the Reset button
        Then the game should reset

    Scenario: Resetting the game - At the middle of a game
        Given the player loads the following mock data:
            """
            | * | o |
            | o | * |
            """
        And the player uncovers the cell (1,2)
        When the player clicks the Reset button
        Then the game should reset
