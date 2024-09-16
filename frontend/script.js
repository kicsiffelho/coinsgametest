let score = 0;
let timeLeft = 10;
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');

// Generate random coin position
function generateRandomPosition() {
    const x = Math.random() * (gameArea.offsetWidth - 40);
    const y = Math.random() * (gameArea.offsetHeight - 40);
    return { x, y};
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
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
        clearInterval(coinInterval);
        clearInterval(timerInterval);
    }
}

scoreDisplay.textContent = `Final score: ${score}`;

// Generate coins at intervals
const coinInterval = setInterval(createCoin, 1000);
const timerInterval = setInterval(updateTimer, 1000);