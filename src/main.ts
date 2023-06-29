require('CoreLibs/object');

import { Engine } from 'src/engine/engine';
import { Input } from 'src/engine/input';
import { MainMenuStage } from 'src/main-menu-stage';

(function main() {
  const initialStage = new MainMenuStage();
  Engine.changeStage(initialStage);
}());

playdate.update = () => {
  const stage = Engine.activeStage!;
  stage.update();
  stage.render();

  if (Engine.shouldCountTicks) Engine.ticks += 1;
};
