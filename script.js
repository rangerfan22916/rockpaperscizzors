let userScore = 0;
let computerScore = 0;
let round = 1;

document.getElementById("start-game").addEventListener("click", startGame);
document.getElementById("reset-game").addEventListener("click", resetGame);

function startGame() {
    const playerName = document.getElementById("user-name").value.trim();

    if (playerName === "") {
        alert("Please enter your name to start the game!");
        return;
    }

    document.getElementById("welcome-section").classList.add("d-none");
    document.getElementById("game-section").classList.remove("d-none");
    document.getElementById("final-section").classList.add("d-none");

    document.getElementById("player-name").textContent = playerName;

    resetGame();
}

function resetGame() {
    userScore = 0;
    computerScore = 0;
    round = 1;

    document.getElementById("user-score").textContent = userScore;
    document.getElementById("computer-score").textContent = computerScore;
    document.getElementById("current-round").textContent = round;
    document.getElementById("round-winner").textContent = "";

    document.getElementById("game-section").classList.add("d-none");
    document.getElementById("welcome-section").classList.remove("d-none");
    document.getElementById("final-section").classList.add("d-none");

    document.getElementById("user-name").value = ""; // Clear input
}

function playRound(userChoice) {
    if (round > 5) {
        document.getElementById("game-section").classList.add("d-none");
        document.getElementById("final-section").classList.remove("d-none");
        return;
    }

    const computerChoice = getComputerChoice();
    const roundWinner = getRoundWinner(userChoice, computerChoice);

    if (roundWinner === "user") {
        userScore++;
        document.getElementById("round-winner").textContent = "You win this round!";
    } else if (roundWinner === "computer") {
        computerScore++;
        document.getElementById("round-winner").textContent = "Computer wins this round!";
    } else {
        document.getElementById("round-winner").textContent = "It's a draw!";
    }

    round++;
    document.getElementById("current-round").textContent = round;
    document.getElementById("user-score").textContent = userScore;
    document.getElementById("computer-score").textContent = computerScore;

    document.getElementById("user-choice").textContent = userChoice;
    document.getElementById("computer-choice").textContent = computerChoice;
}

function getComputerChoice() {
    let computerChoice = Math.random();
    if (computerChoice < 0.33) {
        return "rock";
    } else if (computerChoice < 0.66) {
        return "paper";
    } else {
        return "scissors";
    }
}

function getRoundWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return "draw";
    }

    if (userChoice === "rock") {
        return computerChoice === "scissors" ? "user" : "computer";
    }
    if (userChoice === "paper") {
        return computerChoice === "rock" ? "user" : "computer";
    }
    if (userChoice === "scissors") {
        return computerChoice === "paper" ? "user" : "computer";
    }
    return "computer";
}

document.querySelectorAll(".choice-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
        const userChoice = e.target.getAttribute("data-choice");
        playRound(userChoice);
    });
});

