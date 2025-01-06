const userNameInput = document.getElementById("user-name");
const startGameButton = document.getElementById("start-game");
const welcomeSection = document.getElementById("welcome-section");
const gameSection = document.getElementById("game-section");
const playerNameDisplay = document.getElementById("player-name");
const currentRoundDisplay = document.getElementById("current-round");
const userChoiceDisplay = document.getElementById("user-choice");
const computerChoiceDisplay = document.getElementById("computer-choice");
const roundWinnerDisplay = document.getElementById("round-winner");
const userScoreDisplay = document.getElementById("user-score");
const computerScoreDisplay = document.getElementById("computer-score");
const finalSection = document.getElementById("final-section");
const resetGameButton = document.getElementById("reset-game");

let currentRound = 1;
let userScore = 0;
let computerScore = 0;

const choices = ["rock", "paper", "scissors"];

function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) return "tie";
  if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  )
    return "user";
  return "computer";
}

startGameButton.addEventListener("click", () => {
  const userName = userNameInput.value.trim();
  if (!userName) {
    alert("Please enter your name!");
    return;
  }
  playerNameDisplay.textContent = userName;
  welcomeSection.classList.add("d-none");
  gameSection.classList.remove("d-none");
  currentRoundDisplay.textContent = currentRound;
});

document.querySelectorAll(".choice-btn").forEach((button) => {
  button.addEventListener("click", () => {
    if (currentRound > 5) return;

    const userChoice = button.dataset.choice;
    const computerChoice = getComputerChoice();

    userChoiceDisplay.textContent = userChoice;
    computerChoiceDisplay.textContent = computerChoice;

    const winner = determineWinner(userChoice, computerChoice);
    if (winner === "user") {
      userScore++;
      roundWinnerDisplay.textContent = "You win this round!";
    } else if (winner === "computer") {
      computerScore++;
      roundWinnerDisplay.textContent = "Computer wins this round!";
    } else {
      roundWinnerDisplay.textContent = "It's a tie!";
    }

    userScoreDisplay.textContent = userScore;
    computerScoreDisplay.textContent = computerScore;

    currentRoundDisplay.textContent = ++currentRound;

    if (currentRound > 5) {
      gameSection.classList.add("d-none");
      finalSection.classList.remove("d-none");
    }
  });
});

resetGameButton.addEventListener("click", () => {
  userScore = 0;
  computerScore = 0;
  currentRound = 1;
  userScoreDisplay.textContent = userScore;
  computerScoreDisplay.textContent = computerScore;
  currentRoundDisplay.textContent = currentRound;
  roundWinnerDisplay.textContent = "";

  finalSection.classList.add("d-none");
  welcomeSection.classList.remove("d-none");
  gameSection.classList.add("d-none");
});
