const World = require("../public/World");

console.log("Running the tests...");

const runTest = (description, test) => {
  console.log(description);

  try {
    test();
    console.log("succeeded");
  } catch ({ message, actual, expected }) {
    console.log("failed");
    if (actual) {
      console.log("actual");
      console.log(actual);
    }
    if (expected) {
      console.log("expected");
      console.log(expected);
    }
    if (message && message.length) {
      console.log("message", message);
      console.log(message);
    }
  }
};

assertWorld = (actual, expected) => {
  if (actual.length !== expected.length) {
    throw new Error(`Actual has ${actual.length} rows but expected has ${expected.length} rows.`);
  }

  if (actual.some((columns, rowIndex) => columns.length !== expected[rowIndex].length)) {
    throw new Error(`The dimensions of actual and expected are not the same.`);
  }

  actual.forEach((columns, rowIndex) =>
    columns.forEach((cell, columnIndex) => {
      if (cell !== expected[rowIndex][columnIndex]) {
        throw new Error(
          `Actual at [${rowIndex}][${columnIndex}] is ${cell} but expected at [${rowIndex}][${columnIndex}] is ${expected[rowIndex][columnIndex]}`
        );
      }
    })
  );
};

const anEmptyWorld = () => [
  ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"],
  ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"],
  ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"],
  ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"],
  ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"],
  ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"],
  ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"],
  ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"],
  ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"],
  ["_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_", "_"],
];

runTest("a new world consists of only empty textures and the player at the start position", () => {
  const expected = anEmptyWorld();
  expected[8][1] = "$";

  const world = World.empty();
  const actual = world.show();

  assertWorld(actual, expected);
});

runTest("move DOWN moves the player visually one row down", () => {
  const expected = anEmptyWorld();
  expected[9][1] = "$";

  const world = World.empty().move("DOWN");
  const actual = world.show();

  assertWorld(actual, expected);
});

runTest("move UP moves the player visually one row up", () => {
  const expected = anEmptyWorld();
  expected[7][1] = "$";

  const world = World.empty().move("UP");
  const actual = world.show();

  assertWorld(actual, expected);
});

runTest("move DOWN stops at the edge", () => {
  const expected = anEmptyWorld();
  expected[9][1] = "$";

  let world = World.empty().move("DOWN");
  assertWorld(world.show(), expected);

  world = world.move("DOWN");
  assertWorld(world.show(), expected);
});

runTest("move UP stops at the edge", () => {
  const expected = anEmptyWorld();
  expected[0][1] = "$";

  let world = World.empty().move("UP").move("UP").move("UP").move("UP").move("UP").move("UP").move("UP").move("UP");
  assertWorld(world.show(), expected);

  world = world.move("UP");
  assertWorld(world.show(), expected);
});

runTest("move FORWARD does not change the player position", () => {
  const expected = anEmptyWorld();
  expected[8][1] = "$";

  let world = World.empty();
  assertWorld(world.show(), expected);

  world = world.move("FORWARD");
  assertWorld(world.show(), expected);

  world = world.move("FORWARD");
  assertWorld(world.show(), expected);
});

runTest("move FORWARD moves all columns to the left", () => {
  const aWorld = (column) => {
    const w = anEmptyWorld();

    Array.from(new Array(10)).forEach((_, row) => {
      w[row][column] = "@";
    });

    return w;
  };

  const w1 = aWorld(19);
  let world = new World(JSON.parse(JSON.stringify(w1)), 8);

  w1[8][1] = "$";
  assertWorld(world.show(), w1);

  const w2 = aWorld(18);
  world = world.move("FORWARD");

  w2[8][1] = "$";
  assertWorld(world.show(), w2);

  const w3 = aWorld(17);
  world = world.move("FORWARD");

  w3[8][1] = "$";
  assertWorld(world.show(), w3);
});
