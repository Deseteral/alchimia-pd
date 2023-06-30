import { Stage } from 'src/engine/stage';
import { GameState } from 'src/game/game-state';
import { generateRecipes } from 'src/game/recipes';

export abstract class Engine {
  static saveGame(): void {
    try {
      window.localStorage.setItem('save', JSON.stringify(Engine.state));
      console.log('saved game');
    } catch (e) {
      console.log('cannot save game');
    }
  }

  static hasSavedData(): boolean {
    try {
      const data = window.localStorage.getItem('save');
      return !!data;
    } catch (e) {
      return false;
    }
  }

  static loadGame(): void {
    try {
      const data = window.localStorage.getItem('save');
      if (!data) throw new Error('no save data');

      Engine.state = JSON.parse(data);
      console.log('loaded game');
    } catch (e) {
      console.log('cannot load game game');
    }
  }

}
