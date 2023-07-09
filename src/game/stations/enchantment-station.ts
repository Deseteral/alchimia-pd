import { Engine } from 'src/engine/engine';
import { Font } from 'src/engine/font';
import { drawFrame } from 'src/engine/frame';
import { Input, Keys } from 'src/engine/input';
import { playSound, Sound } from 'src/engine/sounds';
import { Textures } from 'src/engine/textures';
import { IngredientAction } from 'src/game/ingredients';
import { Station, StationCompleteCallback } from 'src/game/stations/station';
import { clamp, randomRange } from 'src/game/utils';

interface Note {
  dir: number,
  pos: number,
  hit: boolean,
  counted: boolean,
}

// TODO: Add particle effect when hitting the right note

export class EnchantmentStation extends Station {
  readonly noteSize = 32;
  readonly hitLineX = 30 + Math.floor(this.noteSize / 2);

  noteSpeed: number = 3;
  notes: Note[] = [];

  ticksToNextNote: number = 0;

  progress: number = 0;

  constructor(cb: StationCompleteCallback) {
    super(cb);
  }

  update(): void {
    this.ticksToNextNote -= 1;

    // Move notes
    for (let idx = 0; idx < this.notes.length; idx += 1) {
      this.notes[idx].pos -= this.noteSpeed;
    }

    // Check if note is hit
    ['up', 'right', 'down', 'left'].forEach((kp, ki) => {
      if (Input.getKeyDown(kp as Keys)) {
        let noteWasHit: boolean = false;

        for (let idx = 0; idx < this.notes.length; idx += 1) {
          const note = this.notes[idx];

          if (note.dir !== ki) continue;

          if (this.hitLineX >= note.pos && this.hitLineX <= (note.pos + this.noteSize)) {
            this.notes[idx].hit = true;
            this.notes[idx].counted = true;
            noteWasHit = true;
            this.progress += 0.1;
            playSound(Sound.SPELL);
          }
        }

        // When the key was pressed but the note was not hit
        if (!noteWasHit) {
          this.progress -= 0.1;
          playSound(Sound.SPELL_BAD);
        }
      }
    });

    // Check for missed notes
    for (let idx = 0; idx < this.notes.length; idx += 1) {
      const note = this.notes[idx];

      if ((note.pos + this.noteSize + 5) < (this.hitLineX - 10) && !note.hit && !note.counted) {
        this.progress -= 0.1;
        note.counted = true;
      }
    }

    // Normalize progress value
    this.progress = clamp(this.progress, 0, 1);

    // Add new notes
    if (this.ticksToNextNote <= 0) {
      this.notes.push({ dir: randomRange(0, 3), pos: (Engine.width + this.noteSize), hit: false, counted: false });
      this.ticksToNextNote = randomRange(30, 80);
    }

    // Removed old notes
    this.notes = this.notes.filter((note) => (note.pos > -this.noteSize || !note.counted));

    // Check for winning condition
    if (this.progress >= 1) this.onStationCompleteCallback(true, IngredientAction.ENCHANTING);
    if (Input.getKeyDown('b')) this.onStationCompleteCallback(false, IngredientAction.ENCHANTING);
  }

  render(): void {
    const noteBarX = this.hitLineX - Math.floor(this.noteSize / 2);
    const noteBarY = 15;

    // Clear background
    const clearHeight = noteBarY + (4 * (this.noteSize + 5));

    playdate.graphics.setColor(Engine.secondaryColor);
    playdate.graphics.fillRect(0, 0, Engine.width, clearHeight);

    playdate.graphics.setColor(Engine.primaryColor);
    playdate.graphics.fillRect(0, clearHeight, Engine.width, 1);

    // Progress bar
    const progressBarY = 5;
    const progressBarHeight = 5;

    playdate.graphics.drawRect(5, progressBarY, 100, progressBarHeight);
    playdate.graphics.fillRect(5, progressBarY, Math.floor(100 * this.progress), progressBarHeight);

    // Hit line
    const hitLineY = (progressBarY + progressBarHeight + 1);
    playdate.graphics.fillRect(this.hitLineX, hitLineY, 1, (clearHeight - hitLineY - 1));

    // Notes
    this.notes.forEach((note) => {
      if (note.hit) return;

      const nx = Math.floor(note.pos);
      const ny = noteBarY + (note.dir * (this.noteSize + 5));

      if (note.dir === 0) {
        Textures.enchantingKeyUpTexture.inverted.draw(nx, ny);
      } else if (note.dir === 1) {
        Textures.enchantingKeyRightTexture.inverted.draw(nx, ny);
      } else if (note.dir === 2) {
        Textures.enchantingKeyDownTexture.inverted.draw(nx, ny);
      } else if (note.dir === 3) {
        Textures.enchantingKeyLeftTexture.inverted.draw(nx, ny);
      }
    });

    // Note bar
    Textures.enchantingKeyUpTexture.normal.draw(noteBarX, noteBarY + (0 * (this.noteSize + 5)));
    Textures.enchantingKeyRightTexture.normal.draw(noteBarX, noteBarY + (1 * (this.noteSize + 5)));
    Textures.enchantingKeyDownTexture.normal.draw(noteBarX, noteBarY + (2 * (this.noteSize + 5)));
    Textures.enchantingKeyLeftTexture.normal.draw(noteBarX, noteBarY + (3 * (this.noteSize + 5)));

    // Help
    const helpWidth = 270;
    const helpX = 9 + 2;
    const helpY = 180;
    drawFrame(helpX, helpY, helpWidth, 26, () => {
      Font.draw("Press the proper key when it's passing", helpX, helpY, true);
      Font.draw('the line to enchant the ingredient', helpX, helpY + 12, true);
    });
  }
}
