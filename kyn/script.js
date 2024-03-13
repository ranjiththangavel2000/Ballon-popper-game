document.addEventListener('DOMContentLoaded', function () {
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const endScreen = document.getElementById('end-screen');
    const startBtn = document.getElementById('start-btn');
    const playAgainBtn = document.getElementById('play-again-btn');
    const timerDisplay = document.getElementById('timer');
    const popCountDisplay = document.getElementById('pop-count');
    const missCountDisplay = document.getElementById('miss-count');
    const scoreValueDisplay = document.getElementById('score-value');
    const balloonsContainer = document.getElementById('balloons-container');

    let gameTimer;
    let gameTime = 120;
    let popCount = 0;
    let missCount = 0;
    let balloonTimeout;

    function startGame() {
        startScreen.style.display = 'none';
        gameScreen.style.display = 'block';
        generateBalloon(); // Generate the first balloon when the game starts
        startTimer();
    }

    function startTimer() {
        gameTimer = setInterval(() => {
            gameTime--;
            if (gameTime <= 0) {
                clearInterval(gameTimer);
                endGame();
            }
            displayTime();
        }, 1000);
    }

    function displayTime() {
        const minutes = Math.floor(gameTime / 60);
        const seconds = gameTime % 60;
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    function generateBalloon() {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        const randomPosition = Math.random() * (window.innerWidth - 50);
        balloon.style.left = `${randomPosition}px`;
        balloonsContainer.appendChild(balloon);

        balloon.addEventListener('click', () => {
            clearTimeout(balloonTimeout);
            popBalloon(balloon);
        });

        balloonTimeout = setTimeout(() => {
            missBalloon(balloon);
        }, 2000); // Balloon disappears after 5 seconds
    }

    function popBalloon(balloon) {
        balloonsContainer.removeChild(balloon);
        popCount++;
        popCountDisplay.textContent = popCount;
        generateBalloon(); // Generate a new balloon after popping
    }

    function missBalloon(balloon) {
        balloonsContainer.removeChild(balloon);
        missCount++;
        missCountDisplay.textContent = missCount;
        generateBalloon(); // Generate a new balloon after missing
    }

    function endGame() {
        gameScreen.style.display = 'none';
        endScreen.style.display = 'block';
        scoreValueDisplay.textContent = popCount - missCount;
    }

    startBtn.addEventListener('click', startGame);

    playAgainBtn.addEventListener('click', () => {
        window.location.reload(); // Reload the page to restart the game
    });
});
