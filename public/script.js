const DOWN = "ArrowDown";
const UP = "ArrowUp";
const LEVEL_SIZE = 40;
const LEVEL_FACTOR = 0.9;
const INTERVAL_TIMEOUT = 500;

const levelElement = document.getElementById("level");
const scoreElement = document.getElementById("score");
const worldElement = document.getElementById("world");
const downButton = document.getElementById("down");
const upButton = document.getElementById("up");
const newGameButton = document.getElementById("new-game");

const render = (world) => {
  const tbody = document.createElement("tbody");

  world.forEach((row) => {
    const tr = document.createElement("tr");
    row.forEach((cell) => {
      const td = document.createElement("td");
      td.textContent = cell;
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  const table = document.createElement("table");
  table.appendChild(tbody);

  worldElement.innerHTML = "";
  worldElement.appendChild(table);
};

let interval;
let ticks = 0;

const start = () => {
  let world = World.empty();

  const move = (direction) => {
    world = world.move(direction);
    checkGameOVer();
    render(world.show());
  };

  const moveDown = () => {
    move("DOWN");
  };
  const moveUp = () => {
    move("UP");
  };

  const onKeyDown = ({ code }) => {
    if (code === DOWN) {
      moveDown();
    }
    if (code === UP) {
      moveUp();
    }
  };

  const reset = () => {
    ticks = 0;
    window.clearInterval(interval);
    document.body.removeEventListener("keydown", onKeyDown);
    downButton.removeEventListener("click", moveDown);
    upButton.removeEventListener("click", moveUp);
  };

  reset();

  const checkGameOVer = () => {
    if (world.hasCollision()) {
      reset();
    }
  };

  const startLevel = (intervalTimeout) => {
    levelElement.textContent = `Level ${Math.floor(ticks / LEVEL_SIZE) + 1}`;

    interval = window.setInterval(() => {
      ticks++;
      scoreElement.textContent = `${ticks}`;

      world = world.move("FORWARD");
      checkGameOVer();
      render(world.show());

      if (!world.hasCollision() && ticks % LEVEL_SIZE === 0) {
        window.clearInterval(interval);
        startLevel(intervalTimeout * LEVEL_FACTOR);
      }
    }, intervalTimeout);
  };
  startLevel(INTERVAL_TIMEOUT);

  document.body.addEventListener("keydown", onKeyDown);
  downButton.addEventListener("click", moveDown);
  upButton.addEventListener("click", moveUp);

  render(world.show());
};

window.onload = () => {
  newGameButton.addEventListener("click", () => {
    start();
  });
};
