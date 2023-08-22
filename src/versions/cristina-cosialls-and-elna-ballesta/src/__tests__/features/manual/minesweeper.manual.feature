Background:
Given the player opens the game

#CASES OF TIMER
@manual
Scenario: Starting game - The timer should be empty
Then the timer should be empty

@manual
Scenario: Restarting game - The timer should be empty
When the player presses the restart button
Then the timer should be empty

@manual
Scenario: Uncovering the first cell - The timer should start
When the player uncovers any cell
Then the timer should start

@manual
Scenario: Putting the first flag on a cell - The timer should start
When the player puts '!' at any cell
Then the timer should start

@manual
Scenario: Starting the timer - The timer should be 0
When the player uncovers any cell
Then the timer should be 0

@manual
Scenario: Starting the timer and waiting - The timer should increase
Given the player uncovers any cell
When the player waits 10 seconds 
Then the timer should increase

@manual
Scenario: Losing the game - The timer should stop
Given the player uncovers any cell
When the player uncovers a mine cell
Then the timer should stop

@manual
Scenario: Winning the game - The timer should stop
Given the player uncovers any cell
When the player uncovers all the cells without mine
Then the timer should stop