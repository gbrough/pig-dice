<!-- 
Two players
First player rolls the dice
  - If 1st player gets 1, turn is over and lost points for that turn
  - If rolls 2-6, add number to sum
    - Choose to roll again or hold
    - If hold then cummulative total is added to score
Second play repeats

First player to 100 wins

Buttons - New Game, Roll, Hold
Views - Dice roll, Current total, 2 players score total
 -->

Test Case logic

Test: "Roll a dice and get number between 1-6"
Code: roll();
Expected Output: 1-6

Test: "Adding rolls together for turn total"
Code: addToTurnToal
Expected Output: 1st roll + 2nd roll + 3rd roll + ... = turn total

Test: "If 1 is rolled, TurnTotal is 0"
Code: addToTurnToal
Expected Output: If roll = 1 TurnTotal = 0

Test: "If turn total is greater than or equal to 100, game is won"
Code: addToTurnToal
Expected Output: "If turnTotal >= 100, display you win"

Test: "Create Player object to store player name"
Code: "addPlayer"
Expected Output: "ID: Player 1, ID: Player 2"

Test: "Add to Player object to store hold total"
Code: "updatePlayer"
Expected Output: "Hold: hold total"

Test: "User can click "hold" button and add turn total to their player total"
Code: "addToTurnTotal = addToPlayerTotal"
Expected Output: "If player total is 5, and turn total is 6, user presses hold, player total displays 11"

Test: "Winner Check"
Code: "addHoldTotal + Roll"
Expected Output: "If player has 96 and rolls a 4, then display winner"

Test: "Store Hold Total into Player object"
Code: "addHoldTotal + Roll"
Expected Output: "activePlayers = {"name: Michael, ID: 1, holdTotal: 55}"

Test: "Switch Active Players"
Code: ""
Expected Output: "When Player 1 holds or rolls 1, get player 2 ID, show active player "

Test: "Display Both Player Totals"
Code: "holdTotal"
Expected Output: "When Player 1 has 50, show 50, if player 2 has 77, show 77"

Test: "Update Hold Total for each player"
Code: "holdTotal"
Expected Output: "When Player 1 holds, update from 55 to 60"

Test: "Display active player as winner"
Code: "holdTotal"
Expected Output: "If active player holdtotal >= 100, display active player as winner""
