const DOWN = "ArrowDown";
const UP = "ArrowUp";

const worldElement = document.getElementById("world");
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

  const onKeyDown = ({ code }) => {
    if (code === DOWN) {
      world = world.move("DOWN");
      checkGameOVer();
      render(world.show());
    }
    if (code === UP) {
      world = world.move("UP");
      checkGameOVer();
      render(world.show());
    }
  };

  const reset = () => {
    window.clearInterval(interval);
    document.body.removeEventListener("keydown", onKeyDown);
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

  document.body.removeEventListener("keydown", onKeyDown);
  document.body.addEventListener("keydown", onKeyDown);

  render(world.show());
};

window.onload = () => {
  newGameButton.addEventListener("click", () => {
    start();
  });
};
