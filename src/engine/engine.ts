require('CoreLibs/object');

import { Stage } from 'src/engine/stage';
import { GameState } from 'src/game/game-state';
import { generateRecipes } from 'src/game/recipes';

abstract class Engine {
  static activeStage: (Stage | null) = null;

  static readonly width = 400;
  static readonly height = 240;
  static readonly primaryColor = playdate.graphics.kColorBlack;
  static readonly secondaryColor = playdate.graphics.kColorWhite;

  static state: GameState;

  static ticks: number = 0;
  static shouldCountTicks: boolean = true;

  static changeStage(nextStage: Stage): void {
    this.activeStage?.onDestroy();
    this.activeStage = nextStage;
    this.activeStage.onActivate();
  }

  static saveGame(): void {
    console.log('TODO: saveGame is not implemented');
  }

  static hasSavedData(): boolean {
    console.log('TODO: hasSavedData is not implemented');
    return false;
  }

  static loadGame(): void {
    console.log('TODO: loadGame is not implemented');
  }

  static newGame(): void {
    Engine.state = {
      preparedIngredients: [],
      recipes: generateRecipes(),
      orders: [],
      gold: 0,
      completedOrders: 0,
      messageBoard: { messages: [] },
      day: 0,
      goldLastDay: 0,
      debtPaid: false,
    };
  }
}

export { Engine };
