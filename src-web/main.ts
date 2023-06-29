import { Engine } from 'src/engine/engine';
import { Input } from 'src/engine/input';
import { preloadSounds } from 'src/engine/sounds';
import { Textures } from 'src/engine/textures';
import { MainMenuStage } from 'src/main-menu-stage';

const canvas: HTMLCanvasElement = document.querySelector('canvas')!;
const context: CanvasRenderingContext2D = canvas.getContext('2d')!;

function tick(): void {
  context.fillStyle = Engine.secondaryColor;
  context.fillRect(0, 0, Engine.width, Engine.height);
  context.fillStyle = Engine.primaryColor;
  context.strokeStyle = Engine.primaryColor;

  const stage = Engine.activeStage!;
  stage.update();
  stage.render(context);
}

(async function main(): Promise<void> {

  preloadSounds();
  await Textures.loadTextures();

  const initialStage = new MainMenuStage();
  Engine.changeStage(initialStage);

  tick();
}());
