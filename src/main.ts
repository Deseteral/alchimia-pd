require('CoreLibs/timer');
require('CoreLibs/object');

require('game/utils');
require('game/tables/table');
require('game/tables/brewing-table');
require('game/tables/client-table');
require('game/tables/ingredients-table');
require('game/stations/station');
require('game/stations/cutting-station');
require('game/stations/burning-station');
require('game/stations/enchantment-station');
require('game/stations/grinding-station');
require('how-to-play-stage');
require('main-menu-stage');
require('story-stage');
require('engine/engine');
require('engine/font');
require('engine/frame');
require('engine/input');
require('engine/sounds');
require('engine/stage');
require('engine/textures');
require('game/game-state');
require('game/ingredients');
require('game/message-board');
require('game/messages');
require('game/potion-names');
require('game/recipe-logic');
require('game/recipes');
require('game/workshop-stage');
require('day-summary-stage');

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

  playdate.timer.updateTimers();
};
