const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const resetButton = document.getElementById('resetButton');
const scoreDisplay = document.getElementById('score');

const gridSize = 20;
let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;

function resetGame() {
    snake = [{ x: 200, y: 200 }];
    direction = { x: 0, y: 0 };
    score = 0;
    scoreDisplay.textContent = 'Score: 0';
    placeFood();
}

function placeFood() {
    food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
}

function update() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreDisplay.textContent = 'Score: ' + score;
        placeFood();
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        resetGame();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    ctx.fillStyle = 'lime';
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, gridSize, gridSize));
}

function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, 100);
}

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'w':
            if (direction.y === 0) direction = { x: 0, y: -gridSize };
            break;
        case 's':
            if (direction.y === 0) direction = { x: 0, y: gridSize };
            break;
        case 'a':
            if (direction.x === 0) direction = { x: -gridSize, y: 0 };
            break;
        case 'd':
            if (direction.x === 0) direction = { x: gridSize, y: 0 };
            break;
    }
});

resetButton.addEventListener('click', resetGame);

resetGame();
placeFood();
gameLoop();
