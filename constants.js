// constants.js

// Keys
const KEY_W = 87;
const KEY_A = 65;
const KEY_D = 68;
const KEY_S = 83;
const KEY_UP = 38;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_DOWN = 40;

// Blocks
const MAX_BLOCKS = 10; // 10 blocks wide by 10 blocks high
const BLOCK_SIZE = Math.floor(canvas.width / MAX_BLOCKS);
const HALF_BLOCK_SIZE = Math.floor(BLOCK_SIZE / 2);

// Walls
const WALL_VALUES = {
  'TOP': 1,
  'LEFT': 2,
  'BOTH': 3,
  'NONE': 0
};
const INACTIVE_WALL_COLOR = '#333333';
const ACTIVE_WALL_COLOR = 'white';
const WALL_LINE_WIDTH = 4;


