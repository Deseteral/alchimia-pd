require('CoreLibs/object');

import { Stage } from 'src/engine/stage';

class MainMenuStage extends Stage {
  onActivate(): void {
    console.log('onActivate');
  }

  update(): void {
    console.log('update');
  }

  render(): void {
    console.log('render');
  }

  onDestroy(): void {
    console.log('onDestroy');
  }
}

export { MainMenuStage };
