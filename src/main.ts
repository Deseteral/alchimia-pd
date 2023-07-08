require('prelude');

import { Engine } from 'src/engine/engine';
import { Textures } from 'src/engine/textures';
import { MainMenuStage } from 'src/main-menu-stage';

(function main() {
  Textures.loadTextures();

  const initialStage = new MainMenuStage();
  Engine.changeStage(initialStage);
}());

playdate.update = () => {
  playdate.graphics.clear(Engine.secondaryColor);
  playdate.graphics.setColor(Engine.primaryColor);

  const stage = Engine.activeStage!;
  stage.update();
  stage.render();

  if (Engine.shouldCountTicks) Engine.ticks += 1;
};
