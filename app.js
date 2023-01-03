// app.js

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const state = {
  blockX: 3,
  blockY: 5,
  blockXOffset: 0,
  blockYOffset: 0,
  starX: 7,
  starY: 3,
  walls: [
    [3, 1, 1, 3, 1, 3, 1, 3, 1, 3, 2],
    [3, 2, 1, 0, 2, 0, 2, 2, 1, 0, 2],
    [2, 2, 3, 1, 2, 1, 0, 1, 0, 2, 2],
    [2, 0, 0, 2, 1, 2, 3, 0, 3, 2, 2],
    [2, 3, 0, 1, 0, 2, 3, 1, 0, 0, 2],
    [3, 2, 2, 1, 1, 0, 2, 1, 2, 3, 2],
    [2, 2, 1, 2, 1, 2, 2, 3, 0, 2, 2],
    [2, 0, 2, 3, 1, 1, 0, 2, 3, 0, 2],
    [2, 3, 0, 0, 2, 2, 3, 0, 2, 3, 2],
    [2, 1, 1, 2, 1, 2, 0, 1, 0 ,2, 2],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
  ],
  keys: {}
};

const handleKeys = (keys, onKeyDown) => {
  const hasActiveKey = keys.reduce((hasKey, currKey) => hasKey || (currKey in state.keys), false);
  if (hasActiveKey) {
    onKeyDown();
    keys.forEach(key => {
      delete state.keys[key];
    })
  }
};

const ANIMATION_DURATION = 250 // ms
let lastTick = 0;
let isAnimating = false;
let animationStart = 0;
let onAnimate = () => {};
let animationEasingFunction = easeInOutQuad;
const update = (tick) => {
  if (isAnimating) {
    const duration = (tick - animationStart);
    if (duration > ANIMATION_DURATION) {
      isAnimating = false;
      state.blockYOffset = 0;
      state.blockXOffset = 0;
      animationStart = undefined;
    } else {
      onAnimate(duration / ANIMATION_DURATION);
    }
  }
  handleKeys([KEY_UP, KEY_W], () => {
    const hasWallBlocking = (state.walls[state.blockY][state.blockX] & WALL_VALUES.TOP) > 0;
    if (!hasWallBlocking && state.blockY > 0) {
      isAnimating = true;
      animationStart = tick;
      onAnimate = (pct) => {
        state.blockYOffset = BLOCK_SIZE - animationEasingFunction(pct) * BLOCK_SIZE;
      }
      state.blockXOffset = 0;
      state.blockYOffset = BLOCK_SIZE;
      state.blockY--;
    }
  });
  handleKeys([KEY_DOWN, KEY_S], () => {
    const hasWallBlocking = (state.walls[state.blockY + 1][state.blockX] & WALL_VALUES.TOP) > 0;
    if (!hasWallBlocking && state.blockY < MAX_BLOCKS - 1) {
      isAnimating = true;
      animationStart = tick;
      onAnimate = (pct) => {
        state.blockYOffset = (animationEasingFunction(pct) * BLOCK_SIZE) - BLOCK_SIZE;
      }
      state.blockXOffset = 0;
      state.blockYOffset = -BLOCK_SIZE;
      state.blockY++;
    }
  });
  handleKeys([KEY_LEFT, KEY_A], () => {
    const hasWallBlocking = (state.walls[state.blockY][state.blockX] & WALL_VALUES.LEFT) > 0;
    if (!hasWallBlocking && state.blockX > 0) {
      isAnimating = true;
      animationStart = tick;
      onAnimate = (pct) => {
        state.blockXOffset = BLOCK_SIZE - (animationEasingFunction(pct) * BLOCK_SIZE);
      }
      state.blockYOffset = 0;
      state.blockXOffset = BLOCK_SIZE;
      state.blockX--;
    }
  });
  handleKeys([KEY_RIGHT, KEY_D], () => {
    const hasWallBlocking = (state.walls[state.blockY][state.blockX + 1] & WALL_VALUES.LEFT) > 0;
    if (!hasWallBlocking && state.blockX < MAX_BLOCKS - 1) {
      isAnimating = true;
      animationStart = tick;
      onAnimate = (pct) => {
        state.blockXOffset = (animationEasingFunction(pct) * BLOCK_SIZE) - BLOCK_SIZE;
      }
      state.blockYOffset = 0;
      state.blockXOffset = -BLOCK_SIZE;
      state.blockX++;
    }
  });

  // detect star collision
  if (state.blockX === state.starX && state.blockY === state.starY) {
    // find a new spot for the star
    state.starX = getRandomRange(0, MAX_BLOCKS - 1);
    state.starY = getRandomRange(0, MAX_BLOCKS - 1);
  }
};

const draw = (tick) => {
  clearBackground(ctx);
  drawWalls(ctx, state.walls);
  drawYellowStar(ctx, state.starX, state.starY);
  drawBlock(ctx, state.blockX, state.blockY, state.blockXOffset, state.blockYOffset);
};

const loop = (tick) => {
  update(tick);
  draw(tick);
  lastTick = tick;
  requestAnimationFrame(loop);
};

const onKeyDown = (e) => {
  state.keys[e.which] = true;
};
const onKeyUp = (e) => {
  delete state.keys[e.which];
};

(function init(){
  console.log('Block Move');
  document.addEventListener('keydown', onKeyDown);
  document.addEventListener('keyup', onKeyUp);
  // add a little buffer for the line width
  canvas.width += 4;
  canvas.height += 4;
  ctx.translate(2, 2);
  requestAnimationFrame(loop);
})()