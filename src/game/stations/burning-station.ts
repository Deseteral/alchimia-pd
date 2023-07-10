import { Engine } from 'src/engine/engine';
import { Font } from 'src/engine/font';
import { drawFrame } from 'src/engine/frame';
import { Input } from 'src/engine/input';
import { IngredientAction } from 'src/game/ingredients';
import { Station, StationCompleteCallback } from 'src/game/stations/station';
import { clamp, randomRange } from 'src/game/utils';

export class BurningStation extends Station {
  readonly barHeight = 150;
  readonly cursorHeight = 30;
  cursorY = 0;

  targetY = this.randomNextTargetY();
  nextTargetY = this.randomNextTargetY();
  ticksToNextTarget = 50;

  progress = 0;

  constructor(cb: StationCompleteCallback) {
    super(cb);
    playdate.ui.crankIndicator.start();
  }

  randomNextTargetY(): number {
    return Math.floor(randomRange(0, this.barHeight));
  }

  update(): void {
    // const cursorSpeed = 2;
    const gravity = 1;
    const progressSpeed = 0.004;
    const progressDrain = (progressSpeed / 2);

    this.ticksToNextTarget -= 1;

    // Move cursor
    const cursorSpeed = playdate.getCrankChange()[0] * 0.2;
    this.cursorY += cursorSpeed;

    this.cursorY -= gravity;
    this.cursorY = clamp(this.cursorY, 0, (this.barHeight - this.cursorHeight));

    // Move target to it's next position
    this.targetY += (this.nextTargetY - this.targetY) * 0.1;

    // Check if target is within cursor's range
    if (this.targetY >= this.cursorY && this.targetY <= (this.cursorY + this.cursorHeight)) {
      this.progress += progressSpeed;
    } else {
      this.progress -= progressDrain;
    }

    this.progress = clamp(this.progress, 0, 1);

    // Determine target's next position
    if (this.ticksToNextTarget <= 0) {
      this.nextTargetY = this.randomNextTargetY();
      this.ticksToNextTarget = randomRange(60, 4 * 60);
    }

    // Winning condition
    if (this.progress >= 1) this.onStationCompleteCallback(true, IngredientAction.BURNING);
    if (Input.getKeyDown('b')) this.onStationCompleteCallback(false, IngredientAction.BURNING);
  }

  render(): void {
    if (playdate.isCrankDocked()) {
      playdate.ui.crankIndicator.update();
    }

    const x = 140;
    const y = 28;
    const w = 20;

    drawFrame(x, y, w * 3, this.barHeight, () => {
      // Frame
      playdate.graphics.drawRect(x, y, w, this.barHeight);

      // Cursor
      const drawCursorY = Math.floor(y + (this.barHeight - this.cursorY - this.cursorHeight));
      playdate.graphics.fillRect(x, drawCursorY, w, this.cursorHeight);

      // Target
      const drawTargetY = (y + (this.barHeight - this.targetY));
      playdate.graphics.fillRect(x + w + 1, drawTargetY, 5, 1);

      // Progress bar
      const progressPx = Math.floor(this.progress * this.barHeight);
      playdate.graphics.drawRect(x + (w * 2), y, Math.floor(w / 3), this.barHeight);
      playdate.graphics.fillRect(x + (w * 2), (y + this.barHeight - progressPx), Math.floor(w / 3), progressPx);
    });

    // Help
    const helpWidth = 170;
    const helpX = Engine.width - helpWidth - 9 - 2;
    drawFrame(helpX, y, helpWidth, 50, () => {
      Font.draw('Turn the crank to move', helpX, y, true);
      Font.draw('burning zone up. Keep', helpX, y + 12, true);
      Font.draw('the cursor in the zone', helpX, y + 12 * 2, true);
      Font.draw('to burn the ingredient.', helpX, y + 12 * 3, true);
    });
  }
}
