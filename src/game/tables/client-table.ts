import { Engine } from 'src/engine/engine';
import { Font } from 'src/engine/font';
import { drawFrame } from 'src/engine/frame';
import { Input } from 'src/engine/input';
import { playSound, Sound } from 'src/engine/sounds';
import { Textures } from 'src/engine/textures';
import { newClientMessage } from 'src/game/messages';
import { Recipe } from 'src/game/recipes';
import { Table } from 'src/game/tables/table';
import { randomRange } from 'src/game/utils';

export class ClientTable extends Table {
  nextClientAtTicks: number = Engine.ticks + (10 * 60);

  constructor(onNextTableCb: () => void, onPreviousTableCb: () => void, openBook: () => void) {
    super(onNextTableCb, onPreviousTableCb, openBook);
  }

  update(isSelected: boolean, ticksUntilDayOver: number): void {
    if (Engine.ticks >= this.nextClientAtTicks && ticksUntilDayOver >= 0) {
      const recipeRange: number = (Engine.state.completedOrders <= 3) ? 5 : (Engine.state.recipes.length - 1);
      const recipeIdx: number = randomRange(0, recipeRange);
      const recipe = Engine.state.recipes[recipeIdx];
      Engine.state.orders.push(recipe);

      this.nextClientAtTicks = Engine.ticks + (60 * 10); // I assume the game is running at 60 fps so we can use that to measure time, it's stupid but will be easier to implement pause.

      Engine.state.messageBoard.messages.unshift(newClientMessage(recipe));

      playSound(Sound.NEW_CLIENT);

      console.log('new client with order', recipe);
    }

    if (Input.getKeyDown('right') && isSelected) this.onNextTableCb();
    if (Input.getKeyDown('down') && isSelected) this.openBook();
  }

  render(): void {
    drawFrame(11, 11, 100, 218, () => {
      Font.draw('Orders', 12, 8);

      for (let idx = 0; idx < Engine.state.orders.length; idx += 1) {
        const orderRecipe: Recipe = Engine.state.orders[idx];

        const yy: number = 8 + Font.charHeight + 10 + (idx * (Font.charHeight + 4));
        Font.draw(`-${orderRecipe.name}`, 11, yy);
      }
    });

    const infoFrameX = 11 + 118;
    drawFrame(infoFrameX, 11, 260, 16, () => {
      // Day counter
      const dayMessage = `Day ${Engine.state.day}`;
      Font.draw(dayMessage, infoFrameX, 7);

      // Time counter
      const secondsUnitlNextClient: number = 10 - Math.round((this.nextClientAtTicks - Engine.ticks) / 60);

      for (let tidx = 0; tidx < 10; tidx += 1) {
        const size = 5;
        const xx = infoFrameX + Font.lineLengthPx(dayMessage, false) + 5 + (tidx * (size + 2));
        const yy = 16;
        if (tidx < secondsUnitlNextClient) {
          playdate.graphics.fillRect(xx, yy, size, size);
        } else {
          playdate.graphics.drawRect(xx, yy, size, size);
        }
      }

      // Gold
      // TODO: Make text right-aligned
      Textures.coinTexture.normal.draw(300, 11);
      Font.draw(Engine.state.gold.toString(), 300 + 16 + 2, 7);
    });

    const messageFrameWidth: number = 260;
    drawFrame(11 + 118, 11 + 34, messageFrameWidth, 184, () => {
      let line = 0;
      Engine.state.messageBoard.messages.forEach((message, msgIdx) => {
        const basexx: number = 11 + 118;

        [...message.text].reverse().forEach((txt) => {
          const xx: number = message.rightSide ? (basexx + messageFrameWidth - Font.lineLengthPx(txt, true)) : basexx;
          const yy: number = 215 - (line * Font.charHeightSmall) - (msgIdx * 7);
          Font.draw(txt, xx, yy, true);

          line += 1;
        });
      });
    });
  }
}
