// utils.js

function getRandomRange(start, end) {
  return Math.floor(Math.random() * (end - start + 1)) + start;
}


/*
original function from https://easings.net/#easeInOutQuad
const easeInOutQuad = (x) =>
  (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
*/

let cache = {};
const easeInOutQuad = (x) => {
  if (cache[x] !== undefined) {
    return cache[x];
  }
  const result = x < 0.5 ? 2 * x * x : 1 - (2 * (1 - x) * (1 - x)) / 2;
  cache[x] = result;
  return result;
};
const easeOutElastic = (x) => {
  if (cache[x] !== undefined) {
    return cache[x];
  }
  const c4 = (2 * Math.PI) / 3;
  const result = x === 0
    ? 0
    : x === 1
    ? 1
    : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
  cache[x] = result;
  return result;
}
function easeOutBounce(x) {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (x < 1 / d1) {
      return n1 * x * x;
  } else if (x < 2 / d1) {
      return n1 * (x -= 1.5 / d1) * x + 0.75;
  } else if (x < 2.5 / d1) {
      return n1 * (x -= 2.25 / d1) * x + 0.9375;
  } else {
      return n1 * (x -= 2.625 / d1) * x + 0.984375;
  }
}

