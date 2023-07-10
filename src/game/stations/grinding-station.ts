require('CoreLibs/ui');

import { Engine } from 'src/engine/engine';
import { Font } from 'src/engine/font';
import { drawFrame } from 'src/engine/frame';
import { Input } from 'src/engine/input';
import { playSound, Sound } from 'src/engine/sounds';
import { Textures } from 'src/engine/textures';
import { IngredientAction } from 'src/game/ingredients';
import { Station, StationCompleteCallback } from 'src/game/stations/station';

export class GrindingStation extends Station {
  positionX = 150;
  positionY = 80;
  radius = this.positionY - 5;
  targets = [0, 45, 90, 135, 180];
  previousTargetHit: number = -1;
  progress = 0;

  progressDrawRadius = 0;

  constructor(cb: StationCompleteCallback) {
    super(cb);
    playdate.ui.crankIndicator.start();
  }

  update(): void {
    const deg = playdate.getCrankPosition();
    const value = Math.abs(Math.floor(deg));

    let targetHit: boolean = false;
    const offsetDeg = 5;

    for (let idx = 0; idx < this.targets.length; idx += 1) {
      const target = this.targets[idx];
      if (target === this.previousTargetHit) continue;

      targetHit = (value >= (target - offsetDeg) && value <= (target + offsetDeg));
      if (targetHit) {
        this.previousTargetHit = target;
        break;
      }
    }

    // TODO: Check if pointer is within circle

    if (targetHit) {
      // Move current target to the back of array
      const firstElement = this.targets.shift()!;
      this.targets.push(firstElement);

      this.progress += 0.03; // TODO: Randomize progress value

      playSound(Sound.KNIFE);
    }

    if (this.progress >= 1) this.onStationCompleteCallback(true, IngredientAction.GRIDING);
    if (Input.getKeyDown('b')) this.onStationCompleteCallback(false, IngredientAction.GRIDING);
  }

  render(): void {
    if (playdate.isCrankDocked()) {
      playdate.ui.crankIndicator.update();
    }

    const xx = this.positionX - 70;
    const yy = this.positionY - 70;

    drawFrame(xx, yy, 140, 140, () => {
      Textures.circleTexture.inverted.draw(xx, yy);
      Textures.circleTexture.normal.draw(xx, yy);

      // Progress fill
      this.progressDrawRadius += ((this.progress * (this.radius - 3)) - this.progressDrawRadius) * 0.1;

      playdate.graphics.fillCircleInRect(
        this.positionX - this.progressDrawRadius,
        this.positionY - this.progressDrawRadius,
        this.progressDrawRadius * 2,
        this.progressDrawRadius * 2,
      );
    });

    const helpWidth = 150;
    const helpX = Engine.width - helpWidth - 9 - 2;
    drawFrame(helpX, yy, helpWidth, 26, () => {
      Font.draw('Turn the crank to', helpX, yy, true);
      Font.draw('grind the ingredient', helpX, yy + 12, true);
    });
  }
}
