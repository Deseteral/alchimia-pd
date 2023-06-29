const keyMap = {
  up: playdate.kButtonUp,
  down: playdate.kButtonDown,
  left: playdate.kButtonLeft,
  right: playdate.kButtonRight,
  a: playdate.kButtonA,
  b: playdate.kButtonB,
};

type Keys = 'up' | 'down' | 'left' | 'right' | 'a' | 'b';

abstract class Input {
  static getKey(key: Keys): boolean {
    return playdate.buttonIsPressed(keyMap[key]);
  }

  static getKeyDown(key: Keys): boolean {
    return playdate.buttonJustPressed(keyMap[key]);
  }
}

export { Input, Keys };
