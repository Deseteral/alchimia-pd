import { Engine } from 'src/engine/engine';
import { Font } from 'src/engine/font';
import { drawFrame } from 'src/engine/frame';
import { Input } from 'src/engine/input';
import { playSound, Sound } from 'src/engine/sounds';
import { Textures, Texture } from 'src/engine/textures';
import { Ingredient, Ingredients, IngredientAction, ingredientDisplayName } from 'src/game/ingredients';
import { getIngredientIcon } from 'src/game/recipes';
// import { BurningStation } from 'src/game/stations/burning-station';
import { CuttingStation } from 'src/game/stations/cutting-station';
// import { EnchantmentStation } from 'src/game/stations/enchantment-station';
// import { GrindingStation } from 'src/game/stations/grinding-station';
import { Station, StationCompleteCallback } from 'src/game/stations/station';
import { Table } from 'src/game/tables/table';
import { clamp, randomRange } from 'src/game/utils';

export class IngredientsTable extends Table {
  selectedStation: number = 0;
  activeStation: (Station | null) = null;

  isIndredientPickerOpen: boolean = false;
  ingredientCursor: number = 0;

  ignoringInputTicks = 0;

  constructor(onNextTableCb: () => void, onPreviousTableCb: () => void, openBook: () => void) {
    super(onNextTableCb, onPreviousTableCb, openBook);
  }

  update(isSelected: boolean): void {
    if (this.activeStation && isSelected) {
      this.activeStation.update();
      return;
    }

    this.ignoringInputTicks -= 1;

    if (!this.isIndredientPickerOpen && Input.getKeyDown('a') && this.canUseInput(isSelected)) {
      this.isIndredientPickerOpen = true;
      playSound(Sound.MENU_CONFIRM);
      return;
    }

    if (this.isIndredientPickerOpen && isSelected) {
      if (Input.getKeyDown('up')) {
        this.ingredientCursor -= 1;
        playSound(Sound.MENU_PICK);
      }
      if (Input.getKeyDown('down')) {
        this.ingredientCursor += 1;
        playSound(Sound.MENU_PICK);
      }
      if (Input.getKeyDown('b')) {
        this.isIndredientPickerOpen = false;
        this.ingredientCursor = 0;
        return;
      }
      this.ingredientCursor = clamp(this.ingredientCursor, 0, 5 - 1);

      if (Input.getKeyDown('a')) {
        const selectedIngredient: Ingredient = Ingredients[this.ingredientCursor];
        this.ingredientCursor = 0;
        this.isIndredientPickerOpen = false;

        const cb: StationCompleteCallback = (success: boolean, action: IngredientAction) => {
          if (success) {
            const amount = randomRange(1, 2);
            for (let a = 0; a < amount; a += 1) {
              Engine.state.preparedIngredients.push({ ingredient: selectedIngredient, action });
            }

            playSound(Sound.GOOD_POTION);

            console.log(`preparing ingredient successful, receiving ${amount}`);
          }
          this.exitStation();
        };

        if (this.selectedStation === 0) {
          this.activeStation = new CuttingStation(cb);
        } else if (this.selectedStation === 1) {
          // this.activeStation = new GrindingStation(cb);
        } else if (this.selectedStation === 2) {
          // this.activeStation = new BurningStation(cb);
        } else if (this.selectedStation === 3) {
          // this.activeStation = new EnchantmentStation(cb);
        }

        Engine.shouldCountTicks = false;

        playSound(Sound.MENU_CONFIRM);
      }

      return;
    }

    const prevSlectedStation = this.selectedStation;
    if (Input.getKeyDown('right') && this.canUseInput(isSelected)) {
      this.selectedStation += 1;
    }
    if (Input.getKeyDown('left') && this.canUseInput(isSelected)) {
      this.selectedStation -= 1;
    }

    if (this.selectedStation < 0) {
      this.onPreviousTableCb();
    } else if (this.selectedStation > 3) {
      this.onNextTableCb();
    } else if (Input.getKeyDown('down') && this.canUseInput(isSelected)) {
      this.openBook();
    }

    this.selectedStation = clamp(this.selectedStation, 0, 3);
    if (this.selectedStation !== prevSlectedStation) playSound(Sound.MENU_PICK);
  }

  render(): void {
    Textures.tableTexture.normal.draw(0, 0);

    this.drawStation(Textures.cuttingTexture, 10, 40, this.selectedStation === 0);
    this.drawStation(Textures.grindingTexture, 106, 93, this.selectedStation === 1);
    this.drawStation(Textures.burningTexture, 193, 25, this.selectedStation === 2);
    this.drawStation(Textures.enchantingTexture, 305, 100, this.selectedStation === 3);

    if (this.isIndredientPickerOpen) {
      drawFrame(11, 11, 120, 97, () => {
        Ingredients.forEach((ing, idx) => {
          const xx: number = 11;
          const yy: number = 6 + idx * Font.charHeight;
          if (idx === this.ingredientCursor) Textures.listPointerRightTexture.normal.draw(xx, yy + 5);
          getIngredientIcon(ing).draw(xx + 16, yy + 5);
          Font.draw(`${ingredientDisplayName(ing)}`, xx + 16 + 16 + 2, yy + 3);
        });
      });
    }

    if (this.activeStation) this.activeStation.render();
  }

  private drawStation(texture: Texture, x: number, y: number, isSelected: boolean): void {
    const frameOffset = 4;
    if (isSelected) playdate.graphics.drawRect(x - frameOffset, y - frameOffset, texture.normal.width + frameOffset * 2, texture.normal.height + frameOffset * 2);
    texture.normal.draw(x, y);
  }

  private exitStation(): void {
    this.activeStation = null;
    this.ignoringInputTicks = Math.floor(0.5 * 60);
    Engine.shouldCountTicks = true;
  }

  private canUseInput(isSelected: boolean): boolean {
    return this.ignoringInputTicks <= 0 && isSelected;
  }
}
