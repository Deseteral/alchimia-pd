/// <reference types="lua-types/5.3" />

/** @noSelf */
declare function print(value: any): void;
/** @noSelf */
declare function printTable(table: AnyTable): void;
/** @noSelf */
declare function require(source: string): void;

declare const kTextAlignment: {
  center: 0;
};

type TextAlignment = typeof kTextAlignment.center;

// JSON
/** @noSelf */
declare namespace json {
  export function decode(string: string): LuaTable;
  export function decodeFile(string: playdate.File): LuaTable;
  export function encode(table: LuaTable): string;
  export function encodePretty(table: LuaTable): string;
  export function encodeToFile(file: playdate.File, table: LuaTable): void;
  export function encodeToFile(
    file: playdate.File,
    pretty: boolean,
    table: LuaTable
  ): void;
}

/** @noSelf */
declare namespace playdate {
  // Worth noting: The `this: void` is essentially the difference between
  // a `x:y` call and a `x.y` in the transpiled output

  // System and Game Metadata
  /** @noSelf */
  export function apiVersion(): [number, number];
  export const metadata: { [key: string]: any };

  // Callbacks
  /** @noSelf */
  export function update(): void;

  // Functions
  /** @noSelf */
  export function wait(milliseconds: number): void;
  /** @noSelf */
  export function stop(): void;
  /** @noSelf */
  export function start(): void;

  // Lifecycle
  /** @noSelf */
  export function gameWillTerminate(): void;
  /** @noSelf */
  export function deviceWillSleep(): void;
  /** @noSelf */
  export function deviceWillLock(): void;
  /** @noSelf */
  export function deviceDidUnlock(): void;
  /** @noSelf */
  export function gameWillPause(): void;
  /** @noSelf */
  export function gameWillResume(): void;

  // Menus
  type MenuItem<T extends number | boolean | string> = {
    value: T;
    setCallback: (callback: () => void) => void;
    setTitle: (title: string) => void;
    getTitle: () => string;
    setValue: (value: T) => void;
    getValue: () => T;
  };
  type NormalMenuItem = MenuItem<number>;
  type CheckmarkMenuItem = MenuItem<boolean>;
  type OptionsMenuItem = MenuItem<string>;
  type Menu = {
    addMenuItem: (title: string, callback: () => void) => NormalMenuItem;
    addCheckmarkMenuItem(
      title: string,
      callback: (value: boolean) => void
    ): CheckmarkMenuItem | [null, string];
    addCheckmarkMenuItem(
      title: string,
      initialValue: boolean,
      callback: (value: boolean) => void
    ): CheckmarkMenuItem | [null, string];
    addOptionsMenuItem(
      title: string,
      options: string[],
      callback: () => void
    ): OptionsMenuItem | [null, string];
    addOptionsMenuItem(
      title: string,
      options: string[],
      initialValue: string,
      callback: () => void
    ): OptionsMenuItem | [null, string];
    getMenuItems: () => string[];
    removeMenuItem: (menuItem: MenuItem<any>) => void;
    removeAllMenuItems: () => void;
  };
  /** @noSelf */
  export function getSystemMenu(): Menu;
  /** @noSelf */
  export function setMenuImage(image: Image, xOffset?: number): void;

  // Font
  export namespace font {
    const kLanguageEnglish = 1;
    const kLanguageJapanese = 2;
  }

  // Localization
  type Language = typeof font.kLanguageEnglish | typeof font.kLanguageJapanese;
  /** @noSelf */
  export function getSystemLanguage(): Language;

  // Accessibility
  /** @noSelf */
  export function getReduceFlashing(): boolean;
  /** @noSelf */
  export function getFlipped(): boolean;

  // Accelerometer
  /** @noSelf */
  export function startAccelerometer(): void;
  /** @noSelf */
  export function stopAccelerometer(): void;
  /** @noSelf */
  export function readAccelerometer(): LuaMultiReturn<[number, number, number]>;
  /** @noSelf */
  export function accelerometerIsRunning(): boolean;

  // Buttons
  export const kButtonLeft: 1;
  export const kButtonRight: 2;
  export const kButtonUp: 4;
  export const kButtonDown: 8;
  export const kButtonB: 16;
  export const kButtonA: 32;
  export const kButtonMenu: 64;
  export const kButtonLock: 124;

  type Buttons =
    | typeof kButtonLeft
    | typeof kButtonRight
    | typeof kButtonUp
    | typeof kButtonDown
    | typeof kButtonB
    | typeof kButtonA
    | typeof kButtonMenu
    | typeof kButtonLock;
  type ButtonState = number;

  /** @noSelf */
  export function buttonIsPressed(button: Buttons): boolean;
  /** @noSelf */
  export function buttonJustPressed(button: Buttons): boolean;
  /** @noSelf */
  export function buttonJustReleased(button: Buttons): boolean;
  /** @noSelf */
  export function getButtonState(): [ButtonState, ButtonState, ButtonState];

  /** @noSelf */
  export function AButtonDown(): void;
  /** @noSelf */
  export function AButtonHeld(): void;
  /** @noSelf */
  export function AButtonUp(): void;
  /** @noSelf */
  export function BButtonDown(): void;
  /** @noSelf */
  export function BButtonHeld(): void;
  /** @noSelf */
  export function BButtonUp(): void;
  /** @noSelf */
  export function downButtonDown(): void;
  /** @noSelf */
  export function downButtonUp(): void;
  /** @noSelf */
  export function leftButtonDown(): void;
  /** @noSelf */
  export function leftButtonUp(): void;
  /** @noSelf */
  export function rightButtonDown(): void;
  /** @noSelf */
  export function rightButtonUp(): void;
  /** @noSelf */
  export function upButtonDown(): void;
  /** @noSelf */
  export function upButtonUp(): void;

  type InputHandlers = {
    AButtonDown: typeof AButtonDown;
    AButtonHeld: typeof AButtonHeld;
    AButtonUp: typeof AButtonUp;
    BButtonDown: typeof BButtonDown;
    BButtonHeld: typeof BButtonHeld;
    BButtonUp: typeof BButtonUp;
    downButtonDown: typeof downButtonDown;
    downButtonUp: typeof downButtonUp;
    leftButtonDown: typeof leftButtonDown;
    leftButtonUp: typeof leftButtonUp;
    rightButtonDown: typeof rightButtonDown;
    rightButtonUp: typeof rightButtonUp;
    upButtonDown: typeof upButtonDown;
    upButtonUp: typeof upButtonUp;
  };

  // Crank
  /** @noSelf */
  export function isCrankDocked(): boolean;
  /** @noSelf */
  export function getCrankPosition(): number;
  /** @noSelf */
  export function getCrankChange(): number;
  /** @noSelf */
  export function getCrankTicks(ticksPerRevolution: number): number;

  /** @noSelf */
  export function cranked(change: number, acceleratedChange: number): void;
  /** @noSelf */
  export function crankDocked(): void;
  /** @noSelf */
  export function crankUndocked(): void;

  /** @noSelf */
  export function setCrankSoundsDisabled(disabled: boolean): void;

  export namespace inputHandlers {
    /** @noSelf */
    function push(
      handlers: Partial<InputHandlers>,
      maskPreviousHandlers?: boolean
    ): void;
    /** @noSelf */
    function pop(): void;
  }

  // Device Auto Lock
  /** @noSelf */
  export function setAutoLockDisabled(disabled: boolean): void;

  // Date and Time
  type DateTime = {
    year: number;
    month: number;
    day: number;
    weekday: number;
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
  };
  /** @noSelf */
  export function getCurrentTimeMilliseconds(): number;
  /** @noSelf */
  export function resetElapsedTime(): void;
  /** @noSelf */
  export function getElapsedTime(): number;
  /** @noSelf */
  export function getSecondsSinceEpoch(): LuaMultiReturn<[number, number]>;
  /** @noSelf */
  export function getTime(): DateTime;
  /** @noSelf */
  export function getGMTTime(): DateTime;
  /** @noSelf */
  export function epochFromTime(time: DateTime): [number, number];
  /** @noSelf */
  export function epochFromGMTTime(time: DateTime): [number, number];
  /** @noSelf */
  export function timeFromEpoch(seconds: number, millisecond: number): DateTime;
  /** @noSelf */
  export function GMTTimeFromEpoch(
    seconds: number,
    millisecond: number
  ): DateTime;

  // Debugging
  export const argv: string[];
  /** @noSelf */
  export function setNewlinePrinted(flag: boolean): void;
  /** @noSelf */
  export function drawFPS(x: number, y: number): void;
  /** @noSelf */
  export function where(): string;

  // Profiling
  /** @noSelf */
  export function sample(name: string, fn: Function): void;
  /** @noSelf */
  export function getStats(): { [task: string]: number };
  /** @noSelf */
  export function setStatsInterval(seconds: number): void;

  /** @noSelf */
  export namespace display {
    function setRefreshRate(rate: number): void;
    function getRefreshRate(): number;
    function flush(): void;
    function getHeight(): number;
    function getWidth(): number;
    function getSize(): LuaMultiReturn<[number, number]>;
    function getRect(): [number, number, number, number];
    function setScale(scale: number): void;
    function getScale(): number;
    function setInverted(flag: boolean): void;
    function getInverted(): boolean;
    function setMosaic(x: number, y: number): void;
    function getMosaic(): [number, number];
    function setOffset(x: number, y: number): void;
    function getOffset(): [number, number];
    function setFlipped(x: number, y: number): void;
    function loadImage(path: string): void;
  }

  type EasingFunctions = typeof easingFunctions[keyof typeof easingFunctions];

  /** @noSelf */
  export namespace easingFunctions {
    function linear(t: number, b: number, c: number, d: number): number;
    function inQuad(t: number, b: number, c: number, d: number): number;
    function outQuad(t: number, b: number, c: number, d: number): number;
    function inOutQuad(t: number, b: number, c: number, d: number): number;
    function outInQuad(t: number, b: number, c: number, d: number): number;
    function inCubic(t: number, b: number, c: number, d: number): number;
    function outCubic(t: number, b: number, c: number, d: number): number;
    function inOutCubic(t: number, b: number, c: number, d: number): number;
    function outInCubic(t: number, b: number, c: number, d: number): number;
    function inQuart(t: number, b: number, c: number, d: number): number;
    function outQuart(t: number, b: number, c: number, d: number): number;
    function inOutQuart(t: number, b: number, c: number, d: number): number;
    function outInQuart(t: number, b: number, c: number, d: number): number;
    function inQuint(t: number, b: number, c: number, d: number): number;
    function outQuint(t: number, b: number, c: number, d: number): number;
    function inOutQuint(t: number, b: number, c: number, d: number): number;
    function outInQuint(t: number, b: number, c: number, d: number): number;
    function inSine(t: number, b: number, c: number, d: number): number;
    function outSine(t: number, b: number, c: number, d: number): number;
    function inOutSine(t: number, b: number, c: number, d: number): number;
    function outInSine(t: number, b: number, c: number, d: number): number;
    function inExpo(t: number, b: number, c: number, d: number): number;
    function outExpo(t: number, b: number, c: number, d: number): number;
    function inOutExpo(t: number, b: number, c: number, d: number): number;
    function outInExpo(t: number, b: number, c: number, d: number): number;
    function inCirc(t: number, b: number, c: number, d: number): number;
    function outCirc(t: number, b: number, c: number, d: number): number;
    function inOutCirc(t: number, b: number, c: number, d: number): number;
    function outInCirc(t: number, b: number, c: number, d: number): number;
    function inElastic(
      t: number,
      b: number,
      c: number,
      d: number,
      a?: number,
      p?: number
    ): number;
    function outElastic(
      t: number,
      b: number,
      c: number,
      d: number,
      a?: number,
      p?: number
    ): number;
    function inOutElastic(
      t: number,
      b: number,
      c: number,
      d: number,
      a?: number,
      p?: number
    ): number;
    function outInElastic(
      t: number,
      b: number,
      c: number,
      d: number,
      a?: number,
      p?: number
    ): number;
    function inBack(
      t: number,
      b: number,
      c: number,
      d: number,
      s?: number
    ): number;
    function outBack(
      t: number,
      b: number,
      c: number,
      d: number,
      s?: number
    ): number;
    function inOutBack(
      t: number,
      b: number,
      c: number,
      d: number,
      s?: number
    ): number;
    function outInBack(
      t: number,
      b: number,
      c: number,
      d: number,
      s?: number
    ): number;
    function outBounce(t: number, b: number, c: number, d: number): number;
    function inBounce(t: number, b: number, c: number, d: number): number;
    function inOutBounce(t: number, b: number, c: number, d: number): number;
    function outInBounce(t: number, b: number, c: number, d: number): number;
  }

  // Files
  /** @noSelf */
  export namespace datastore {
    export function write(
      table: AnyTable,
      filename?: string,
      prettyPrint?: boolean
    ): void;
    export function read(filename?: string): AnyTable;
    export function _delete(filename?: string): void;
    export function writeImage(image: Image, path: string): void;
    export function readImage(path: string): Image;
    export { _delete as delete };
  }

  type File = {
    close: () => void;
    flush: () => void;
    readline: () => string;
    read: (nBytes: number) => string;
    seek: (offset: number) => void;
    tell: () => number;
  };
  /** @noSelf */
  export namespace file {
    export const kFileRead: 1;
    export const kFileWrite: 2;
    export const kFileAppend: 4;
    type FileMode = typeof kFileRead | typeof kFileWrite | typeof kFileAppend;

    export function open(path: string, mode?: FileMode): File;
    export function listFiles(path: string): string[];
    export function exists(path: string): boolean;
    export function isdir(path: string): boolean;
    export function mkdir(path: string): void;
    export function _delete(path: string, recursive?: boolean): void;
    export function getSize(path: string): number;
    export function getType(path: string): number;
    export function modtime(path: string): DateTime;
    export function rename(path: string, newPath: string): void;
    export function load(path: string, env?: AnyTable): void;
    export function run(path: string, env?: AnyTable): void;
    export { _delete as delete };
  }

  type Transform = {
    _data: [[number, number, number], [number, number, number], [0, 0, 1]];
    copy(): Transform;
    invert(): void;
    reset(): void;
    concat(af: Transform): void;
    translate(dx: number, dy: number): void;
    translatedBy(dx: number, dy: number): Transform;
    scale(sx: number, sy?: number): void;
    scaledBy(sx: number, sy?: number): void;
    rotate(angle: number, x?: number, y?: number): void;
    rotate(angle: number, point?: Point): void;
    rotatedBy(angle: number, x?: number, y?: number): Transform;
    rotatedBy(angle: number, point?: Point): Transform;
    skew(sx: number, sy: number): void;
    skewedBy(sx: number, sy: number): Transform;
    transformPoint(p: Point): void;
    transformedPoint(p: Point): Point;
    transformXY(x: number, y: number): [number, number];
    transformLineSegment(ls: LineSegment): void;
    transformedLineSegment(ls: LineSegment): LineSegment;
    transformAABB(r: Rectangle): void;
    transformedAABB(r: Rectangle): Rectangle;
    transformPolygon(p: Polygon): void;
    transformedPolygon(p: Polygon): Polygon;
    multiplyTransform: LuaMultiplicationMethod<Transform, Transform>;
    multiplyVector: LuaMultiplicationMethod<Vector, Vector>;
    mutliplyPoint: LuaMultiplicationMethod<Point, Point>;
    // https://sdk.play.date/1.11.1/Inside%20Playdate.html#m-geometry.affineTransform.scale
  };
  type Arc = {
    copy(): Arc;
    length(): number;
    isClockwise(): boolean;
    setIsClockWise(flag: boolean): void;
    pointOnArc(distance: number): Point;
  };
  type LineSegment = {
    copy(): LineSegment;
    unpack(): [number, number, number, number];
    length(): number;
    offset(dx: number, dy: number): void;
    offsetBy(dx: number, dy: number): LineSegment;
    midpoint(): Point;
    pointOnLine(distance: number): Point;
    closestPointOnLineToPoint(p: Point): Point;
    intersectsLineSegment(ls: LineSegment): boolean;
    fast_intersection(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      x3: number,
      y3: number,
      x4: number,
      y4: number
    ): boolean;
    intersectsPolygon(p: Polygon): boolean;
    intersectsRect(r: Rectangle): boolean;
  };
  type Point = {
    x: number;
    y: number;
    copy(): Point;
    unpack(): [number, number];
    offset(dx: number, dy: number): void;
    offsetBy(dx: number, dy: number): Point;
    squaredDistanceToPoint(p: Point): number;
    distanceToPoint(p: Point): number;
    add: LuaAdditionMethod<Vector, Point>;
    subtract: LuaSubtractionMethod<Point, Vector>;
    transform: LuaMultiplicationMethod<Transform, Point>;
    concat: LuaConcatMethod<Point, LineSegment>;
  };
  type Polygon = {
    copy(): Polygon;
    close(): void;
    isClosed(): boolean;
    containsPoint(p: Point, fillRule?: PolygonFillRule): boolean;
    containsPoint(x: number, y: number, fillRule?: PolygonFillRule): boolean;
    getBounds(): [number, number, number, number];
    getBoundsRect(): Rectangle;
    count(): number;
    length(): number;
    setPointAt(n: number, x: number, y: number): void;
    getPointAt(n: number): void;
    intersects(p: Point): boolean;
    pointOnPolygon(distance: number): Point;
    translate(dx: number, dy: number): void;
  };
  type Rectangle = {
    x: number;
    y: number;
    width: number;
    height: number;
    copy(): Rectangle;
    toPolygon(): Polygon;
    unpack(): [number, number, number, number];
    isEmpty(): boolean;
    isEqual(r2: Rectangle): boolean;
    intersects(r2: Rectangle): boolean;
    intersection(r2: Rectangle): Rectangle;
    union(r2: Rectangle): Rectangle;
    inset(dx: number, dy: number): void;
    insetBy(dx: number, dy: number): Rectangle;
    offset(dx: number, dy: number): void;
    offsetBy(dx: number, dy: number): Rectangle;
    containsRect(r2: Rectangle): boolean;
    containsRect(x: number, y: number, width: number, height: number): boolean;
    containsPoint(p: Point): boolean;
    containsPoint(x: number, y: number): boolean;
    centerPoint(): Point;
    flipRelativeToRect(r2: Rectangle, flip: GeometryFlip): void;
  };
  type Size = {
    width: number;
    height: number;
    copy(): Size;
    unpack(): [number, number];
  };
  // https://typescripttolua.github.io/docs/advanced/language-extensions/#operator-map-types
  type Vector = {
    x: number;
    y: number;
    dx: number;
    dy: number;
    copy(): Vector;
    unpack(): [number, number];
    addVector(v: Vector): void;
    scale(s: number): void;
    scaledBy(s: number): Vector;
    normalize(): void;
    normalized(): Vector;
    dotProduct(v: Vector): number;
    magnitude(): number;
    magnitudeSquared(): number;
    projectAlong(v: Vector): Vector;
    angleBetween(v: Vector): number;
    leftNormal(): Vector;
    rightNormal(): Vector;
    negate: LuaNegationMethod<Vector>;
    add: LuaAdditionMethod<Vector, Vector>;
    subtract: LuaSubtractionMethod<Vector, Vector>;
    dot: LuaMultiplicationMethod<Vector, Vector>;
    transform: LuaMultiplicationMethod<Transform, Vector>;
    divide: LuaDivisionMethod<number, Vector>;
  };

  type GeometryFlip =
    | typeof geometry.kUnflipped
    | typeof geometry.kFlippedX
    | typeof geometry.kFlippedY
    | typeof geometry.kFlippedXY;

  type PolygonFillRule =
    | typeof geometry.polygon.kPolygonFillEvenOdd
    | typeof geometry.polygon.kPolygonFillNonZero;
  /** @noSelf */
  export namespace geometry {
    export const kUnflipped: 1;
    export const kFlippedX: 2;
    export const kFlippedY: 4;
    export const kFlippedXY: 8;

    export namespace affineTransform {
      function _new(
        m11: number,
        m12: number,
        m21: number,
        m22: number,
        tx: number,
        ty: number
      ): Transform;
      function _new(): Transform;
      export { _new as new };
    }
    export namespace arc {
      function _new(
        x: number,
        y: number,
        radius: number,
        startAngle: number,
        endAngle: number,
        direction?: boolean
      ): Arc;
      export { _new as new };
    }
    export namespace lineSegment {
      function _new(
        x1: number,
        y1: number,
        x2: number,
        y2: number
      ): LineSegment;
      export { _new as new, LineSegment };
    }
    export namespace point {
      function _new(x: number, y: number): Point;
      export { _new as new, Point };
    }
    export namespace polygon {
      export const kPolygonFillNonZero = 1;
      export const kPolygonFillEvenOdd = 2;

      function _new(
        x: number,
        y: number,
        x2: number,
        y2: number,
        ...points: number[]
      ): Polygon;
      function _new(p1: Point, p2: Point, ...points: Point[]): Polygon;
      function _new(numberOfVertices: number): Polygon;
      export { _new as new };
    }
    export namespace rect {
      export function fast_intersection(
        x1: number,
        y1: number,
        w1: number,
        h1: number,
        x2: number,
        y2: number,
        w2: number,
        h2: number
      ): boolean;
      export function fast_union(
        x1: number,
        y1: number,
        w1: number,
        h1: number,
        x2: number,
        y2: number,
        w2: number,
        h2: number
      ): boolean;
      function _new(
        this: void,
        x: number,
        y: number,
        width: number,
        height: number
      ): Rectangle;
      export { _new as new };
    }
    export namespace size {
      function _new(width: number, height: number): Size;
      export { _new as new };
    }
    export namespace vector2D {
      function _new(x: number, y: number): Vector;
      export { _new as new };
    }
    export function squaredDistanceToPoint(
      x1: number,
      y1: number,
      x2: number,
      y2: number
    ): number;
    export function distanceToPoint(
      x1: number,
      y1: number,
      x2: number,
      y2: number
    ): number;
  }

  type ImageFlip =
    | typeof graphics.kImageUnflipped
    | typeof graphics.kImageFlippedX
    | typeof graphics.kImageFlippedY
    | typeof graphics.kImageFlippedXY;

  // Graphics
  type Color =
    | typeof graphics.kColorBlack
    | typeof graphics.kColorWhite
    | typeof graphics.kColorClear
    | typeof graphics.kColorXOR;

  /** @noSelf */
  export namespace graphics {
    type Color =
      | typeof kColorBlack
      | typeof kColorWhite
      | typeof kColorClear
      | typeof kColorXOR;
    export function pushContext(image?: Image): void;
    export function popContext(): void;
    export function clear(color?: Color): void;

    export const kImageUnflipped: 0;
    export const kImageFlippedX: 1;
    export const kImageFlippedY: 2;
    export const kImageFlippedXY: 4;

    export const kColorBlack: 0;
    export const kColorWhite: 1;
    export const kColorClear: 2;
    export const kColorXOR: 4;

    /** @noSelf **/
    export namespace image {
      export const kDitherTypeNone: 0;
      export const kDitherTypeDiagonalLine: 1;
      export const kDitherTypeVerticalLine: 2;
      export const kDitherTypeHorizontalLine: 4;
      export const kDitherTypeScreen: 8;
      export const kDitherTypeBayer2x2: 16;
      export const kDitherTypeBayer4x4: 32;
      export const kDitherTypeBayer8x8: 64;
      export const kDitherTypeFloydSteinberg: 128;
      export const kDitherTypeBurkes: 256;
      export const kDitherTypeAtkinson: 512;

      export type DitherType =
        | typeof graphics.image.kDitherTypeNone
        | typeof graphics.image.kDitherTypeDiagonalLine
        | typeof graphics.image.kDitherTypeVerticalLine
        | typeof graphics.image.kDitherTypeHorizontalLine
        | typeof graphics.image.kDitherTypeScreen
        | typeof graphics.image.kDitherTypeBayer2x2
        | typeof graphics.image.kDitherTypeBayer4x4
        | typeof graphics.image.kDitherTypeBayer8x8
        | typeof graphics.image.kDitherTypeFloydSteinberg
        | typeof graphics.image.kDitherTypeBurkes
        | typeof graphics.image.kDitherTypeAtkinson;

      export function imageSizeAtPath(
        path: string
      ): LuaMultiReturn<[number, number]>;
      function _new(
        this: void,
        width: number,
        height: number,
        bgcolor?: Color
      ): Image;
      function _new(this: void, path: string): Image;
      export { _new as new };
    }

    export function checkAlphaCollision(
      image1: Image,
      x1: number,
      y1: number,
      flip1: ImageFlip,
      image2: Image,
      x2: number,
      y2: number,
      flip2: ImageFlip
    ): boolean;
    export function setColor(color: Color | number): void;
    export function getColor(): Color;
    export function setBackgroundColor(color: Color): void;
    export function getBackgroundColor(): Color;

    // Patterns
    type Pattern = [
      number,
      number,
      number,
      number,
      number,
      number,
      number,
      number
    ];
    export function setPattern(pattern: Pattern): void;
    export function setPattern(image: Image, x?: number, y?: number): void;
    export function setDitherPattern(
      alpha: number,
      ditherType?: playdate.graphics.image.DitherType
    ): void;

    // Lines
    export const kLineCapStyleButt = 0;
    export const kLineCapStyleRound = 0;
    export const kLineCapStyleSquare = 0;
    type LineCapStyle =
      | typeof kLineCapStyleButt
      | typeof kLineCapStyleRound
      | typeof kLineCapStyleSquare;
    export function drawLine(
      x1: number,
      y1: number,
      x2: number,
      y2: number
    ): void;
    export function drawLine(ls: LineSegment): void;
    export function setLineCapStyle(style: LineCapStyle): void;

    // Pixels
    export function drawPixel(x: number, y: number): void;
    export function drawPixel(p: Point): void;

    // Rect
    export function drawRect(
      x: number,
      y: number,
      width: number,
      height: number
    ): void;
    export function drawRect(r: Rectangle): void;
    export function fillRect(
      x: number,
      y: number,
      width: number,
      height: number
    ): void;
    export function fillRect(r: Rectangle): void;

    // Round Rect
    export function drawRoundRect(
      x: number,
      y: number,
      width: number,
      height: number
    ): void;
    export function drawRoundRect(r: Rectangle): void;
    export function fillRoundRect(
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number
    ): void;
    export function fillRoundRect(r: Rectangle, radius: number): void;

    // Arc
    export function drawArc(arc: Arc): void;
    export function drawArc(
      x: number,
      y: number,
      radius: number,
      startAngle: number,
      endAngle: number
    ): void;

    // Circle
    export function drawCircleAtPoint(
      x: number,
      y: number,
      radius: number
    ): void;
    export function drawCircleAtPoint(p: Point, radius: number): void;
    export function drawCircleInRect(
      x: number,
      y: number,
      width: number,
      height: number
    ): void;
    export function drawCircleInRect(rect: number): void;
    export function fillCircleAtPoint(
      x: number,
      y: number,
      radius: number
    ): void;
    export function fillCircleAtPoint(p: Point, radius: number): void;
    export function fillCircleInRect(
      x: number,
      y: number,
      radius: number
    ): void;
    export function fillCircleInRect(p: Point, radius: number): void;

    // Ellipse
    export function drawEllipseInRect(
      x: number,
      y: number,
      width: number,
      height: number,
      startAngle?: number,
      endAngle?: number
    ): void;
    export function drawEllipseInRect(
      rect: Rectangle,
      startAngle?: number,
      endAngle?: number
    ): void;
    export function fillEllipseInRect(
      x: number,
      y: number,
      width: number,
      height: number,
      startAngle?: number,
      endAngle?: number
    ): void;
    export function fillEllipseInRect(
      rect: Rectangle,
      startAngle?: number,
      endAngle?: number
    ): void;

    // Polygon
    export function drawPolygon(p: Polygon): void;
    export function drawPolygon(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      ...points: number[]
    ): void;
    export function fillPolygon(p: Polygon): void;
    export function fillPolygon(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      ...points: number[]
    ): void;
    export function setPolygonFillRule(rule: PolygonFillRule): void;

    // Triangle
    export function drawTriangle(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      x3: number,
      y3: number
    ): void;
    export function fillTriangle(
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      x3: number,
      y3: number
    ): void;

    // Nine slice
    export type NineSlice = {
      getSize(): void;
      getMinSize(): LuaMultiReturn<[number, number]>;
      drawInRect(x: number, y: number, width: number, height: number): void;
      drawInRect(rect: Rectangle): void;
    };
    /** @noSelf */
    export namespace nineSlice {
      function _new(
        imagePath: string,
        innerX: number,
        innerY: number,
        innerWidth: number,
        innerHeight: number
      ): NineSlice;
      export { _new as new };
    }

    // Perlin noise
    export function perlin(
      x: number,
      y: number,
      z: number,
      repeat: number,
      octaves?: number,
      persistence?: number
    ): number;
    export function perlinArray(
      count: number,
      x: number,
      dx: number,
      y?: number,
      dy?: number,
      dz?: number,
      repeat?: number,
      octaves?: number,
      persistence?: number
    ): number[];

    // QR Code
    export function generateQRCode(
      stringToEncode: string,
      desiredEdgeDimension: null | number,
      callback: (qrImage: Image) => any
    ): Timer;

    // Sine wave
    export function drawSineWave(
      startX: number,
      startY: number,
      endX: number,
      endY: number,
      startAmplitude: number,
      endAmplitude: number,
      period: number,
      phaseShift?: number
    ): void;

    // Drawing modifiers
    // Clipping
    export function setClipRect(
      x: number,
      y: number,
      width: number,
      height: number
    ): void;
    export function setClipRect(rect: Rectangle): void;
    export function getClipRect(): LuaMultiReturn<
      [number, number, number, number]
    >;
    export function setScreenClipRect(
      x: number,
      y: number,
      width: number,
      height: number
    ): void;
    export function setScreenClipRect(rect: Rectangle): void;
    export function getScreenClipRect(): LuaMultiReturn<
      [number, number, number, number]
    >;
    export function clearClipRect(): void;

    // Stencil
    export function setStencilImage(image: Image, tile?: boolean): void;
    export function setStencilPattern(
      pattern: [number, number, number, number, number, number, number, number]
    ): void;
    export function setStencilPattern(
      row1: number,
      row2: number,
      row3: number,
      row4: number,
      row5: number,
      row6: number,
      row7: number,
      row8: number
    ): void;
    export function setStencilPattern(
      level: number,
      ditherType?: graphics.image.DitherType
    ): void;
    export function clearStencil(): void;
    export function clearStencilImage(): void;

    // Draw Mode
    export const kDrawModeCopy: 0;
    export const kDrawModeWhiteTransparent: 1;
    export const kDrawModeBlackTransparent: 2;
    export const kDrawModeFillWhite: 4;
    export const kDrawModeFillBlack: 8;
    export const kDrawModeXOR: 16;
    export const kDrawModeNXOR: 32;
    export const kDrawModeInverted: 64;

    type DrawMode =
      | typeof kDrawModeCopy
      | typeof kDrawModeWhiteTransparent
      | typeof kDrawModeBlackTransparent
      | typeof kDrawModeFillWhite
      | typeof kDrawModeFillBlack
      | typeof kDrawModeXOR
      | typeof kDrawModeNXOR
      | typeof kDrawModeInverted;

    export function setImageDrawMode(
      mode:
        | DrawMode
        | "copy"
        | "inverted"
        | "XOR"
        | "NXOR"
        | "whiteTransparent"
        | "blackTransparent"
        | "fillWhite"
        | "fillBlack"
    ): void;
    export function getImageDrawMode(): DrawMode;

    // Lines & Strokes
    export function setLineWidth(width: number): void;
    export function getLineWidth(): number;

    export const kStrokeCentered: 0;
    export const kStrokeOutside: 1;
    export const kStrokeInside: 2;
    type StrokeLocation =
      | typeof kStrokeCentered
      | typeof kStrokeOutside
      | typeof kStrokeInside;
    export function setStrokeLocation(location: StrokeLocation): void;
    export function getStrokeLocation(): StrokeLocation;

    // Offscreen Drawing
    export function lockFocus(image: Image): void;
    export function unlockFocus(): void;

    // Animation
    export namespace animation {
      type Loop = {
        delay: number;
        startFrame: number;
        endFrame: number;
        frame: number;
        step: number;
        shouldLoop: boolean;
        paused: boolean;
        draw(x: number, y: number, flip?: boolean): void;
        image(): Image;
        isValid(): boolean;
        setImageTable(imageTable: ImageTable): void;
      };
      export namespace loop {
        function _new(
          delay?: number,
          imageTable?: ImageTable,
          shouldLoop?: boolean
        ): Loop;
        export { _new as new };
      }
      export namespace blinker {
        type Blinker = {
          cycles: number;
          counter: number;
          onDuration: number;
          offDuration: number;
          default: boolean;
          loop: boolean;
          on: boolean;
          running: boolean;
          update(): void;
          start(): void;
          startLoop(): void;
          stop(): void;
          remove(): void;
        };
        function _new(): Blinker;
        export function updateAll(): void;
        export function stopAll(): void;
        export { _new as new };
      }
    }

    // Animator
    type _Animator<T> = {
      s: number;
      a: number;
      p: number;
      easingAmplitude: number;
      easingPeriod: number;
      repeatCount: number;
      reverses: boolean;
      currentValue(): T;
      valueAtTime(time: number): T;
      progress(): number;
      reset(duration?: number): void;
      ended(): boolean;
    };
    type PointAnimator = _Animator<Point>;
    type NumberAnimator = _Animator<number>;
    export type Animator = PointAnimator | NumberAnimator;
    export namespace animator {
      function _new(
        duration: number,
        startValue: number,
        endValue: number,
        easingFunction: EasingFunctions,
        startTimeOffset?: number
      ): NumberAnimator;
      function _new(
        duration: number,
        startValue: Point,
        endValue: Point,
        easingFunction: EasingFunctions,
        startTimeOffset?: number
      ): PointAnimator;
      function _new(
        duration: number,
        lineSegment: LineSegment,
        easingFunction?: EasingFunctions,
        startTimeOffset?: number
      ): PointAnimator;
      function _new(
        duration: number,
        arc: Arc,
        easingFunction?: EasingFunctions,
        startTimeOffset?: number
      ): PointAnimator;
      function _new(
        duration: number,
        polygon: Polygon,
        easingFunction?: EasingFunctions,
        startTimeOffset?: number
      ): PointAnimator;
      function _new(
        durations: number[],
        parts: Array<Polygon | Arc | LineSegment>,
        easingFunctions: EasingFunctions[],
        startTimeOffset?: number
      ): PointAnimator;
      function _new(
        duration: number,
        parts: Array<Polygon | Arc | LineSegment>,
        easingFunction: EasingFunctions,
        startTimeOffset?: number
      ): PointAnimator;
      export { _new as new };
    }

    // Scrolling
    export function setDrawOffset(x: number, y: number): void;
    export function getDrawOffset(): LuaMultiReturn<[number, number]>;

    // Frame buffer
    export function getDisplayImage(): Image;
    export function getWorkingImage(): Image;

    // Image tables
    type ImageTable = Array<Image> & {
      getImage(n: number): Image;
      getImage(x: number, y: number): Image;
      setImage(n: number, image: Image): void;
      load(path: string): LuaMultiReturn<[boolean, boolean?]>;
      getLength(): number;
      getSize(): LuaMultiReturn<[number, number]>;
      drawImage(n: number, x: number, y: number, flip?: ImageFlip): void;
    };
    namespace imagetable {
      function _new(path: string): ImageTable;
      function _new(
        count: number,
        cellsWide?: number,
        cellSize?: number
      ): ImageTable;
      export { _new as new };
    }

    type TileMap = {
      setImageTable(table: ImageTable): void;
      setTiles(data: number[], width: number): void;
      getTiles(): LuaMultiReturn<[number[], number]>;
      draw(x: number, y: number, sourceRect?: Rectangle): void;
      setTileAtPosition(x: number, y: number, index: number): void;
      getTileAtPosition(x: number, y: number): number;
      setSize(width: number, height: number): void;
      getSize(): LuaMultiReturn<[number, number]>;
      getPixelSize(): LuaMultiReturn<[number, number]>;
      getTileSize(): LuaMultiReturn<[number, number]>;
      getCollisionRects(emptyIDs: number[]): Rectangle[];
    };
    namespace tilemap {
      function _new(): TileMap;
      export { _new as new };
    }

    export type Sprite = {};
    type CollisionMovementReturn = LuaMultiReturn<
      [
        number,
        number,
        {
          sprite: Sprite;
          other: Sprite;
          type: CollisionResponse;
          overlaps: boolean;
          ti: number;
          move: Vector;
          normal: Vector;
          touch: Point;
          spriteRect: Rectangle;
          otherRect: Rectangle;
          bounce?: Point;
          slide?: Point;
        }[],
        number
      ]
    >;
    type CollisionResponse =
      | typeof sprite.kCollisionTypeSlide
      | typeof sprite.kCollisionTypeFreeze
      | typeof sprite.kCollisionTypeOverlap
      | typeof sprite.kCollisionTypeBounce;

    type LineCollisionInfo = {
      sprite: Sprite;
      entryPoint: Point;
      exitPoint: Point;
      t1: number;
      t2: number;
    };

    class sprite {
      drawX: number;
      drawY: number;
      width: number;
      height: number;
      isa(type: Sprite): boolean;
      setImage(
        image: Image,
        flip?: ImageFlip,
        scale?: number,
        yscale?: number
      ): void;
      getImage(): Image;
      add(): void;
      addSprite(): void;
      remove(): void;
      moveTo(x: number, y: number): void;
      getPosition(): LuaMultiReturn<[number, number]>;
      moveBy(x: number, y: number): void;
      setZIndex(z: number): void;
      getZIndex(): number;
      setVisible(flag: boolean): void;
      isVisible(): boolean;
      setCenter(x: number, y: number): void;
      getCenter(): LuaMultiReturn<[number, number]>;
      getCenterPoint(): Point;
      setSize(width: number, height: number): void;
      getSize(): LuaMultiReturn<[number, number]>;
      setScale(scale: number, yScale?: number): void;
      getScale(): LuaMultiReturn<[number, number]>;
      setRotation(angle: number, scale?: number, yScale?: number): void;
      getRotation(): number;
      copy(): Sprite;
      setUpdatesEnabled(flag: boolean): void;
      updatesEnabled(): boolean;
      setTag(tag: number): void;
      getTag(): number;
      setImageDrawMode(mode: DrawMode): void;
      setImageFlip(flip: ImageFlip, flipCollideRect?: Rectangle): void;
      getImageFlip(): ImageFlip;
      setIgnoresDrawOffset(flag: boolean): void;
      setBounds(
        upperLeftX: number,
        upperLeftY: number,
        width: number,
        height: number
      ): void;
      setBounds(rect: Rectangle): void;
      getBounds(): LuaMultiReturn<[number, number, number, number]>;
      getBoundsRect(): Rectangle;
      setOpaque(flag: boolean): void;
      isOpaque(): boolean;
      setTilemap(tilemap: TileMap): void;

      // Animation
      setAnimator(
        animator: PointAnimator | NumberAnimator,
        moveWithCollisions?: boolean,
        removeOnCollision?: boolean
      ): void;
      removeAnimator(): void;

      // Clipping
      setClipRect(x: number, y: number, width: number, height: number): void;
      setClipRect(rect: Rectangle): void;
      clearClipRect(): void;
      setStencilImage(stencil: Image, tile?: boolean): void;

      // Drawing
      markDirty(): void;
      setRedrawsOnImageChange(flag: boolean): void;

      // Callbacks
      draw(x: number, y: number, width: number, height: number): void;
      update(): void;

      // Collision detection
      setCollideRect(x: number, y: number, width: number, height: number): void;
      setCollideRect(rect: Rectangle): void;
      getCollideRect(): Rectangle;
      getCollideBounds(): LuaMultiReturn<[number, number, number, number]>;
      clearCollideRect(): void;
      overlappingSprites(): Sprite[];
      alphaCollision(anotherSprite: Sprite): boolean;
      setCollisionsEnabled(flag: boolean): void;
      collisionsEnabled(): boolean;
      setGroups(groups: number[]): void;
      getGroups(): number[];
      setCollidesWithGroups(groups: number[]): void;
      setGroupMask(mask: number): void;
      getGroupMask(): number;
      setCollidesWithGroupsMask(mask: number): void;
      getCollidesWithGroupsMask(): number;
      resetGroupMask(): void;
      resetCollidesWithGroupsMask(): void;
      moveWithCollisions(goalX: number, goalY: number): CollisionMovementReturn;
      moveWithCollisions(goalPoint: Point): CollisionMovementReturn;
      checkCollisions(goalX: number, goalY: number): CollisionMovementReturn;
      checkCollisions(goalPoint: Point): CollisionMovementReturn;
      collisionResponse(
        other: Sprite
      ): CollisionResponse | "slide" | "freeze" | "overlap" | "bounce";
      static kCollisionTypeSlide: 0;
      static kCollisionTypeFreeze: 1;
      static kCollisionTypeOverlap: 2;
      static kCollisionTypeBounce: 4;

      static init(subclass: any): void;
      /** @noSelf */
      static update(): void;
      static addSprite(sprite: Sprite): void;
      static removeSprite(sprite: Sprite): void;
      static setBackgroundDrawingCallback(
        drawCallback: (
          x: number,
          y: number,
          width: number,
          height: number
        ) => any
      ): void;
      static redrawBackground(): void;
      static setClipRectsInRange(
        x: number,
        y: number,
        width: number,
        height: number,
        startz: number,
        endz: number
      ): void;
      static setClipRectsInRange(
        rect: Rectangle,
        startz: number,
        endz: number
      ): void;
      static clearClipRectsInRange(startz: number, endz: number): void;
      static setStencilPattern(
        pattern: [
          number,
          number,
          number,
          number,
          number,
          number,
          number,
          number
        ]
      ): void;
      static setStencilPattern(
        row1: number,
        row2: number,
        row3: number,
        row4: number,
        row5: number,
        row6: number,
        row7: number,
        row8: number
      ): void;
      static setStencilPattern(
        level: number,
        ditherType?: graphics.image.DitherType
      ): void;
      static clearStencil(): void;

      // Drawing
      /** @noSelf */
      static setAlwaysRedraw(flag: boolean): void;
      /** @noSelf */
      static getAlwaysRedraw(): boolean;
      /** @noSelf */
      static addDirtyRect(
        x: number,
        y: number,
        width: number,
        height: number
      ): void;

      // Group Operations
      static getAllSprites(): Sprite[];
      static performOnAllSprites(f: (s: Sprite) => any): void;
      static spriteCount(): number;
      static removeAll(): void;
      static removeSprites(spriteArray: Sprite[]): void;

      // Collision
      static allOverlappingSprites(): [Sprite, Sprite][];
      static querySpritesAtPoint(x: number, y: number): Sprite[];
      static querySpritesAtPoint(p: Point): Sprite[];
      static querySpritesInRect(
        x: number,
        y: number,
        width: number,
        height: number
      ): Sprite[];
      static querySpritesInRect(rect: Rectangle): Sprite[];
      static querySpritesAlongLine(
        x1: number,
        y1: number,
        x2: number,
        y2: number
      ): Sprite[];
      static querySpritesAlongLine(lineSegment: LineSegment): Sprite[];

      static querySpriteInfoAlongLine(
        x1: number,
        y1: number,
        x2: number,
        y2: number
      ): LineCollisionInfo;
      static querySpriteInfoAlongLine(
        lineSegment: LineSegment
      ): LineCollisionInfo;
      static addEmptyCollisionSprite(r: Rectangle): void;
      static addEmptyCollisionSprite(
        x: number,
        y: number,
        w: number,
        h: number
      ): void;
      static addWallSprites(
        tilemap: TileMap,
        emptyIDs: number[],
        xOffset?: number,
        yOffset?: number
      ): Sprite[];

      /** @noSelf */
      static new(image?: Image): sprite;
    }

    // Text
    type Font = {
      drawText(
        text: string,
        x: number,
        y: number,
        leadingAdjustment?: number
      ): void;
      drawTextAligned(
        text: string,
        x: number,
        y: number,
        alignment: TextAlignment,
        leadingAdjustment?: number
      ): void;
      getHeight(): number;
      getTextWidth(text: string): number;
      setTracking(pixels: number): void;
      getTracking(): void;
      setLeading(pixels: number): void;
      getLeading(): number;
      getGlyph(character: string): Image;
    };
    export namespace font {
      export const kVariantNormal: 0;
      export const kVariantBold: 1;
      export const kVariantItalic: 2;
      export type FontVariant =
        | typeof kVariantNormal
        | typeof kVariantBold
        | typeof kVariantItalic;

      type FontPaths = {
        [kVariantNormal]: string;
        [kVariantBold]: string;
        [kVariantItalic]: string;
      };
      export type FontFamily = {
        [kVariantNormal]: Font;
        [kVariantBold]: Font;
        [kVariantItalic]: Font;
      };
      export function newFamily(fontPaths: FontPaths): FontFamily;
      function _new(path: string): Font;
      export { _new as new };
    }
    export function setFont(
      font: Font,
      variant?: "normal" | "bold" | "italic" | font.FontVariant
    ): void;
    export function getFont(
      variant?: "normal" | "bold" | "italic" | font.FontVariant
    ): Font;
    export function setFontFamily(fontFamily: font.FontFamily): void;
    export function setFontTracking(pixels: number): void;
    export function getFontTracking(): number;
    export function getSystemFont(variant?: font.FontVariant): Font;
    export function drawText(
      text: string,
      x: number,
      y: number,
      fontFamily?: font.FontFamily,
      leadingAdjustment?: number
    ): void;
    export function drawLocalizedText(
      key: string,
      x: number,
      y: number,
      language?: Language,
      leadingAdjustment?: number
    ): void;
    export function getLocalizedText(key: string, language?: Language): void;
    export function getTextSize(
      str: string,
      fontFamily?: font.FontFamily,
      leadingAdjustment?: number
    ): LuaMultiReturn<[number, number]>;
    export function drawTextAligned(
      text: string,
      x: number,
      y: number,
      alignment: TextAlignment,
      leadingAdjustment?: number
    ): void;
    export function drawTextInRect(
      text: string,
      x: number,
      y: number,
      width: number,
      height: number,
      leadingAdjustment?: number,
      truncationString?: string,
      alignment?: TextAlignment,
      font?: Font
    ): LuaMultiReturn<[number, number, boolean]>;
    export function drawTextInRect(
      text: string,
      rect: Rectangle,
      leadingAdjustment?: number,
      truncationString?: string,
      alignment?: TextAlignment,
      font?: Font
    ): LuaMultiReturn<[number, number, boolean]>;
    export function drawLocalizedTextAligned(
      text: string,
      x: number,
      y: number,
      alignment: TextAlignment,
      language?: Language,
      leadingAdjustment?: number
    ): void;
    export function drawLocalizedTextInRect(
      text: string,
      x: number,
      y: number,
      width: number,
      height: number,
      leadingAdjustment?: number,
      truncationString?: string,
      alignment?: TextAlignment,
      language?: Language
    ): LuaMultiReturn<[number, number, boolean]>;
    export function drawTextInRect(
      text: string,
      rect: Rectangle,
      leadingAdjustment?: number,
      truncationString?: string,
      alignment?: TextAlignment,
      language?: Language
    ): LuaMultiReturn<[number, number, boolean]>;
    export function getTextSizeForMaxWidth(
      str: string,
      maxWidth: number,
      leadingAdjustment?: number,
      font?: Font
    ): LuaMultiReturn<[number, number]>;

    // Video
    type Video = {
      getSize(): LuaMultiReturn<[number, number]>;
      getFrameCount(): number;
      getFrameRate(): number;
      setContext(image: Image): void;
      getContext(): Image;
      useScreenContext(): void;
      renderFrame(number: string): void;
    };
    export namespace video {
      function _new(path: string): Video;
      export { _new as new };
    }

    // Timers
    type Timer = {};

    export function fillRect(r: Rectangle): void;
    export function setImageDrawMode(mode: DrawMode): void;
    export function drawTextAligned(
      text: string,
      x: number,
      y: number,
      alignment: TextAlignment
    ): void;
  }

  export type Image = {
    height: number;
    width: number;
    load(path: string): void;
    copy(): void;
    getSize(): LuaMultiReturn<[number, number]>;
    draw(x: number, y: number, flip?: ImageFlip, sourceRect?: Rectangle): void;
    draw(p: Point, flip?: ImageFlip, sourceRect?: Rectangle): void;
    drawAnchored(
      x: number,
      y: number,
      ax: number,
      ay: number,
      flip?: ImageFlip
    ): void;
    drawCentered(x: number, y: number, flip?: ImageFlip): void;
    drawIgnoringOffset(x: number, y: number, flip?: ImageFlip): void;
    drawIgnoringOffset(p: Point, flip?: ImageFlip): void;
    clear(color: Color): void;
    sample(x: number, y: number): Color;
    drawRotated(
      x: number,
      y: number,
      angle: number,
      scale?: number,
      yscale?: number
    ): void;
    rotatedImage(angle: number, scale?: number, yscale?: number): Image;
    drawScaled(
      x: number,
      y: number,
      angle: number,
      scale: number,
      yscale?: number
    ): Image;
    scaledImage(scale: number): Image;
    scaledImage(angle: number, scale: number, yscale?: number): Image;
    drawWithTransform(xform: Transform, x: number, y: number): void;
    transformedImage(xform: Transform): Image;
    drawSampled(
      x: number,
      y: number,
      width: number,
      height: number,
      centerx: number,
      centery: number,
      dxx: number,
      dxy: number,
      dyy: number,
      dx: number,
      dy: number,
      z: number,
      tiltAngle: number,
      tile: boolean
    ): void;
    setMaskImage(maskImage: Image): void;
    getMaskImage(): Image;
    addMask(opaque?: boolean | 0 | 1): void;
    removeMask(): void;
    hasMask(): boolean;
    clearMask(opaque?: 1 | 0): void;
    drawTiled(
      x: number,
      y: number,
      width: number,
      height: number,
      flip?: ImageFlip
    ): void;
    drawTiled(rect: Rectangle, flip?: ImageFlip): void;
    drawBlurred(
      x: number,
      y: number,
      radius: number,
      numPasses: number,
      ditherType: playdate.graphics.image.DitherType,
      flip?: ImageFlip,
      xPhase?: number,
      yPhase?: number
    ): void;
    drawFaded(
      x: number,
      y: number,
      alpha: number,
      ditherType: playdate.graphics.image.DitherType
    ): void;
    setInverted(flag: boolean): void;
    invertedImage(): Image;
    blendWithImage(
      image: Image,
      alpha: number,
      ditherType: playdate.graphics.image.DitherType
    ): Image;
    blurredImage(
      radius: number,
      numPasses: number,
      ditherType: playdate.graphics.image.DitherType,
      padEdges?: boolean,
      xPhase?: number,
      yPhase?: number
    ): Image;
    fadedImage(
      alpha: number,
      ditherType: playdate.graphics.image.DitherType
    ): Image;
    vcrPauseFilterImage(): Image;
  };

  // Keyboard
  export namespace keyboard {
    export const text: string;
    export const kCapitalizationNormal: 0;
    export const kCapitalizationWords: 1;
    export const kCapitalizationSentences: 2;
    type CapitalizationBehavior =
      | typeof kCapitalizationNormal
      | typeof kCapitalizationWords
      | typeof kCapitalizationSentences;
    export function show(text?: string): void;
    export function hide(): void;
    export function setCapitalizationBehavior(
      behavior: CapitalizationBehavior
    ): void;
    export function left(): number;
    export function width(): number;
    export function isVisible(): boolean;
    export const keyboardDidShowCallback: () => void;
    export const keyboardDidHideCallback: () => void;
    export const keyboardWillHideCallback: () => void;
    export const keyboardAnimatingCallback: () => void;
    export const textChangedCallback: () => void;
  }

  // Math
  export namespace math {
    export function lerp(min: number, max: number, t: number): number;
  }

  // Pathfinding
  export namespace pathfinder {
    type Node = {
      x: number;
      y: number;
      id: number;
      addConnection(
        node: Node,
        weight: number,
        addReciprocalConnection: boolean
      ): void;
      addConnections(
        nodes: Node[],
        weights: number[],
        addReciprocalConnections: boolean
      ): void;
      addConnectionToNodeWithXY(
        x: number,
        y: number,
        weight: number,
        addReciprocalConnection: boolean
      ): void;
      connectedNodes(): Node[];
      removeConnection(node: Node, removeReciprocal?: boolean): void;
      removeAllConnections(removeIncoming?: boolean): void;
      setXY(x: number, y: number): void;
    };
    type Graph = {
      addNewNode(
        id: number,
        x: number,
        y: number,
        connectedNodes?: Node[],
        weights?: number[],
        addReciprocalConnections?: boolean
      ): void;
      addNewNodes(count: number): Node[];
      addNode(
        node: Node,
        connectedNodes?: Node[],
        weights?: number[],
        addReciprocalConnections?: boolean
      ): void;
      addNodes(nodes: Node[]): void;
      allNodes(): Node[];
      removeNode(node: Node): void;
      removeNodeWithXY(x: number, y: number): void;
      removeNodeWithID(id: number): void;
      nodeWithID(id: number): Node | null;
      nodeWithXY(x: number, y: number): Node | null;
      addConnections(connections: { [nodeID: number]: number[] }): void;
      addConnectionToNodeWithID(
        fromNodeID: number,
        toNodeID: number,
        weight: number,
        addReciprocalConnection: boolean
      ): void;
      removeAllConnections(): void;
      removeAllConnectionsFromNodeWithID(
        id: number,
        removeIncoming?: boolean
      ): void;
      findPath(
        startNode: Node,
        goalNode: Node,
        heuristicFunction?: null | ((startNode: Node, endNode: Node) => number),
        findPathToGoalAdjacentNodes?: boolean
      ): Node[];
      findPathWithIDs(
        startNodeID: number,
        goalNodeID: number,
        heuristicFunction?: null | ((startNode: Node, endNode: Node) => number),
        findPathToGoalAdjacentNodes?: boolean
      ): Node[];
      setXYForNodeWithID(id: number, x: number, y: number): void;
    };
    export namespace graph {
      export function new2DGrid(
        width: number,
        height: number,
        allowDiagonals?: boolean,
        includedNodes?: Array<1 | 0>
      ): Graph;
      function _new(
        nodeCount?: number,
        coordinates?: [number, number][]
      ): Graph;
      export { _new as new };
    }
  }

  // Power
  export function getPowerStatus(): {
    charging: boolean;
    USB: boolean;
  };
  export function getBatteryPercentage(): number;
  export function getBatteryVoltage(): number;

  // Simulator-Only Functionality
  export const isSimulator: boolean;
  export namespace simulator {
    export function writeToFile(image: Image, path: string): void;
    export function exit(): void;
    export function getURL(url: string): string;
    export function clearConsole(): void;
    export function setDebugDrawColor(
      r: number,
      g: number,
      b: number,
      a: number
    ): void;
    export function keyPressed(key: string): void;
    export function keyReleased(key: string): void;
    export function debugDraw(): void;
  }

  // Sound
  export namespace sound {
    export const kFormat8bitMono: 0;
    export const kFormat8bitStereo: 1;
    export const kFormat16bitMono: 2;
    export const kFormat16bitStereo: 4;
    type SampleFormat =
      | typeof kFormat8bitMono
      | typeof kFormat8bitStereo
      | typeof kFormat16bitMono
      | typeof kFormat16bitStereo;

    export function getSampleRate(): number;
    export namespace sampleplayer {
      export type SamplePlayer = {
        copy(): SamplePlayer;
        play(repeatCount?: number, rate?: number): void;
        playAt(
          when: number,
          vol?: number,
          rightVol?: number,
          rate?: number
        ): void;
        setVolume(left: number, right?: number): void;
        getVolume(): number;
        setLoopCallback<T = any>(
          callback: (s: sample.Sample, arg: T) => any,
          arg?: T
        ): void;
        setPlayRange(start: number, end: number): void;
        setPaused(flag: boolean): void;
        isPlaying(): boolean;
        stop(): void;
        setFinishCallback<T = any>(
          callback: (s: sample.Sample, arg: T) => any,
          arg?: T
        ): void;
        setSample(sample: sample.Sample): void;
        getSample(): sample.Sample;
        getLength(): number;
        setRate(rate: number): void;
        getRate(): void;
        setRateMod(signal: signal.Signal): void;
        setOffset(seconds: number): void;
        getOffset(): void;
      };
      function _new(path: string): SamplePlayer;
      function _new(sample: sample.Sample): SamplePlayer;
      export { _new as new };
    }
    export namespace fileplayer {
      export type FilePlayer = {
        load(path: string): void;
        play(repeatCount?: number): void;
        stop(): void;
        pause(): void;
        isPlaying(): boolean;
        getLength(): number;
        setFinishCallback<T = any>(
          callback: (fileplayer: FilePlayer, arg: T) => void,
          arg?: T
        ): void;
        didUnderrun(): boolean;
        setStopOnUnderrun(flag: boolean): void;
        setLoopRange<T = any>(
          start: number,
          end?: number,
          loopCallback?: (fileplayer: FilePlayer, arg: T) => void,
          arg?: T
        ): void;
        setBufferSize(seconds: number): void;
        setRate(rate: number): void;
        getRate(): number;
        setRadeMod(signal: signal.Signal): void;
        setVolume<T = any>(
          left: number,
          right?: number,
          fadeSeconds?: number,
          fadeCallback?: (fileplayer: FilePlayer, arg: T) => void,
          arg?: T
        ): void;
        getVolume(): number;
        setOffset(seconds: number): void;
        getOffset(): void;
      };
      function _new(buffersize?: number): FilePlayer;
      function _new(path: string, buffersize?: number): FilePlayer;
      export { _new as new };
    }
    export namespace sample {
      export type Sample = {
        getSubsample(startOffset: number, endOffset: number): Sample;
        load(path: string): void;
        getSampleRate(): number;
        getFormat(): SampleFormat;
        getLength(): number;
        play(repeatCount?: number, rate?: number): void;
        playAt(
          when: number,
          vol?: number,
          rightvol?: number,
          rate?: number
        ): void;
        save(filename: string): void;
      };
      function _new(path: string): Sample;
      function _new(seconds: number, format?: SampleFormat): Sample;
      export { _new as new };
    }
    type Effect = {};
    export namespace channel {
      type Channel = {
        remove(): void;
        addEffect(effect: Effect): void;
        removeEffect(effect: Effect): void;
        addSource(source: Source): void;
        removeSource(source: Source): void;
        setVolume(volume: number): void;
        getVolume(): number;
        setPan(pan: -1 | 0 | 1): void;
        setPanMod(signal: signal.Signal): void;
        setVolumeMod(signal: signal.Signal): void;
      };
      function _new(): Channel;
      export { _new as new };
    }

    export namespace signal {
      export type Signal = {
        setOffset(offset: number): void;
        setScale(scale: number): void;
      };
    }

    export const kLFOSquare: 0;
    export const kLFOSawtoothUp: 1;
    export const kLFOSawtoothDown: 2;
    export const kLFOTriangle: 4;
    export const kLFOSine: 8;
    export const kLFOSampleAndHold: 16;

    export namespace lfo {
      type LFOType =
        | typeof kLFOSquare
        | typeof kLFOSawtoothUp
        | typeof kLFOSawtoothDown
        | typeof kLFOTriangle
        | typeof kLFOSine
        | typeof kLFOSampleAndHold;

      export type LFO = signal.Signal & {
        setType(type: LFOType): void;
        setArpeggio(...notes: number[]): void;
        setCenter(center: number): void;
        setDepth(depth: number): void;
        setRate(rate: number): void;
        setPhase(phase: number): void;
        setGlobal(flag: boolean): void;
        setRetrigger(flag: boolean): void;
        setDelay(holdoff: number, ramp: number): void;
      };
      function _new(type?: LFOType): LFO;
      export { _new as new };
    }

    export namespace envelope {
      type Envelope = signal.Signal & {
        setAttack(attack: number): void;
        setDecay(decay: number): void;
        setSustain(sustain: number): void;
        setRelease(release: number): void;
        setScale(scale: number): void;
        setOffset(offset: number): void;
        setLegato(flag: boolean): void;
        setRetrigger(flag: boolean): void;
        trigger(velocity: number, length?: number): void;
        setGlobal(flag: boolean): void;
      };
      function _new(
        attack?: number,
        decay?: number,
        sustain?: number,
        release?: number
      ): Envelope;
    }

    export const kWaveSine: 0;
    export const kWaveSquare: 1;
    export const kWaveSawtooth: 2;
    export const kWaveTriangle: 4;
    export const kWaveNoise: 8;
    export const kWavePOPhase: 16;
    export const kWavePODigital: 32;
    export const kWavePOVosim: 64;

    export namespace synth {
      export type Synth = {
        copy(): Synth;
        playNote(
          pitch: number | string,
          volume?: number,
          length?: number,
          when?: number
        ): void;
        playMIDINote(
          pitch: number | string,
          volume?: number,
          length?: number,
          when?: number
        ): void;
        noteOff(): void;
        stop(): void;
        isPlaying(): boolean;
        setADSR(
          attack: number,
          decay: number,
          sustain: number,
          release: number
        ): void;
        setAmplitudeMod(signal: signal.Signal): void;
        setAttack(time: number): void;
        setDecay(time: number): void;
        setFinishCallback(callback: () => any): void;
        setFrequencyMod(signal: signal.Signal): void;
        setLegato(flag: boolean): void;
        setParameter(parameter: string, value: number): void;
        setParameterMod(paramter: string, signal: signal.Signal): void;
        setRelease(time: number): void;
        setSustain(level: number): void;
        setVolume(left: number, right: number): void;
        getVolume(): number;
        setWaveform(waveform: Waveform | sample.Sample): void;
      };
      type Waveform =
        | typeof kWaveSine
        | typeof kWaveSquare
        | typeof kWaveSawtooth
        | typeof kWaveTriangle
        | typeof kWaveNoise
        | typeof kWavePOPhase
        | typeof kWavePODigital
        | typeof kWavePOVosim;

      function _new(waveform?: Waveform): Synth;
      function _new(
        sample: sample.Sample,
        sustainStart?: number,
        sustainEnd?: number
      ): Synth;
      export { _new as new };
    }

    // Effects
    export function addEffect(effect: Effect): void;
    export function removeEffect(effect: Effect): void;

    export namespace bitcrusher {
      type BitCrusher = {
        setMix(level: number): void;
        setMixMod(signal: signal.Signal): void;
        setAmount(amt: number): void;
        setAmountMod(signal: signal.Signal): void;
        setUndersampling(amt: number): void;
        setUndersamplingMod(signal: signal.Signal): void;
      };
      function _new(): BitCrusher;
      export { _new as new };
    }

    export namespace ringmod {
      type RingModulator = {
        setMix(level: number): void;
        setMixMod(signal: signal.Signal): void;
        setFrequency(f: number): void;
        setFrequencyMod(signal: signal.Signal): void;
      };
      function _new(): RingModulator;
      export { _new as new };
    }
    export namespace onepolefilter {
      type OnePoleFilter = {
        setMix(level: number): void;
        setMixMod(signal: signal.Signal): void;
        setParameter(p: any): void;
      };
      function _new(): OnePoleFilter;
      export { _new as new };
    }
    export const kFilterLowPass: 0;
    export const kFilterHighPass: 1;
    export const kFilterBandPass: 0;
    export const kFilterNotch: 2;
    export const kFilterPEQ: 4;
    export const kFilterLowShelf: 8;
    export const kFilterHighShelf: 16;
    export namespace twopolefilter {
      type TwoPoleFilterType =
        | typeof kFilterLowPass
        | "lowpass"
        | "lopass"
        | typeof kFilterHighPass
        | "highpass"
        | "hipass"
        | typeof kFilterBandPass
        | "bandpass"
        | typeof kFilterNotch
        | "notch"
        | typeof kFilterPEQ
        | "peq"
        | typeof kFilterLowShelf
        | "lowshelf"
        | "lowshelf"
        | typeof kFilterHighShelf
        | "highshelf"
        | "hishelf";
      export type TwoPoleFilter = {
        setMix(level: number): void;
        setMixMod(signal: signal.Signal): void;
        setFrequency(f: number): void;
        setFrequencyMod(signal: signal.Signal): void;
        setResonance(r: number): void;
        setResonanceMod(signal: signal.Signal): void;
        setGain(g: number): void;
        setType(type: TwoPoleFilterType): void;
      };
      function _new(type: TwoPoleFilterType): TwoPoleFilter;
      export { _new as new };
    }

    export namespace overdive {
      type Overdrive = {
        setMix(level: number): void;
        setMixMod(signal: signal.Signal): void;
        setGain(level: number): void;
        setLimit(level: number): void;
        setLimitMod(signal: signal.Signal): void;
        setOffset(level: number): void;
        setOffsetMod(signal: signal.Signal): void;
      };
      function _new(): Overdrive;
      export { _new as new };
    }

    export namespace delayline {
      type DelayLine = {
        setMix(level: number): void;
        setMixMod(signal: signal.Signal): void;
        addTap(delay: number): delaylinetap.DelayLineTap;
        setFeedback(level: number): void;
      };
      function _new(length: number): DelayLine;
      export { _new as new };
    }
    export namespace delaylinetap {
      export type DelayLineTap = {
        setDelay(time: number): void;
        setDelayMod(signal: signal.Signal): void;
        setVolume(level: number): void;
        getVolume(): number;
        setFlipChannels(flag: boolean): void;
      };
    }
    export namespace sequence {
      type Sequence = {
        play(finishCallback: (sequence: Sequence) => any): void;
        stop(): void;
        isPlaying(): boolean;
        getLength(): number;
        goToStep(step: number, play?: boolean): void;
        getCurrentStep(): number;
        setTempo(stepsPerSecond: number): void;
        getTempo(): number;
        setLoops(startStep: number, endStep: number, loopCount?: number): void;
        getTrackCount(): number;
        addTrack(track: track.Track): void;
        addTrackAtIndex(n: number, track: track.Track): void;
        getTrackAtIndex(n: number): track.Track;
        allNotesOff(): void;
      };
      function _new(midiPath: string): Sequence;
    }
    export namespace track {
      type NoteDefinition = {
        step: number;
        note: number | string;
        length: number;
        velocity: number;
      };
      export type Track = {
        addNote(
          step: number,
          note: number | string,
          length: number,
          velocity?: number
        ): void;
        addNote(table: NoteDefinition): void;
        setNotes(list: NoteDefinition[]): void;
        getNotes(step?: number, endStep?: number): NoteDefinition[];
        getLength(): number;
        getNotesActive(): number;
        getPolyphony(): number;
        setInstrument(instrument: instrument.Instrument): void;
        getInstrument(): instrument.Instrument;
        setMuted(flag: boolean): void;
        addControlSignal(s: controlsignal.ControlSignal): void;
        getControlSignals(): controlsignal.ControlSignal[];
      };
    }
    export namespace instrument {
      export type Instrument = {
        addVoice(
          v: synth.Synth,
          note?: string | number,
          rangeend?: number,
          transpose?: number
        ): void;
        setTranspose(halfsteps: number): void;
        playNote(
          frequency: number,
          vel?: number,
          length?: number,
          when?: number
        ): void;
        playMIDINote(
          note: number | string,
          vel?: number,
          length?: number,
          when?: number
        ): void;
        noteOff(note: number | string, when?: number): void;
        allNotesOff(): void;
        setVolume(left: number, right?: number): void;
        getVolume(): number;
      };
      function _new(synth?: boolean): Instrument;
      export { _new as new };
    }
    export namespace controlsignal {
      type Event = { step: number; value: number; interpolate?: boolean };
      export type ControlSignal = signal.Signal & {
        events: Event[];
        addEvent(step: number, value: number, interpolate?: boolean): void;
        addEvent(event: Event): void;
        clearEvents(): void;
        setControllerType(number: number): void;
        getControllerType(): number;
      };
      function _new(): ControlSignal;
      export { _new as new };
    }

    // Microphone
    export namespace micinput {
      export function recordToSample(
        buffer: sample.Sample,
        completionCallback: (sample: sample.Sample) => any
      ): void;
      export function stopRecording(): void;
      export function startListening(): void;
      export function stopListening(): void;
      export function getLevel(): number;
      export function getSource(): "headset" | "device";
    }

    // Output
    export function getHeadphoneState(
      changeCallback: null | (() => any)
    ): LuaMultiReturn<[boolean, boolean]>;
    export function setOutputsActive(
      headphones: boolean,
      speaker: boolean
    ): void;

    // Audio Device Time
    export function getCurrentTime(): number;
    export function resetTime(): void;

    type Source =
      | fileplayer.FilePlayer
      | sampleplayer.SamplePlayer
      | synth.Synth
      | instrument.Instrument;

    export function playingSources(): Source[];
  }
  // Strings
  export namespace string {
    export function UUID(length: number): string;
    export function trimWhitespace(string: string): string;
    export function trimLeadingWhitespace(string: string): string;
    export function trimTrailingWhitespace(string: string): string;
  }

  // Timers
  export namespace timer {
    type NoArgs = undefined;
    export type Timer<T extends {}[] | NoArgs = NoArgs> = {
      value: number;
      easingFunction:
      | EasingFunctions
      | ((t: number, b: number, c: number, d: number) => number);
      easingAmplitude: number;
      easingPeriod: number;
      reverseEasingFunction:
      | EasingFunctions
      | ((t: number, b: number, c: number, d: number) => number);
      startValue: number;
      endValue: number;
      pause(): void;
      start(): void;
      remove(): void;
      reset(): void;
      currentTime: Readonly<number>;
      delay: number;
      discardOnCompletion: boolean;
      duration: number;
      timeLeft: Readonly<number>;
      repeats: boolean;
      reverses: boolean;
      timerEndedCallback: T extends {}[]
      ? (...args: T) => any
      : (t: Timer) => any;
      timerEndedArgs: T;
      updateCallback: T extends {}[] ? (...args: T) => any : (t: Timer) => any;
    };
    export function performAfterDelay<T extends any[]>(
      delay: number,
      callback: (...args: T) => any,
      ...args: T
    ): void;
    export function performAfterDelay(
      delay: number,
      callback: (timer: Timer) => any
    ): void;
    export function updateTimers(): void;
    function _new(
      duration: number,
      startValue?: number,
      endValue?: number,
      easingFunction?: EasingFunctions
    ): Timer;
    function _new(duration: number, callback: (timer: Timer) => any): Timer;
    function _new<T extends {}[]>(
      duration: number,
      callback: (...args: T) => any,
      ...args: T
    ): Timer<T>;
    export { _new as new };

    export function keyRepeatTimer<T extends {}[]>(
      callback: (...args: T) => any,
      ...args: T
    ): Timer;
    export function keyRepeatTimerWithDelay<T extends {}[]>(
      delayAfter: number,
      initialFiring: number,
      delayAfterSecondFiring: number,
      callback: (...args: T) => any,
      ...args: T
    ): Timer;
    export function allTimers(): Timer[];
  }

  // Frame Timers
  export namespace frameTimer {
    export type FrameTimer<T extends {}[] | undefined = undefined> =
      timer.Timer<T> & {
        frame: number;
      };
    function _new(
      duration: number,
      startValue?: number,
      endValue?: number,
      easingFunction?: EasingFunctions
    ): FrameTimer;
    function _new<T extends {}[]>(
      duration: number,
      callback: (...args: T) => any,
      ...args: T
    ): FrameTimer<T>;
    export function performAfterDelay<T extends any[]>(
      delay: number,
      callback: (...args: T) => any,
      ...args: T
    ): void;
    export function performAfterDelay(
      delay: number,
      callback: (timer: FrameTimer) => any
    ): void;
    export function updateTimers(): void;
    export function allTimers(): FrameTimer[];
    export { _new as new };
  }

  // UI Components
  export namespace ui {
    export namespace crankIndicator {
      /** @noSelf */
      export function start(): void;
      /** @noSelf */
      export function update(): void;
      export const clockwise: boolean;
    }
    export namespace gridview {
      type GridView = {
        backgroundImage: Image | graphics.NineSlice;
        isScrolling: Readonly<boolean>;
        scrollEasingFunction:
        | EasingFunctions
        | ((t: number, b: number, c: number, d: number) => number);
        easingAmplitude: number;
        easingPeriod: number;
        changeRowOnColumnWrap: boolean;
        scrollCellsToCenter: boolean;

        drawCell(
          section: number,
          row: number,
          column: number,
          selected: boolean,
          x: number,
          y: number,
          width: number,
          height: number
        ): void;
        drawSectionHeader(
          section: number,
          x: number,
          y: number,
          width: number,
          height: number
        ): void;
        drawHorizontalDivider(
          x: number,
          y: number,
          width: number,
          height: number
        ): void;
        drawInRect(x: number, y: number, width: number, height: number): void;
        needsDisplay: Readonly<boolean>;
        setNumberOfSections(num: number): void;
        getNumberOfSections(): number;
        setNumberOfRowsInSection(section: number, num: number): void;
        getNumberOfRowsInSection(section: number): number;
        setNumberOfColumns(num: number): void;
        getNumberOfColumns(): number;
        setNumberOfRows(...numbers: number[]): void;
        setCellSize(cellWidth: number, cellHeight: number): void;
        setCellPadding(
          left: number,
          right: number,
          top: number,
          bottom: number
        ): void;
        setContentInset(
          left: number,
          right: number,
          top: number,
          bottom: number
        ): void;
        getCellBounds(
          section: number,
          row: number,
          column: number,
          gridWidth?: number
        ): LuaMultiReturn<[number, number, number, number]>;
        setSectionHeaderHeight(height: number): void;
        getSectionHeaderHeight(): number;
        setSectionHeaderPadding(
          left: number,
          right: number,
          top: number,
          bottom: number
        ): void;
        setHorizontalDividerHeight(height: number): void;
        getHorizontalDividerHeight(): number;
        addHorizontalDividerAbove(section: number, row: number): void;
        removeHorizontalDividers(): void;
        setScrollDuration(ms: number): void;
        setScrollPosition(x: number, y: number, animated?: boolean): void;
        getScrollPosition(): LuaMultiReturn<[number, number]>;
        scrollToCell(
          section: number,
          row: number,
          column: number,
          animated?: boolean
        ): void;
        scrollCellToCenter(
          section: number,
          row: number,
          column: number,
          animated?: boolean
        ): void;
        scrollToRow(row: number, animated?: boolean): void;
        scrollToTop(animated?: boolean): void;
        setSelection(row: number, column: number): void;
        getSelection(): LuaMultiReturn<[number, number]>;
        setSelectedRow(row: number): void;
        getSelectedRow(): number;
        selectNextRow(
          wrapSelection: boolean,
          scrollToSelection?: boolean,
          animate?: boolean
        ): void;
        selectPreviousRow(
          wrapSelection: boolean,
          scrollToSelection?: boolean,
          animate?: boolean
        ): void;
        selectNextColumn(
          wrapSelection: boolean,
          scrollToSelection?: boolean,
          animate?: boolean
        ): void;
        selectPreviousColumn(
          wrapSelection: boolean,
          scrollToSelection?: boolean,
          animate?: boolean
        ): void;
      };
      function _new(cellWidth: number, cellHeight: number): GridView;
      export { _new as new };
    }
  }

  // Garbage collection
  export function setCollectsGarbage(flag: boolean): void;
  export function setMinimumGCTime(ms: number): void;
  export function setGCScaling(min: number, max: number): void;
}
//   drawFPS: Function;
//   easingFunctions: any;
//   file: any;
//   geometry: any;
//   getCrankChange: Function;
//   getCurrentTimeMilliseconds: Function;
//   getSecondsSinceEpoch: Function;

//   kButtonA: number;
//   kButtonDown: number;
//   kButtonLeft: number;
//   kButtonRight: number;
//   kButtonUp: number;

//   pathfinder: any;
//   readAccelerometer: Function;
//   sound: any;
//   startAccelerometer: Function;
//   stop: Function;
//   timer: any;
//   ui: any;
//   wait: Function;

//   graphics: {
//     animation: any;
//     animator: any;
//     drawArc: (this: void) => void;
//     drawCircleAtPoint: (this: void) => void;
//     drawCircleInRect: (this: void) => void;
//     drawEllipseInRect: (this: void, x: number, y: number, width: number, height: number) => void;
//     drawLine: (this: void) => void;
//     drawLocalizedTextAligned: (this: void) => void;
//     drawLocalizedTextInRect: (this: void) => void;
//     drawPolygon: (this: void) => void;
//     drawQRCode: (this: void) => void;
//     drawRect: (this: void, x: number, y: number, width: number, height: number) => void;
//     drawSineWave: Function;
//     drawText: (this: void) => void;
//     drawTextAligned: (this: void) => void;
//     drawTextInRect: (this: void) => void;
//     fillCircleAtPoint: (this: void) => void;
//     fillCircleInRect: (this: void) => void;
//     fillEllipseInRect: (this: void) => void;
//     fillRect: (this: void, x: number, y: number, width: number, height: number) => void;
//     fillRoundRect: (this: void) => void;
//     fillTriangle: (this: void) => void;
//     font: any;
//     getClipRect: (this: void) => void;
//     getFont: (this: void) => void;
//     getImageDrawMode: (this: void) => void;
//     getLocalizedText: (this: void) => void;
//     getTextSize: (this: void) => void;
//     getTextSizeForMaxWidth: (this: void) => void;
//     image: any;
//     imagetable: any;
//     kColorBlack: any;
//     kColorClear: any;
//     kColorWhite: any;
//     kDrawModeCopy: any;
//     kDrawModeNXOR: any;
//     nineSlice: any;
//     popContext: (this: void) => void;
//     pushContext: (this: void) => void;
//     setClipRect: (this: void) => void;
//     setColor: (this: void, color: number) => void;
//     setFont: (this: void) => void;
//     setFontTracking: (this: void) => void;
//     setImageDrawMode: (this: void,) => void;
//     setPattern: (this: void, arr: number[]) => void;
//     sprite: any;
//     tilemap: any;
//   };
// }
