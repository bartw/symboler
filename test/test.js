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
  if (actual !== expected) {
    const error = new Error();
    error.actual = actual;
    error.expected = expected;
    throw error;
  }
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
  const aWorld = anEmptyWorld();
  aWorld[8][1] = "$";
  const expected = JSON.stringify(aWorld);

  const world = World.empty();
  const actual = JSON.stringify(world.show());

  assertWorld(actual, expected);
});

runTest("move DOWN moves the player visually one row down", () => {
  const aWorld = anEmptyWorld();
  aWorld[9][1] = "$";
  const expected = JSON.stringify(aWorld);

  const world = World.empty().move("DOWN");
  const actual = JSON.stringify(world.show());

  assertWorld(actual, expected);
});

runTest("move UP moves the player visually one row up", () => {
  const aWorld = anEmptyWorld();
  aWorld[7][1] = "$";
  const expected = JSON.stringify(aWorld);

  const world = World.empty().move("UP");
  const actual = JSON.stringify(world.show());

  assertWorld(actual, expected);
});

runTest("move DOWN stops at the edge", () => {
  const aWorld = anEmptyWorld();
  aWorld[9][1] = "$";
  const expected = JSON.stringify(aWorld);

  let world = World.empty().move("DOWN");
  assertWorld(JSON.stringify(world.show()), expected);

  world = world.move("DOWN");
  assertWorld(JSON.stringify(world.show()), expected);
});

runTest("move UP stops at the edge", () => {
  const aWorld = anEmptyWorld();
  aWorld[0][1] = "$";
  const expected = JSON.stringify(aWorld);

  let world = World.empty().move("UP").move("UP").move("UP").move("UP").move("UP").move("UP").move("UP").move("UP");
  assertWorld(JSON.stringify(world.show()), expected);

  world = world.move("UP");
  assertWorld(JSON.stringify(world.show()), expected);
});

runTest("tick does not change the player position", () => {
  const aWorld = anEmptyWorld();
  aWorld[8][1] = "$";
  const expected = JSON.stringify(aWorld);

  let world = World.empty();
  assertWorld(JSON.stringify(world.show()), expected);

  world = world.tick();
  assertWorld(JSON.stringify(world.show()), expected);

  world = world.tick();
  assertWorld(JSON.stringify(world.show()), expected);
});

runTest("tick moves all columns to the left", () => {
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
  let expected = JSON.stringify(w1);
  assertWorld(JSON.stringify(world.show()), expected);

  const w2 = aWorld(18);
  world = world.tick();

  w2[8][1] = "$";
  expected = JSON.stringify(w2);
  assertWorld(JSON.stringify(world.show()), expected);

  const w3 = aWorld(17);
  world = world.tick();

  w3[8][1] = "$";
  expected = JSON.stringify(w3);
  assertWorld(JSON.stringify(world.show()), expected);
});
