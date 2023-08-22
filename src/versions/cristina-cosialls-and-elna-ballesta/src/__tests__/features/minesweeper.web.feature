Feature: Minesweeper-Web

Background:
Given the player opens the game

#CASES OF RESET BUTTON
Scenario: Starting game - The reset button should show a normal face
Then the reset button should show "before-start-face"

Scenario: Losing the game - The reset button should show a sad face
Given the player loads the following mock data:
"""
| * | o |
"""
When the player uncovers the cell (1,1)
Then the reset button should show "lose-face"

Scenario: Winning the game - The reset button should show a happy face
Given the player loads the following mock data:
"""
| * | o |
"""
When the player uncovers the cell (1,2)
Then the reset button should show "win-face"

Scenario: Clicking the reset button - The game should restart
When the player presses the restart button
Then the game should restart

Scenario: Restarting game - All the cells should be hidden
When the player presses the restart button
Then all the cells should be hidden

Scenario: Restarting game - All the cells should be enabled
When the player presses the restart button
Then all the cells should be enabled