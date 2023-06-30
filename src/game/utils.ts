// eslint-disable-next-line no-extend-native
function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

function randomRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export { clamp, randomRange };
