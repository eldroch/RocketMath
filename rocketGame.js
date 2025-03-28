const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let rocketY = canvas.height - 50;
let fuel = 100;
let currentAnswer;
let difficultyLevel = 1;
const answerInput = document.getElementById('answerInput');
const boostSound = document.getElementById('boostSound');

// Load rocket image
const rocketImg = new Image();
rocketImg.src = 'rocket.png'; // Ensure 'rocket.png' is in the same directory

function drawRocket() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(rocketImg, canvas.width / 2 - 75, rocketY - 95, 150, 160);
}

function generateProblem() {
    let num1, num2;
    if (difficultyLevel === 1) {
        num1 = Math.floor(Math.random() * 10);
        num2 = Math.floor(Math.random() * 10);
        currentAnswer = num1 + num2;
        document.getElementById('mathProblem').innerText = `${num1} + ${num2} = ?`;
    } else if (difficultyLevel === 2) {
        num1 = Math.floor(Math.random() * 10);
        num2 = Math.floor(Math.random() * 10);
        currentAnswer = num1 * num2;
        document.getElementById('mathProblem').innerText = `${num1} × ${num2} = ?`;
    }
}

function checkAnswer() {
    const userAnswer = parseInt(answerInput.value);
    if (userAnswer === currentAnswer) {
        fuel += 10;
        if (fuel > 100) fuel = 100;
        rocketY -= 20;
        boostSound.play();
    } else {
        fuel -= 15;
        rocketY += 10;
    }
    updateFuelGauge();
    generateProblem();
    drawRocket();
    answerInput.value = '';
    answerInput.focus();
}

function updateFuelGauge() {
    document.getElementById('fuelLevel').style.width = fuel + '%';
}

function gameLoop() {
    if (fuel > 0) {
        fuel -= 0.05;
        rocketY += 0.05;
        if (rocketY < -60) {
            rocketY = canvas.height - 50;
            difficultyLevel += 1;
            if (difficultyLevel > 2) difficultyLevel = 2;
            alert(`Great job! Now entering difficulty level ${difficultyLevel}.`);
        }
        updateFuelGauge();
        drawRocket();
        requestAnimationFrame(gameLoop);
    } else {
        alert('Game Over!');
    }
}

// Keybind Enter to submit
answerInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        checkAnswer();
    }
});

// Initialize game
generateProblem();
rocketImg.onload = function() {
    drawRocket();
    gameLoop();
};
answerInput.focus();