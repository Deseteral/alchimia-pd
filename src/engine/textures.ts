const tableUrl = 'table';
const burningUrl = 'burning';
const cuttingUrl = 'cutting';
const enchantingUrl = 'enchanting';
const grindingUrl = 'grinding';
const enchantingKeyUpUrl = 'enchanting_keyup';
const enchantingKeyRightUrl = 'enchanting_keyright';
const enchantingKeyDownUrl = 'enchanting_keydown';
const enchantingKeyLeftUrl = 'enchanting_keyleft';
const cauldronUrl = 'cauldron';
const frameUrl = 'frame';
const bubbleSmallUrl = 'bubble_small';
const bubbleLargeUrl = 'bubble_large';
const fireUrl = 'fire';
const flowerUrl = 'flower';
const herbUrl = 'herb';
const knifeUrl = 'knife';
const mortarUrl = 'mortar';
const mushroomUrl = 'mushroom';
const spellUrl = 'spell';
const stoneUrl = 'stone';
const xUrl = 'x';
const bookUrl = 'book';
const listPointerRightUrl = 'list_pointer_right';
const coinUrl = 'coin';
const circleUrl = 'circle';
const menuLogoUrl = 'menu_logo';
const fontUrl = 'font';
const fontSmallUrl = 'font_small';

interface Texture {
  normal: playdate.Image,
  inverted: playdate.Image,
}

abstract class Textures {
  static burningTexture: Texture;
  static cuttingTexture: Texture;
  static enchantingTexture: Texture;
  static grindingTexture: Texture;
  static tableTexture: Texture;
  static enchantingKeyUpTexture: Texture;
  static enchantingKeyRightTexture: Texture;
  static enchantingKeyDownTexture: Texture;
  static enchantingKeyLeftTexture: Texture;
  static cauldronTexture: Texture;
  static frameTexture: Texture;
  static bubbleSmallTexture: Texture;
  static bubbleLargeTexture: Texture;
  static fireTexture: Texture;
  static flowerTexture: Texture;
  static herbTexture: Texture;
  static knifeTexture: Texture;
  static mortarTexture: Texture;
  static mushroomTexture: Texture;
  static spellTexture: Texture;
  static stoneTexture: Texture;
  static xTexture: Texture;
  static bookTexture: Texture;
  static listPointerRightTexture: Texture;
  static coinTexture: Texture;
  static circleTexture: Texture;
  static menuLogoTexture: Texture;
  static fontTexture: Texture;
  static fontSmallTexture: Texture;

  static loadTextures(): void {
    Textures.burningTexture = Textures.load(burningUrl);
    Textures.cuttingTexture = Textures.load(cuttingUrl);
    Textures.enchantingTexture = Textures.load(enchantingUrl);
    Textures.grindingTexture = Textures.load(grindingUrl);
    Textures.tableTexture = Textures.load(tableUrl);
    Textures.enchantingKeyUpTexture = Textures.load(enchantingKeyUpUrl);
    Textures.enchantingKeyRightTexture = Textures.load(enchantingKeyRightUrl);
    Textures.enchantingKeyDownTexture = Textures.load(enchantingKeyDownUrl);
    Textures.enchantingKeyLeftTexture = Textures.load(enchantingKeyLeftUrl);
    Textures.cauldronTexture = Textures.load(cauldronUrl);
    Textures.frameTexture = Textures.load(frameUrl);
    Textures.bubbleSmallTexture = Textures.load(bubbleSmallUrl);
    Textures.bubbleLargeTexture = Textures.load(bubbleLargeUrl);
    Textures.fireTexture = Textures.load(fireUrl);
    Textures.flowerTexture = Textures.load(flowerUrl);
    Textures.herbTexture = Textures.load(herbUrl);
    Textures.knifeTexture = Textures.load(knifeUrl);
    Textures.mortarTexture = Textures.load(mortarUrl);
    Textures.mushroomTexture = Textures.load(mushroomUrl);
    Textures.spellTexture = Textures.load(spellUrl);
    Textures.stoneTexture = Textures.load(stoneUrl);
    Textures.xTexture = Textures.load(xUrl);
    Textures.bookTexture = Textures.load(bookUrl);
    Textures.listPointerRightTexture = Textures.load(listPointerRightUrl);
    Textures.coinTexture = Textures.load(coinUrl);
    Textures.circleTexture = Textures.load(circleUrl);
    Textures.menuLogoTexture = Textures.load(menuLogoUrl);
    Textures.fontTexture = Textures.load(fontUrl);
    Textures.fontSmallTexture = Textures.load(fontSmallUrl);
  }

  private static load(name: string): Texture {
    const normal = playdate.graphics.image.new(`images/${name}`);
    const inverted = normal.invertedImage();
    return { normal, inverted };
  }
}

export { Texture, Textures };
