let score = 0;
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');

// Generate random coin position
function generateRandomPosition() {
    const x = Math.floor(Math.random() * (gameArea.offsetWidth - 40));
    const y = Math.floor(Math.random() * (gameArea.offsetHeight - 40));
    return ( x, y );
}

// Create and place coins in game area
function createCoin() {
    const coin = document.getElementById('div');
    coin.classList.add('coin');
    const { x, y } = generateRandomPosition();
    coin.style.left = `${x}px`;
    coin.style.top = `${y}px`;

    // Remove coin on click and update score
    coin.addEventListener('click', () => {
        gameArea.removeChild(coin);
        score += 10;
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

// Generate coins at intervals
setInterval(createCoin, 1000);