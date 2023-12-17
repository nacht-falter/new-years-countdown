// Get the canvas and its 2D rendering context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Variable to store the animation frame ID
let animationId;

// Flag to track if the player is falling
let falling = false;

// Score variable
let score = 0;

// Create a new image object for the player
const playerImage = new Image();

// Create a new image object for the obstacle
const objectImage = new Image();
objectImage.src = "assets/images/santa-sprites/gift.png";

// Simple state management function
function createState(initialState, spriteCount) {
    let state = initialState;
    let frames = spriteCount;

    function getState() {
        return state;
    }

    function setState(newState, newFrames) {
        state = newState;
        frames = newFrames;
    }

    function getSpriteCount() {
        return frames;
    }

    return {
        getState,
        setState,
        getSpriteCount,
    };
}

// Example usage of createState
const initialSpriteCount = 11;
const counterState = createState('run', initialSpriteCount);

// Function to animate an image
function animateImage(imageElement, basePath, frameDuration) {
    let currentFrame = 1;

    function updateImage() {
        if (currentFrame > counterState.getSpriteCount()) {
            currentFrame = 1;
        }
        imageElement.src = `${basePath}/${counterState.getState()} (${currentFrame}).png`;
        currentFrame++;
    }

    // Set interval to update the image
    setInterval(updateImage, frameDuration);
}

// Example usage of animateImage
animateImage(playerImage, "assets/images/santa-sprites", 30);

// Player object
const player = {
    x: 10,
    y: canvas.height + 10,
    width: 50,
    height: 60,
    isJumping: false,
    jumpHeight: 170,
    jumpCount: 1
};

// Obstacle object
const obstacle = {
    x: canvas.width,
    y: canvas.height - 30,
    width: 30,
    height: 30,
    speed: 2
};

// Function to draw the player on the canvas
function drawPlayer() {
    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);
}

// Function to draw the obstacle on the canvas
function drawObstacle() {
    ctx.drawImage(objectImage, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
}

// Function to handle player jump
function jump() {
    if (!player.isJumping) {
        player.isJumping = true;
        player.jumpCount = 0;
    }
}

// Main game loop function
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the player and obstacle
    drawPlayer();
    drawObstacle();

    // Update player position based on jump
    if (player.isJumping) {
        player.y -= 5;
        player.jumpCount += 5;

        if (player.jumpCount >= player.jumpHeight) {
            player.isJumping = false;
        }
    } else if (player.y < canvas.height - player.height) {
        player.y += 5;
    }

    // Update obstacle position
    obstacle.x -= obstacle.speed;

    // Check if obstacle moved off-screen and update the score
    if (obstacle.x + obstacle.width < 0) {
        obstacle.x = canvas.width;
        score += 10;
        $('.score').text(`Score: ${score}`);
    }

    // Adjust player state based on position and jumping status
    if (player.y === canvas.height - player.height && !falling && !player.isJumping) {
        counterState.setState('Run', 11);
    } else if (!falling) {
        counterState.setState('Jump', 16);
    }

    // Collision detection
    if (!falling) {
        if (
            player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y
        ) {
            falling = true;
            counterState.setState('Dead', 17);

            obstacle.x = canvas.width;
            // Set a timeout to display the alert after a short delay
            setTimeout(function () {
                cancelAnimationFrame(animationId);
                $('#start')
                    .removeClass('d-none')
                    .text('Restart')
                    .on('click', () => window.location.reload());
            }, 200);
        }
    }

    // Request the next animation frame
    animationId = requestAnimationFrame(gameLoop);
}

// Event listener for player jump on click
document.addEventListener("click", function (event) {
    jump();
});

// Event listener for starting the game loop on button click
document.getElementById('start').addEventListener('click', function () {
    // Hide the start button
    this.classList.add('d-none');
    // Start the game loop
    gameLoop();
});
