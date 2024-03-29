import { Engine } from 'src/engine/engine';
import { Font } from 'src/engine/font';
import { drawFrame } from 'src/engine/frame';
import { Input } from 'src/engine/input';
import { Stage } from 'src/engine/stage';
import { WorkshopStage } from 'src/game/workshop-stage';

export class DaySummaryStage extends Stage {
  onActivate(): void {
  }

  update(): void {
    if (Input.getKeyDown('a')) {
      Engine.changeStage(new WorkshopStage());
    }
  }

  render(): void {
    const w = 230;
    const h = 172;
    const x = (Engine.width - w) / 2;
    const y = 10;

    drawFrame(x, y, w, h, () => {
      Font.draw(`Day ${Engine.state.day} completed!`, x, y);

      Font.draw(`You have earned ${Engine.state.goldLastDay} gold today`, x, y + 40, true);
      Font.draw(`Total gold: ${Engine.state.gold}`, x, y + 50 + 15, true);
      Font.draw(`Total orders handled: ${Engine.state.completedOrders}`, x, y + 50 + 15 * 2, true);

      if (Engine.state.debtPaid) {
        Font.draw("You've paid your debt!", x, y + 50 + 15 * 4, true);
      } else {
        Font.draw(`You still have to pay ${500 - Engine.state.gold} gold`, x, y + 50 + 15 * 4, true);
        Font.draw('to pay off the debt', x, y + 50 + 15 * 5, true);
      }

      Font.draw('Press A to continue', x, y + 50 + 15 * 7, true);
    });
  }

  onDestroy(): void {
  }
}
