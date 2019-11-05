/********* Tic Tac Toe
 * User against computer
 *
 * Sinnvolle Änderungen hinsichtlich Clean Code Development
 * * Modularisierung (Trennung von View und Logik)
 * * Möglichst wenige globale Variablen
 * * (Automatisierte) Tests
 */

const positions = {
  topLeft: 0,
  topMiddle: 1,
  topRight: 2,
  middleLeft: 3,
  middleMiddle: 4,
  middleRight: 5,
  bottomLeft: 6,
  bottomMiddle: 7,
  bottomRight: 8
};

const possibleWinningOrders = [
  [positions.topLeft, positions.topMiddle, positions.topRight], // first row
  [positions.middleLeft, positions.middleMiddle, positions.middleRight], // second row
  [positions.bottomLeft, positions.bottomMiddle, positions.bottomRight], // third row
  [positions.topLeft, positions.middleLeft, positions.bottomLeft], // first column
  [positions.topMiddle, positions.middleMiddle, positions.bottomMiddle], // second column
  [positions.topRight, positions.middleRight, positions.bottomRight], // first column
  [positions.topLeft, positions.middleMiddle, positions.bottomRight], // main diagonal
  [positions.topRight, positions.middleMiddle, positions.bottomLeft] // minor diagonal
];

const squares = document.getElementsByClassName("square");

const player = {
  user: "X",
  computer: "O"
};

const colors = {
  winningColor: "rgb(42, 178, 72)",
  loosingColor: "rgb(229, 55, 55)"
};

let winningOrder = [];
let gameOver = false;
let isUsersTurn = true;
initGame();

function initGame() {
  for (const square of squares) {
    square.addEventListener("click", chooseSquare, false);
  }
}

function resetGame() {
  gameOver = false;
  isUsersTurn = true;
  winningOrder = [];
  resetView();
}

// GameLogik
function chooseSquare() {
  responseMove("Wähle ein Feld aus...");
  let chosenSquare = readUserMove(this);
  if (!isMoveValid(chosenSquare)) {
    return responseMove("Spielfeld ist schon belegt!");
  }

  if (isUsersTurn && !gameOver) {
    showUserMove(chosenSquare);
  }
  if (!isUsersTurn && !gameOver) {
    showComputerMove();
  }
}

function showUserMove(chosenSquare) {
  drawMove(chosenSquare, player.user);
  isUsersTurn = false;
  if (hasGameWon(player.user)) {
    gameOver = true;
    return showWin();
  }
  if (allFieldsOccupied()) {
    gameOver = true;
    return showTiedGame();
  }
}

function showComputerMove() {
  computerMove();
  isUsersTurn = true;
  if (hasGameWon(player.computer)) {
    gameOver = true;
    return showDefeat();
  }
}

function readUserMove(kontext) {
  let id = kontext.getAttribute("id");
  return document.getElementById(id);
}

function findSquaresOccupiedByPlayer(player) {
  let squaresOccupiedByPlayer = [];

  for (const property in positions) {
    let id = positions[property];
    if (document.getElementById(id).innerHTML === player) {
      squaresOccupiedByPlayer.push(id);
    }
  }
  return squaresOccupiedByPlayer;
}

function hasGameWon(player) {
  let squaresOccupiedByPlayer = findSquaresOccupiedByPlayer(player);

  let hasWon = false;
  for (const order of possibleWinningOrders) {
    hasWon = order.every(
      element => squaresOccupiedByPlayer.indexOf(element) > -1
    );
    if (hasWon) {
      winningOrder = order;
      return true;
    }
  }
  return false;
}

function computerMove() {
  for (const square of squares) {
    if (isMoveValid(square)) {
      return drawMove(square, player.computer);
    }
  }
}

function isMoveValid(square) {
  return (
    square.innerHTML !== player.user && square.innerHTML !== player.computer
  );
}

function allFieldsOccupied() {
  for (sq of squares) {
    if (isMoveValid(sq)) {
      return false;
    }
  }
  return true;
}

/* ********** Darstellung ************ */
function highlightWinningSquares(winningSquares, color) {
  for (square of winningSquares) {
    document.getElementById(square).style.backgroundColor = color;
  }
}

function drawMove(square, sign) {
  square.innerHTML = sign;
}

function responseMove(answer) {
  //todo: errorhandling
  document.getElementById("messageBox").innerHTML = answer;
}

/* Reset */
function resetView() {
  resetText();
  resetGameField();
}

function resetText() {
  responseMove("Wähle zum Starten ein Feld aus!");
}

function resetGameField() {
  for (square of squares) {
    square.innerHTML = "";
    square.style.backgroundColor = "";
  }
}

/* Show game results */
function showWin() {
  highlightWinningSquares(winningOrder, colors.winningColor);
  responseMove("Juhu, gewonnen!");
}

function showDefeat() {
  highlightWinningSquares(winningOrder, colors.loosingColor);
  responseMove("Du hast verloren :(");
}

function showTiedGame() {
  responseMove("Unentschieden");
}
