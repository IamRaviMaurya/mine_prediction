const gridElement = document.getElementById('grid');
const mineSlider = document.getElementById('mines');
const mineValue = document.getElementById('mineValue');
const button = document.querySelector('.button');
const gridSize = 5;
const totalCells = gridSize * gridSize;
let countdownInterval = null;

function createGrid() {
  gridElement.innerHTML = '';
  for (let i = 0; i < totalCells; i++) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.textContent = '';
    gridElement.appendChild(cell);
  }
}

function updateMineValue() {
  mineValue.textContent = mineSlider.value;
}

function startPrediction() {
  // Disable button
  disableButtonForOneMinute();

  // Reset grid
  createGrid();

  const bombs = parseInt(mineSlider.value);
  const diamondsToShow = 5 - Math.min(bombs, 5);

  const diamondIndexes = Array.from({ length: totalCells }, (_, i) => i)
    .sort(() => Math.random() - 0.5)
    .slice(0, diamondsToShow);

  diamondIndexes.forEach((index, i) => {
    const cell = gridElement.children[index];
    cell.innerHTML = '<div class="loader"></div>'; // loader
    setTimeout(() => {
      cell.innerHTML = '💎';
      cell.classList.add('revealed');
    }, 400 + i * 200);
  });
}

function disableButtonForOneMinute() {
  let remainingTime = 60;
  button.disabled = true;
  button.style.opacity = 0.6;
  button.textContent = `Wait ${remainingTime}s`;

  countdownInterval = setInterval(() => {
    remainingTime--;
    if (remainingTime > 0) {
      button.textContent = `Wait ${remainingTime}s`;
    } else {
      clearInterval(countdownInterval);
      button.disabled = false;
      button.style.opacity = 1;
      button.textContent = 'Get Prediction';
    }
  }, 1000);
}

function updateTime() {
  const timeElement = document.getElementById('timeDisplay');
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  timeElement.textContent = timeString;
}

setInterval(updateTime, 1000);
updateTime(); // initialize
createGrid();
