const DOWN = "ArrowDown";
const UP = "ArrowUp";

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

  interval = window.setInterval(() => {
    world = world.move("FORWARD");
    checkGameOVer();
    render(world.show());
  }, 1000);

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
