const ROWS = 10;
const COLUMNS = 20;
const PLAYER = "$";
const DOWN = "ArrowUp";
const UP = "ArrowDown";
const NEUTRAL = "_";
const ENEMIES = ["#", "@", "&"];
const RIP = "X";
const TEXTURES = [...Array.from(new Array(ENEMIES.length * 5)).map(() => NEUTRAL), ...ENEMIES];

const getTexture = () => TEXTURES[Math.floor(Math.random() * TEXTURES.length)];

const generateEmptyMatrix = () =>
  Array.from(new Array(ROWS)).map(() => Array.from(new Array(COLUMNS)).map(() => NEUTRAL));

const renderCell = (isPlayerCell, cellValue) => {
  if (!isPlayerCell) {
    return cellValue;
  }
  if (cellValue === NEUTRAL) {
    return PLAYER;
  }
  return RIP;
};

const renderMatrix = (container, matrix, position) => {
  const tbody = document.createElement("tbody");

  matrix.forEach((row, rowIndex) => {
    const tr = document.createElement("tr");
    row.forEach((cell, columnIndex) => {
      const td = document.createElement("td");
      td.textContent = columnIndex === 1 && rowIndex === position ? PLAYER : cell;
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  const table = document.createElement("table");
  table.appendChild(tbody);

  container.innerHTML = "";
  container.appendChild(table);
};

const moveMatrix = (matrix, newColumn) => matrix.map((row, i) => [...row.slice(1), newColumn[i]]);

const generateColumn = () => Array.from(new Array(ROWS)).map(() => getTexture());

const world = document.getElementById("world");
const newGame = document.getElementById("new-game");

let matrix;
let position;
let interval;

const onKeyDown = ({ code }) => {
  if (code === DOWN) {
    position = position === 0 ? 0 : position - 1;
    if (matrix[position][1] !== NEUTRAL) {
      window.clearInterval(interval);
    }
    renderMatrix(world, matrix, position);
    return;
  }

  if (code === UP) {
    position = position === ROWS - 1 ? ROWS - 1 : position + 1;
    if (matrix[position][1] !== NEUTRAL) {
      window.clearInterval(interval);
    }
    renderMatrix(world, matrix, position);
    return;
  }
};

const start = () => {
  matrix = generateEmptyMatrix();
  position = ROWS - 2;

  interval = window.setInterval(() => {
    matrix = moveMatrix(matrix, generateColumn());
    if (matrix[position][1] !== NEUTRAL) {
      window.clearInterval(interval);
    }
    renderMatrix(world, matrix, position);
  }, 1000);

  document.body.removeEventListener("keydown", onKeyDown);

  document.body.addEventListener("keydown", onKeyDown);

  renderMatrix(world, matrix, position);
};

window.onload = () => {
  newGame.addEventListener("click", () => {
    start();
  });
};

if (typeof window === "undefined") {
  // export stuff to test in node
  module.exports({
    generateEmptyMatrix,
  });
} else {
  // use the browser to play games
}
