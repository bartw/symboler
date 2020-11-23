const ROWS = 10;
const COLUMNS = 20;

const TEXTURES = {
  neutral: "_",
  player: "$",
  enemies: ["#", "@", "&"],
};

const DIFFICULTY_TEXTURES = [
  ...Array.from(new Array(TEXTURES.enemies.length * 10)).map(() => TEXTURES.neutral),
  ...TEXTURES.enemies,
];

const aTexture = () => DIFFICULTY_TEXTURES[Math.floor(Math.random() * DIFFICULTY_TEXTURES.length)];

class World {
  constructor(map, player) {
    this._map = map;
    this._player = player;
  }

  static empty() {
    const emptyMap = Array.from(new Array(ROWS)).map(() => Array.from(new Array(COLUMNS)).map(() => TEXTURES.neutral));
    const playerStart = ROWS - 2;
    return new World(emptyMap, playerStart);
  }

  show() {
    return this._map.map((row, rowIndex) =>
      row.map((cell, columnIndex) => (columnIndex === 1 && rowIndex === this._player ? TEXTURES.player : cell))
    );
  }

  move(direction) {
    if (direction === "DOWN") {
      return new World(this._map, this._player === ROWS - 1 ? ROWS - 1 : this._player + 1);
    }
    if (direction === "UP") {
      return new World(this._map, this._player === 0 ? 0 : this._player - 1);
    }
    if (direction === "FORWARD") {
      const tickedMap = this._map.map((row) => [...row.slice(1), aTexture()]);
      return new World(tickedMap, this._player);
    }
    return this;
  }
}

if (typeof window === "undefined") {
  module.exports = World;
}
