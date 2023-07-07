abstract class Stage {
  abstract onActivate(): void;
  abstract update(): void;
  abstract render(): void;
  abstract onDestroy(): void;
}

export { Stage };
