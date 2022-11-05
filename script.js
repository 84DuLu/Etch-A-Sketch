let currentColor = '#000000';
let currentMode = 'normal';
let currentSize = 16;

const colorPicker = document.getElementById('colorPicker');
const normalModeBtn = document.getElementById('normalBtn');
const randomModeBtn = document.getElementById('randomBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const toggleGridLineBtn = document.getElementById('toggleGridLineBtn');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');
const grid = document.getElementById('grid');

let mouseDown = false;
let isToggleGridLine = false;

function setCurrentColor(newColor) {
  currentColor = newColor;
}

function setCurrentMode(newMode) {
  activeMode(newMode);
  currentMode = newMode;
}

function setCurrentSize(newSize) {
  currentSize = +newSize;
}

function updateCurrentSize(newSize) {
  sizeValue.textContent = `${newSize} x ${newSize}`;
}

function clearGrid() {
  grid.innerHTML = '';
}

function toggleGirdLines() {
  const gridElements = document.querySelectorAll('.grid-element');
  if (isToggleGridLine) {
    gridElements.forEach((element) => {
      element.classList.remove('grid-line');
      grid.classList.remove('grid-border');
    });
  } else {
    gridElements.forEach((element) => {
      element.classList.add('grid-line');
      grid.classList.add('grid-border');
    });
  }
  isToggleGridLine = !isToggleGridLine;
}

function reloadGrid(newSize) {
  setCurrentSize(newSize);
  clearGrid();
  setupGrid(currentSize);
}

function setupGrid(size) {
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const gridElement = document.createElement('div');
    gridElement.classList.add('grid-element');
    if (isToggleGridLine) {
      gridElement.classList.add('grid-line');
    }
    gridElement.addEventListener('mousedown', changeColor);
    gridElement.addEventListener('mouseover', changeColor);
    grid.appendChild(gridElement);
  }

  if (isToggleGridLine) {
    grid.classList.add('grid-border');
  }
}

function changeColor(e) {
  if (e.type === 'mouseover' && !mouseDown) {
    return;
  }

  if (currentMode === 'normal') {
    e.target.style.backgroundColor = currentColor;
  } else if (currentMode === 'random') {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);
    e.target.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
  } else if (currentMode === 'eraser') {
    e.target.style.backgroundColor = '#FFF';
  }
}

function activeMode(newMode) {
  if (currentMode === 'normal') {
    normalModeBtn.classList.remove('active');
  } else if (currentMode === 'random') {
    randomModeBtn.classList.remove('active');
  } else if (currentMode === 'eraser') {
    eraserBtn.classList.remove('active');
  }

  if (newMode === 'normal') {
    normalModeBtn.classList.add('active');
  } else if (newMode === 'random') {
    randomModeBtn.classList.add('active');
  } else if (newMode === 'eraser') {
    eraserBtn.classList.add('active');
  }
}

colorPicker.oninput = (e) => setCurrentColor(e.target.value);
normalModeBtn.onclick = () => setCurrentMode('normal');
randomModeBtn.onclick = () => setCurrentMode('random');
eraserBtn.onclick = () => setCurrentMode('eraser');
clearBtn.onclick = () => reloadGrid(currentSize);
toggleGridLineBtn.onclick = () => toggleGirdLines();
sizeSlider.onmousemove = (e) => updateCurrentSize(e.target.value);
sizeSlider.onchange = (e) => reloadGrid(e.target.value);
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

window.onload = () => {
  setupGrid(currentSize);
  activeMode(currentMode);
};