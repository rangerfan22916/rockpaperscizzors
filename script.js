document.getElementById("start-game").addEventListener("click", function () {
  const userName = document.getElementById("user-name").value;

  // If the user enters a name, proceed
  if (userName.trim() !== "") {
    // Set the user's name in the game section
    document.getElementById("player-name").textContent = userName;

    // Hide the welcome section and show the game section
    document.getElementById("welcome-section").classList.add("d-none");
    document.getElementById("game-section").classList.remove("d-none");
  } else {
    alert("Please enter your name.");
  }
});

// Initialize scores and rounds
let userScore = 0;
let computerScore = 0;
let currentRound = 1;
let totalRounds = 5;

// Elements
const userChoiceDisplay = document.getElementById("user-choice");
const computerChoiceDisplay = document.getElementById("computer-choice");
const roundWinnerDisplay = document.getElementById("round-winner");
const userScoreDisplay = document.getElementById("user-score");
const computerScoreDisplay = document.getElementById("computer-score");
const currentRoundDisplay = document.getElementById("current-round");

// Add event listeners for choice buttons
document.querySelectorAll(".choice-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const userChoice = this.getAttribute("data-choice");
    const computerChoice = getComputerChoice();

    // Display user and computer choices
    userChoiceDisplay.textContent = userChoice;
    computerChoiceDisplay.textContent = computerChoice;

    // Determine the winner of the round
    const roundWinner = determineWinner(userChoice, computerChoice);

    // Update the round winner display
    roundWinnerDisplay.textContent = roundWinner.message;

    // Update scores
    if (roundWinner.winner === "user") {
      userScore++;
    } else if (roundWinner.winner === "computer") {
      computerScore++;
    }

    // Update score displays
    userScoreDisplay.textContent = userScore;
    computerScoreDisplay.textContent = computerScore;

    // Update current round display
    currentRound++;
    currentRoundDisplay.textContent = currentRound;

    // Check if the game has ended
    if (currentRound > totalRounds) {
      endGame();
    }
  });
});

// Function to get a random choice for the computer
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}

// Function to determine the winner of a round
function determineWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) {
    return {
      winner: "tie",
      message: "It's a tie!",
    };
  }

  // Rock beats Scissors, Scissors beats Paper, Paper beats Rock
  if (
    (userChoice === "rock" && computerChoice === "scissors") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    return {
      winner: "user",
      message: "You win this round!",
    };
  } else {
    return {
      winner: "computer",
      message: "Computer wins this round!",
    };
  }
}

// Function to end the game and show the final result
function endGame() {
  // Hide the game section and show the final section
  document.getElementById("game-section").classList.add("d-none");
  document.getElementById("final-section").classList.remove("d-none");

  // Determine the final winner
  const finalWinnerMessage =
    userScore > computerScore
      ? "Congratulations, you win the game!"
      : userScore < computerScore
      ? "Computer wins the game. Better luck next time!"
      : "It's a tie game!";

  roundWinnerDisplay.textContent = finalWinnerMessage;
}

// Reset the game when the "Play Again" button is clicked
document.getElementById("reset-game").addEventListener("click", function () {
  // Reset scores and round count
  userScore = 0;
  computerScore = 0;
  currentRound = 1;

  // Update the UI
  userScoreDisplay.textContent = userScore;
  computerScoreDisplay.textContent = computerScore;
  currentRoundDisplay.textContent = currentRound;

  // Hide the final section and show the welcome section again
  document.getElementById("final-section").classList.add("d-none");
  document.getElementById("welcome-section").classList.remove("d-none");

  // Reset the user name input
  document.getElementById("user-name").value = "";
});
