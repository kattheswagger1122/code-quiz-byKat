// Global variables, questions are stored in questions.js
var beginQuiz = document.querySelector("#beginBtn");
var leaderBtn = document.querySelector("#leaderBtn");
var timerDisplay = document.querySelector(".timer");
var gameCard = document.querySelector("#gameCard");
var question = document.querySelector("#question");
var mcA = document.querySelector("#mcA");
var mcB = document.querySelector("#mcB");
var mcC = document.querySelector("#mcC");
var mcD = document.querySelector("#mcD");
var answer = document.querySelector("#answer");
var feedback = document.querySelector("#feedback1");
var card = document.querySelector("#multipleChoice");
var inputForm = document.querySelector("#inputForm");
var scoreCard = document.querySelector("#scoreCard");
var scoreBtn = document.querySelector("#scoreBtn");
var initialsBox = document.querySelector("#initialsBox");
var submitBtn = document.querySelector("#submitBtn");
var backBtn = document.querySelector("#backBtn");
var clearBtn = document.querySelector("#clearBtn");
var start = document.querySelector(".start");

var timeLeft = questionBank.length * 15;
var q = 0;
var s = 0;
var score = 0;
var scoreList = [];
var timeInterval;

getScore();
// -----------------------------------------------------------------------------

// Running the timer for the quiz
function timer() {
  timeInterval = setInterval(function () {
    timeLeft--;
    timerDisplay.textContent = "TIMER: " + timeLeft;

    if (timeLeft === 0 || q >= questionBank.length) {
      clearInterval(timeInterval);
      gameOver();
    }
  }, 1000);
}
// -----------------------------------------------------------------------------

// Displaying questions & answers from questionBank
function displayQA() {
  if (q < questionBank.length) {
    question.textContent = questionBank[q].question;
    mcA.textContent = questionBank[q].selection[0];
    mcB.textContent = questionBank[q].selection[1];
    mcC.textContent = questionBank[q].selection[2];
    mcD.textContent = questionBank[q].selection[3];
  } else {
    gameOver();
  }
}
// -----------------------------------------------------------------------------

// Informing player if chosen answer is right or wrong
function compareAnswer(event) {
  if (q >= questionBank.length) {
    gameOver();
    clearInterval(timeInterval);
  } else {
    if (event === questionBank[q].answer) {
      feedback1.textContent = "You are correct!";
    } else {
      timeLeft -= 10;
      feedback1.textContent = "You are Wrong!";
    }
    score = timeLeft;
    q++;
    displayQA();
  }
}
// -----------------------------------------------------------------------------

// Getting scores from local storage
function getScore() {
  var storedScore = JSON.parse(localStorage.getItem("highScore"));
  if (storedScore !== null) {
    scoreList = storedScore;
  }
}
// -----------------------------------------------------------------------------

// Saving the scores to local storage
function saveScore() {
  localStorage.setItem("highScore", JSON.stringify(scoreList));
}
// -----------------------------------------------------------------------------

// Displaying & hiding page items based on Game Over
function gameOver() {
  scoreBtn.innerHTML = score;
  scoreBtn.style.display = "inline-block";
  gameCard.classList.add("hide");
  inputForm.classList.remove("hide");
  timerDisplay.classList.add("hide");
  leaderBtn.classList.add("hide");
  leaderBoard();
}
// -----------------------------------------------------------------------------

// Keeping track of top 10 leaders from local storage w/ loop
function leaderBoard() {
  removeFromLeaderBoard();
  addToLeaderBoard();
  scoreList.sort((a, b) => {
    return b.score - a.score;
  });
  //only render the top 4 scores.
  topTen = scoreList.slice(0, 10);

  for (var i = 0; i < topTen.length; i++) {
    var player = topTen[i].player;
    var score = topTen[i].score;

    var newDiv = document.createElement("div");
    leaderBoardDiv.appendChild(newDiv);

    var newLabel = document.createElement("label");
    newLabel.textContent = player + " - " + score;
    newDiv.appendChild(newLabel);
  }
}
// -----------------------------------------------------------------------------

// Adding player initials to leader board
function addToLeaderBoard() {
  leaderBoardDiv = document.createElement("div");
  leaderBoardDiv.setAttribute("id", "playerInitials");
  document.getElementById("leaderBoard").appendChild(leaderBoardDiv);
}
// -----------------------------------------------------------------------------

// Removing player initials from leader board
function removeFromLeaderBoard() {
  var removeScores = document.getElementById("playerInitials");
  if (removeScores !== null) {
    removeScores.remove();
  } else {
  }
}
// -----------------------------------------------------------------------------

// Event listeners
beginQuiz.addEventListener("click", function (event) {
  timer();
  displayQA();
  start.classList.add("hide");
  gameCard.classList.remove("hide");
  leaderBtn.style.display = "none";
  scoreCard.classList.add("hide");
});

card.addEventListener("click", function (event) {
  var event = event.target;
  compareAnswer(event.textContent.trim());
});

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var playerInitials = initialsBox.value.trim();
  var newScore = {
    player: playerInitials,
    score: score,
  };
  
  scoreList.push(newScore);
  saveScore();
  leaderBoard();
  inputForm.classList.add("hide");
  scoreCard.classList.remove("hide");
});

leaderBtn.addEventListener("click", function (event) {
  scoreCard.classList.remove("hide");
  leaderBtn.classList.add("hide");
  start.classList.add("hide");
  leaderBoard();
});

// Event listener for go back button ??
backBtn.addEventListener("click", function (event) {
  location.reload();
});

// Event listener for clear scores button ??
clearBtn.addEventListener("click", function (event) {
  scoreList = [];
  start.classList.add("hide");
  localStorage.setItem("highScore", JSON.stringify(scoreList));
  leaderBoard();
  saveScore();
});