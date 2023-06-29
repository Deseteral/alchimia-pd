import { Engine } from 'src/engine/engine';
import { Input } from 'src/engine/input';

(function main() {
}());

playdate.update = () => {
  if (Engine.shouldCountTicks) Engine.ticks += 1;
};
