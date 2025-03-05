const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY;
let snakeX = 10, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;
let gameSpeed = 150;  // Fixed game speed

// Retrieve high score from local storage
let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;

// Generates a random position for food
const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30);
    foodY = Math.floor(Math.random() * 30);
};

// Handles game over scenario
const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to restart...");
    location.reload();
};

// Updates snake direction based on user input
const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
};

// Enables touch controls for mobile devices
controls.forEach(key => {
    key.addEventListener("click", () => changeDirection({ key: key.dataset.key }));
    key.addEventListener("touchstart", () => changeDirection({ key: key.dataset.key }));
});

// Main game loop
const initGame = () => {
    if (gameOver) return handleGameOver();

    let htmlMarkup = `<div class="food" style="grid-area: ${foodY + 1}/${foodX + 1}"></div>`;

    // Checks if snake eats food
    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]); // Grow the snake
        score++;

        // Update high score
        highScore = Math.max(score, highScore);
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
    }

    // Move snake body
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY];

    // Move snake head
    snakeX += velocityX;
    snakeY += velocityY;

    // Check for collisions (wall & self)
    if (snakeX < 0 || snakeX >= 30 || snakeY < 0 || snakeY >= 30) gameOver = true;
    snakeBody.slice(1).forEach(segment => {
        if (snakeX === segment[0] && snakeY === segment[1]) gameOver = true;
    });

    // Render snake on the board
    snakeBody.forEach(segment => {
        htmlMarkup += `<div class="head" style="grid-area: ${segment[1] + 1}/${segment[0] + 1}"></div>`;
    });

    playBoard.innerHTML = htmlMarkup;
};

// Start game loop
changeFoodPosition();
setIntervalId = setInterval(initGame, gameSpeed);
document.addEventListener("keydown", changeDirection);