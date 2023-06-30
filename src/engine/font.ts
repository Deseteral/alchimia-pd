import { Textures } from 'src/engine/textures';

abstract class Font {
  static readonly charWidth = 10;
  static readonly charWidthSmall = 7;
  static readonly charHeight = 20;
  static readonly charHeightSmall = 14;

  static draw(text: string, x: number, y: number, small: boolean = false): void {
    text.split('').forEach((letter, idx) => {
      const w = small ? Font.charWidthSmall : Font.charWidth;
      const h = small ? Font.charHeightSmall : Font.charHeight;
      const sx = (letter.charCodeAt(0) - 32) * w;
      const t = small ? Textures.fontSmallTexture.normal : Textures.fontTexture.normal;

      t.draw((x + (idx * w)), y, playdate.graphics.kImageUnflipped, playdate.geometry.rect.new(sx, 0, w, h));
    });
  }

  static lineLengthPx(text: string, small: boolean): number {
    const w = small ? Font.charWidthSmall : Font.charWidth;
    return text.length * w;
  }
}

export { Font };
