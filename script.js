// the game starts with the marking of player one (his/her mark is 'X')

// gameBoard array
let areas = [
  // First row
  document.getElementById('p11'),
  document.getElementById('p12'),
  document.getElementById('p13'),
  // Second row
  document.getElementById('p21'),
  document.getElementById('p22'),
  document.getElementById('p23'),
  // Third row
  document.getElementById('p31'),
  document.getElementById('p32'),
  document.getElementById('p33'),
];

// elements variable
let playerTurnText = document.getElementById('playerTurnText');
let markCountText = document.getElementById('markCountText');
let whoWinText = document.getElementById('whoWinText');

// specific variable
let turn = 1; // 1 for Player1, 2 for Player 2
let markCount = 0;
let isGameOver = false;

function changeTurn() {
  if (turn === 1) {
    turn = 2;
    markCount++;
    return 'X';
  }
  turn = 1;
  markCount++;
  return 'O';
}

// The return value indicates who won the game and did not control the draw.
function checkRows(index) {
  // index must be zero, three, six
  // index equal is zero for check first row // index-> 0-1-2
  // index equal is three for check second row // index-> 3-4-5 
  // index equal is six for check third row //index-> 6-7-8
  if (areas[index].innerHTML == 'X') {
    if (areas[index + 1].innerHTML == 'X') {
      if (areas[index + 2].innerHTML == 'X') {
        return 1; // Win Player 1
      }
    }
  } else if (areas[index].innerHTML == 'O') {
    if (areas[index + 1].innerHTML == 'O') {
      if (areas[index + 2].innerHTML == 'O') {
        return 2; // Win Player 2
      }
    }
  }
}

// The return value indicates who won the game and did not control the draw.
function checkColums(index) {
  // index must be zero, one, two
  // index equal is zero for check first column // index-> 0-3-6
  // index equal is one for check second column // index-> 1-4-7
  // index equal is two for check third column // index-> 2-5-8
  if (areas[index].innerText == 'X') {
    if (areas[index + 3].innerText == 'X') {
      if (areas[index + 6].innerText == 'X') {
        return 1;
      }
    }
  } else if (areas[index].innerText == 'O') {
    if (areas[index + 3].innerText == 'O') {
      if (areas[index + 6].innerText == 'O') {
        return 2;
      }
    }
  }
}

// The return value indicates who won the game and did not control the draw.
function checkRightDiagonal() {
  if (
    areas[0].innerText == 'X' &&
    areas[4].innerText == 'X' &&
    areas[8].innerText == 'X'
  ) {
    return 1;
  } else if (
    areas[0].innerText == 'O' &&
    areas[4].innerText == 'O' &&
    areas[8].innerText == 'O'
  ) {
    return 2;
  }
}

// The return value indicates who won the game and did not control the draw.
function checkLeftDiagonal() { 
  if (
    areas[2].innerText == 'X' &&
    areas[4].innerText == 'X' &&
    areas[6].innerText == 'X'
  ) {
    return 1;
  } else if (
    areas[2].innerText == 'O' &&
    areas[4].innerText == 'O' &&
    areas[6].innerText == 'O'
  ) {
    return 2;
  }
}

// // The return value shows the game result. (1)win player 1, (2)win player2 or (0)draw
function whoWin() {
  writeInfo();
  if (checkColums(0) == 1 || checkColums(1) == 1 || checkColums(2) == 1) {
    isGameOver = true;
    whoWinText.innerHTML = 'Player one win!!';
    return 1;
  } else if (
    checkColums(0) == 2 ||
    checkColums(1) == 2 ||
    checkColums(2) == 2
  ) {
    isGameOver = true;
    whoWinText.innerHTML = 'Player two win!!';
    return 2;
  } else if (checkRows(0) == 1 || checkRows(3) == 1 || checkRows(6) == 1) {
    whoWinText.innerHTML = 'Player one win!!';
    isGameOver = true;
    return 1;
  } else if (checkRows(0) == 2 || checkRows(3) == 2 || checkRows(6) == 2) {
    isGameOver = true;
    whoWinText.innerHTML = 'Player two win!!';
    return 2;
  } else if (checkLeftDiagonal() == 1 || checkRightDiagonal() == 1) {
    isGameOver = true;
    whoWinText.innerHTML = 'Player one win!!';
    return 1;
  } else if (checkLeftDiagonal() == 2 || checkRightDiagonal() == 2) {
    isGameOver = true;
    whoWinText.innerHTML = 'Player two win!!';
    return 2;
  } else if (markCount >= 9) {
    isGameOver = true;
    whoWinText.innerHTML = 'Draw';
    return 0;
  }
}

function reset() {
  turn = 1;
  markCount = 0;
  isGameOver = false;
  playerTurnText.innerHTML = "Player one's turn. (X)";
  markCountText.innerText = 'Count of mark: ' + markCount;
  whoWinText.innerHTML = '';
  areas.forEach((item) => {
    item.innerHTML = '-';
  });
}

document.getElementById('reset').onclick = () => {
  reset();
};

function writeInfo() {
  if (turn == 1) playerTurnText.innerHTML = "Player one's turn. (X)";
  else playerTurnText.innerHTML = "Player two's turn. (O)";
  markCountText.innerText = 'Count of mark: ' + markCount;
}

areas.forEach((x) => {
  x.onclick = function markArea() {
    if (
      x.innerText != 'X' &&
      x.innerText != 'O' &&
      markCount < 9 &&
      !isGameOver
    ) {
      x.innerText = changeTurn();
      whoWin();
    }
  };
});
