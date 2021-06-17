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

function setPlayerName(name, num) {
  if (name === "") {
    return "Player "+num;
  } else
  return name;
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
    $(".winner").fadeToggle(1000);
    $(".game").toggle();
  };
}
function changeBgColor(id) {
$("body").css("background-color",activePlayers.playerList[id].color);
if (id === 1) {
  $(".player-1-stats").css("background-color",activePlayers.playerList[1].color);
  $(".player-2-stats").css("background-color","");
} else {
  $(".player-2-stats").css("background-color",activePlayers.playerList[2].color);
  $(".player-1-stats").css("background-color","");
}
}

$("document").ready(function() {
  let turnTotal = 0;
  let activePlayer = "";
  $("#play").click(function (event) {
    const player1 = new Player(setPlayerName($("input#player1-name").val(),1), 0,$("input#player1-color").val());
    const player2 = new Player(setPlayerName($("input#player2-name").val(),2), 0,$("input#player2-color").val());
    activePlayers.addPlayer(player1);
    activePlayers.addPlayer(player2);
    $("#player-1-name").text(player1.playerName);
    $("#player-1-total").text(player1.holdTotal);
    $("#player-2-name").text(player2.playerName);
    $("#player-2-total").text(player2.holdTotal);
    activePlayer = switchActivePlayer(activePlayer);
    $("#active-player-name").text(activePlayer.playerName);
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
    //This is biz logic that should be moved
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
  $("#play-again").click(function (event) {
    activePlayers.playerList[1].holdTotal = 0;
    activePlayers.playerList[2].holdTotal = 0;
    $("#player-1-total").text(activePlayers.playerList[1].holdTotal);
    $("#player-2-total").text(activePlayers.playerList[2].holdTotal);
    activePlayer = switchActivePlayer(activePlayer);
    $("#player-total").html("0");
    turnTotal = 0;
    $("#turn-total").html(turnTotal);
    $("#result").html(turnTotal);
    $(".winner").toggle();
    $(".game").fadeToggle(1000);
  });
})