const X_CLASS = 'x' //Definition for x vairable
const CIRCLE_CLASS = 'circle' //Definition for a circle

var x_wins = 0 //Number of games won by x
var o_wins = 0 //number of games won by o
var draws = 0 //Number of draws

//In the matrix, we list all the possible winning combinations,
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

//Define all the elements
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

//Start the game here.
startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

//Handle click and check if it is x's or o's turn.
function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

//End the game if draw condition is true and increment the value of draw in the leaderboard by 1, else x_wins and o_wins
function endGame(draw) {
  if (draw) {
    draws+=1
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    if(circleTurn)
    {
      o_wins+=1
    }
    else {
      x_wins+=1
    }
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
  }
  winningMessageElement.classList.add('show')
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

//CircleTurn value switches between true and false.
function swapTurns() {
  circleTurn = !circleTurn
}

//Function to display the leaderboard to the user.
function leaderboard(){
  alert('X:'+x_wins+'\nO:'+o_wins+"\nDraw:"+draws)
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

//Check the grid for a win condition.
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}
