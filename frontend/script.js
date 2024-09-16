let score = 0;
let timeLeft = 10;
let coinInterval;
let timerInterval;
let playerName = '';  // Declare playerName outside of functions

const gameContainer = document.getElementById('game-container');
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const loginForm = document.getElementById('login-form');
const playerNameInput = document.getElementById('player-name');
const leaderboardDiv = document.getElementById('leaderboard');
const leaderboardList = document.getElementById('leaderboard-list');

// Show the login form
function showLoginForm() {
    loginForm.style.display = 'block';
    gameContainer.style.display = 'none';
    leaderboardDiv.style.display = 'none';
}

// Start the game
function startGame() {
    playerName = playerNameInput.value.trim();
    if (!playerName) {
        alert('Please enter a name!');
        return;
    }

    loginForm.style.display = 'none';
    gameContainer.style.display = 'block';
    leaderboardDiv.style.display = 'none';

    score = 0;  // Reset score
    timeLeft = 10;  // Reset timeLeft
    scoreDisplay.textContent = `Score: ${score}`;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;

    createCoin();

    // Generate coins at intervals
    coinInterval = setInterval(createCoin, 1000);
    timerInterval = setInterval(updateTimer, 1000);
}

// Generate random coin position
function generateRandomPosition() {
    const x = Math.random() * (gameArea.offsetWidth - 40);
    const y = Math.random() * (gameArea.offsetHeight - 40);
    return { x, y };
}

// Create and place coins in game area
function createCoin() {
    if (timeLeft <= 0) return;

    const coin = document.createElement('div');
    coin.classList.add('coin');
    const { x, y } = generateRandomPosition();
    coin.style.left = `${x}px`;
    coin.style.top = `${y}px`;

    // Remove coin on click and update score
    coin.addEventListener('click', () => {
        gameArea.removeChild(coin);
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
    });

    gameArea.appendChild(coin);

    // Remove coin after 2 seconds
    setTimeout(() => {
        if (gameArea.contains(coin)) {
            gameArea.removeChild(coin);
        }
    }, 2000);
}

// Update timer and end the game
function updateTimer() {
    if (timeLeft <= 0) return;

    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
        clearInterval(coinInterval);
        clearInterval(timerInterval);
        submitScore();
    }
}

// Submit score to backend and show leaderboard
// Submit score to backend and show leaderboard
function submitScore() {
    fetch('https://coinsgametest.onrender.com/add-score', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ playerName, score })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Score submitted successfully:', data);
        alert(`Time's up, ${playerName}! Your final score is ${score}`);
        showLeaderboard();
    })
    .catch(error => {
        console.error('Error submitting score:', error);
    });
}

// Show leaderboard
function showLeaderboard() {
    loginForm.style.display = 'none';
    gameContainer.style.display = 'none';
    leaderboardDiv.style.display = 'block';

    fetch('https://coinsgametest.onrender.com/leaderboard')
    .then(response => response.json())
    .then(data => {
        leaderboardList.innerHTML = '';
        data.forEach(entry => {
            const li = document.createElement('li');
            li.textContent = `${entry.playerName}: ${entry.score}`;
            leaderboardList.appendChild(li);
        });
    })
    .catch(error => console.error('Error:', error));
}

// Initialize the page
showLoginForm();
