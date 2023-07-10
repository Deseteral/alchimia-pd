require('CoreLibs/nineslice');

export function drawFrame(x: number, y: number, w: number, h: number, clippingRegion: () => void): void {
  const patchSize = 9;

  const slice = playdate.graphics.nineSlice.new('images/frame', patchSize, patchSize, patchSize, patchSize);
  slice.drawInRect(x - patchSize, y - patchSize, w + patchSize * 2, h + patchSize * 2);

  // Clipping content inside
  playdate.graphics.setScreenClipRect(x, y, w, h);
  clippingRegion();
  playdate.graphics.clearClipRect();
}
