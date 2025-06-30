const bird = document.getElementById("bird");
const pipeTop = document.getElementById("pipe-top");
const pipeBottom = document.getElementById("pipe-bottom");
const scoreDisplay = document.getElementById("score");
const gameContainer = document.getElementById("game-container");
const startMenu = document.getElementById("start-menu");
const startButton = document.getElementById("start-button");

let birdY = 200;
let gravity = 0.5;
let velocity = 0;
let jump = -8;

let pipeX = 400;
let gap = 150;
let pipeTopHeight = Math.floor(Math.random() * 200) + 50;

let score = 0;
let gameOver = false;
let gameStarted = false;
let paused = false;

const pauseButton = document.getElementById("pause-button");

pauseButton.addEventListener("click", () => {
  paused = !paused;
  pauseButton.textContent = paused ? "Resume" : "Pause";
  if (!paused) {
    gameLoop(); // Resume the game loop
  }
});


function resetPipes() {
  pipeX = 400;
  pipeTopHeight = Math.floor(Math.random() * 200) + 50;
  pipeTop.style.height = pipeTopHeight + "px";
  pipeBottom.style.height = (600 - pipeTopHeight - gap) + "px";
}

function gameLoop() {
  if (!gameStarted || gameOver || paused) return;

  // Bird movement
  velocity += gravity;
  if (velocity > maxVelocity) velocity = maxVelocity;
  birdY += velocity;
  bird.style.top = birdY + "px";

  // Pipe movement
  pipeX -= 4;
  pipeTop.style.right = (400 - pipeX) + "px";
  pipeBottom.style.right = (400 - pipeX) + "px";

  // Collision detection
  if (
    birdY < 0 ||
    birdY + 30 > 600 ||
    (pipeX < 130 && pipeX + 60 > 100 &&
     (birdY < pipeTopHeight || birdY + 30 > pipeTopHeight + gap))
  ) {
    gameOver = true;
    alert("Game Over! Score: " + score);
    location.reload();
    return;
  }

  // Scoring
  if (pipeX + 60 < 100) {
    score++;
    scoreDisplay.textContent = "Score: " + score;
    resetPipes();
  }

  requestAnimationFrame(gameLoop);
}




document.addEventListener("keydown", flap);
document.addEventListener("click", flap);
document.addEventListener("touchstart", flap);

// Handle Start Button
startButton.addEventListener("click", () => {
  startMenu.style.display = "none";
  gameContainer.style.display = "block";
  scoreDisplay.style.display = "block";
  pauseButton.style.display = "block";
  pauseButton.textContent = "Pause";

  gameStarted = true;

  // Reset bird position and velocity
  birdY = 200;
  velocity = 0;

  resetPipes();
  gameLoop();
});

let lastFlap = 0;

function flap(event) {
  if (!gameStarted || gameOver) return;

  const now = Date.now();
  if (now - lastFlap < 100) return; // prevent double-flap in <100ms
  lastFlap = now;

  velocity = jump;
}

