const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const bestScoreDisplay = document.getElementById('best-score');
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start-button');

const leafImages = [
    "./img/leaf1.png",
    "./img/leaf2.png",
    "./img/leaf3.png",
    "./img/leaf4.png"
];

let score = 0;
let bestScore = localStorage.getItem('bestScore') || 0;
let gameInterval;
let spawnInterval;
let timer = 30;
let startSound = new sound('sfx/start.mp3');
let pointSound = new sound('sfx/point.mp3');
let windSound = new sound('sfx/wind.mp3');
let endSound = new sound('sfx/end.mp3');

bestScoreDisplay.textContent = bestScore;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function startGame() {
    score = 0;
    timer = 30;
    startSound.play();
    windSound.play();
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timer;
    gameArea.innerHTML = '';
    startButton.disabled = true;

    gameInterval = setInterval(() => {
        timer--;
        timerDisplay.textContent = timer;
        if (timer <= 0) {
            windSound.stop();
            endGame();
        }
    }, 1000);

    spawnInterval = setInterval(() => {
        spawnItem();
    }, 250);
}

function spawnItem() {
    const item = document.createElement('div');
    const randomImage = leafImages[Math.floor(Math.random() * leafImages.length)];
    item.style.backgroundImage = `url(${randomImage})`;
    item.classList.add('leaf');
    item.style.top = `${Math.random() * 400}px`;
    item.style.left = `${Math.random() * 1400}px`;

    item.addEventListener('mouseover', () => {
        item.style.backgroundColor = '#222';
    });

    item.addEventListener('click', () => {
        score += 1;
        scoreDisplay.textContent = score;
        item.remove();
        pointSound.play();
    });

    gameArea.appendChild(item);

    setTimeout(() => {
        if (item.parentNode) {
            item.remove();
        }
    }, 2000);
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(spawnInterval);
    startButton.disabled = false;
    alert(`Gra zakończona! Twój wynik: ${score}`);
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem('bestScore', bestScore);
        bestScoreDisplay.textContent = bestScore;
    }
}

startButton.addEventListener('click', startGame);

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
 } 