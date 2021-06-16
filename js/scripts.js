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

function switchActivePlayer(activePlayer) {
  if (activePlayer.id === 1) {
    changeBgColor(2);
    return activePlayers.playerList[2];
  } else {
    changeBgColor(1);
  return activePlayers.playerList[1];
  }
}

//Biz for Player
function Player(playerName,activeTotal,color) {
  this.playerName = playerName;
  this.holdTotal = activeTotal;
  this.color = color;
}

Player.prototype.updateHoldTotal = function(turnTotal) {
  this.holdTotal += turnTotal;
  $("#player-1-total").text(activePlayers.playerList[1].holdTotal);
  $("#player-2-total").text(activePlayers.playerList[2].holdTotal);
}

//UI Logic
let activePlayers = new Players();

function winnerCheck(playerTotal, turnTotal, activePlayer) {
  if ((turnTotal + playerTotal) >= 100) {
    $("#winner").html(activePlayer.playerName + " is the winner!");
    $("#winner").fadeToggle(1000);
    $(".game").fadeToggle(1000);
  };
}
function changeBgColor(id) {
$("body").css("background-color",activePlayers.playerList[id].color);
}

$("document").ready(function() {
  let turnTotal = 0;
  let activePlayer = "";
  $("#play").click(function (event) {
    const inputtedPlayer1Name = $("input#player1-name").val();
    const inputtedPlayer2Name = $("input#player2-name").val();
    const p1Color = $("input#player1-color").val();
    const p2Color = $("input#player2-color").val();
    $("input#player1-name").val(""); 
    $("input#player2-name").val(""); 
    let player1 = new Player(inputtedPlayer1Name, 0,p1Color);
    let player2 = new Player(inputtedPlayer2Name, 0,p2Color);
    activePlayers.addPlayer(player1);
    activePlayers.addPlayer(player2);
    $("#player-1-name").text(player1.playerName);
    $("#player-1-total").text(player1.holdTotal);
    $("#player-2-name").text(player2.playerName);
    $("#player-2-total").text(player2.holdTotal);
    activePlayer = switchActivePlayer(activePlayer);
    $(".setup").slideToggle(1000);
    $(".game").slideToggle(1000);

  });

  $("#name-button").click(function (event) {
    const inputtedPlayerName = $('input#player-name').val();
    let newPlayer = new Player(inputtedPlayerName,0);
    activePlayers.addPlayer(newPlayer);
    $("form#player").hide();
  });

  $("#active-player-name").text(activePlayer.playerName);
  $("#roll").click(function() {
    let playerRoll = 0;
    playerRoll = roll();
    if (playerRoll === 1) {
      $("#result").html(playerRoll);
      turnTotal=0;
      $("#turn-total").html(turnTotal);
      activePlayer = switchActivePlayer(activePlayer);
      $("#active-player-name").text(activePlayer.playerName);
    } else {
      turnTotal = addToTurnTotal(turnTotal, playerRoll);
      $("#result").html(playerRoll);
      $("#turn-total").html(turnTotal);
      winnerCheck(activePlayer.holdTotal, turnTotal, activePlayer);
    }
  });
  $("#hold").click(function() {
    activePlayer.updateHoldTotal(turnTotal);
    $("#player-total").html(activePlayer.holdTotal);
    turnTotal = 0;
    $("#turn-total").html(turnTotal);
    activePlayer = switchActivePlayer(activePlayer);
    $("#active-player-name").text(activePlayer.playerName);
  });
})

// This is working! We need to type this in the console: activePlayers

// let Player0 = new Player ("Michael",0);
// activePlayers.addPlayer(Player0);
// let Player1 = new Player("Garrett", 0);
// activePlayers.addPlayer(Player1);