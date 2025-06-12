const gridElement = document.getElementById('grid');
const mineSlider = document.getElementById('mines');
const mineValue = document.getElementById('mineValue');
const gridSize = 5;
const totalCells = gridSize * gridSize;

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
  const bombs = parseInt(mineSlider.value);
  const diamondsToShow = 5 - Math.min(bombs, 5);
  createGrid();

  const diamondIndexes = Array.from({ length: totalCells }, (_, i) => i)
    .sort(() => Math.random() - 0.5)
    .slice(0, diamondsToShow);

  diamondIndexes.forEach((index, i) => {
    const cell = gridElement.children[index];
    cell.innerHTML = '<div class="loader"></div>'; // show loader

    setTimeout(() => {
      cell.innerHTML = '💎';
      cell.classList.add('revealed');
    }, 400 + i * 200);
  });
}

function updateTime() {
  const timeElement = document.getElementById('timeDisplay');
  const now = new Date();
  const timeString = now.toLocaleTimeString();
  timeElement.textContent = timeString;
}

setInterval(updateTime, 1000);
updateTime(); // initialize immediately
createGrid();
