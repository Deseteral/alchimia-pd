require('CoreLibs/object');

import { Stage } from 'src/engine/stage';

abstract class Engine {
  static activeStage: (Stage | null) = null;

  static readonly width = 400;
  static readonly height = 240;

  static ticks: number = 0;
  static shouldCountTicks: boolean = true;

  static changeStage(nextStage: Stage): void {
    this.activeStage?.onDestroy();
    this.activeStage = nextStage;
    this.activeStage.onActivate();
  }
}

export { Engine };
