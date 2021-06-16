//The Biz
function Players() {
  this.playerList = {};
  this.currentId = 0;
}

Players.prototype.addPlayer = function(player) {
  player.id = this.assignId();
  this.playerList[player.id] = player;
}

Players.prototype.findPlayer = function(id) {
  if (this.playerList[id] != undefined) {
    return this.playerList[id];
  }
  return false;
}

Players.prototype.assignId = function() {
  this.currentId +=1;
  return this.currentId;
}

function roll() {
  let roll = "";
  roll = Math.floor(Math.random() * 6) + 1;
  return roll; 
}

function addToTurnTotal(turnTotal, roll) {
  if (roll === 1) {
    turnTotal = 0;
  } else {
    turnTotal = turnTotal + roll;
  }
  return turnTotal;
}

//Biz for Player
function Player(playerName,activeTotal) {
  this.playerName = playerName;
  this.activeTotal = activeTotal;
}

//UI Logic
let activePlayers = new Players();

function winnerCheck(turnTotal) {
  if (turnTotal >= 100) {
    $("#winner").html("You're the winner!");
  };
}

$("document").ready(function() {
  let turnTotal = 0;
  $("#name-button").click(function (event) {
    const inputtedPlayerName = $('input#player-name').val();
    let newPlayer = new Player(inputtedPlayerName,0);
    activePlayers.addPlayer(newPlayer);
    $("form#player").hide();
  });
  $("#roll").click(function() {
    let playerRoll = "";
    playerRoll = roll();
    turnTotal = addToTurnTotal(turnTotal, playerRoll);
    $("#result").html(playerRoll);
    $("#turn-total").html(turnTotal);
    winnerCheck(turnTotal);
  });
  
})