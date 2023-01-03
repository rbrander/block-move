// draw.js

const clearBackground = (ctx) => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};

const drawWalls = (ctx, walls) => {
  // To make it look better, it is best to draw the inactive walls first
  // then draw the active ones on top
  ctx.lineWidth = WALL_LINE_WIDTH;
  ctx.lineCap = 'round';

  // draw an inactive wall (rectangle) for every wall in every cell
  ctx.strokeStyle = INACTIVE_WALL_COLOR;
  for (let y = 0; y < walls.length; y++) {
    for (let x = 0; x < walls[y].length; x++) {
      ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    }
  }

  // draw the active walls
  ctx.strokeStyle = ACTIVE_WALL_COLOR;
  ctx.beginPath();
  for (let y = 0; y < walls.length; y++) {
    for (let x = 0; x < walls[y].length; x++) {
      const cell = walls[y][x];
      // draw top wall
      const hasTopWall = (cell & WALL_VALUES.TOP) > 0; // bit-wise check
      if (hasTopWall) {
        ctx.moveTo(x * BLOCK_SIZE, y * BLOCK_SIZE);
        ctx.lineTo((x + 1) * BLOCK_SIZE, y * BLOCK_SIZE);
      }
      // draw left wall
      const hasLeftWall = (cell & WALL_VALUES.LEFT) > 0; // bit-wise check
      if (hasLeftWall) {
        ctx.moveTo(x * BLOCK_SIZE, y * BLOCK_SIZE);
        ctx.lineTo(x * BLOCK_SIZE, (y + 1) * BLOCK_SIZE);
      }
    }
  }
  ctx.stroke();
};


// Draw a yellow star at a grid cell (starX, starY)
const drawYellowStar = (ctx, starX, starY) => {
  const x = starX * BLOCK_SIZE + HALF_BLOCK_SIZE;
  const y = starY * BLOCK_SIZE + HALF_BLOCK_SIZE;
  const size = HALF_BLOCK_SIZE; // to fit the star in the cell, use half the width

  // Save the current context state
  ctx.save();

  // Translate the context to the center of the star
  ctx.translate(x, y);

  // Set the fill style to yellow
  ctx.fillStyle = 'yellow';

  // Begin drawing the star
  ctx.beginPath();

  // Move to the first point of the star
  ctx.moveTo(0, -size / 2);

  // Draw the lines of the star
  for (let i = 0; i < 5; i++) {
    ctx.rotate((Math.PI / 180) * 144);
    ctx.lineTo(0, -size / 2);
  }

  // Fill the star
  ctx.fill();

  // Restore the context state
  ctx.restore();
};


const drawBlock = (ctx, blockX, blockY, blockXOffset, blockYOffset) => {
  // draw the active block
  const padding = 5;
  ctx.fillStyle = '#cccccc';
  ctx.fillRect(blockX * BLOCK_SIZE + blockXOffset + padding, blockY * BLOCK_SIZE + blockYOffset + padding, BLOCK_SIZE - (padding * 2), BLOCK_SIZE - (padding * 2));
};
