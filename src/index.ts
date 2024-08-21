type TupleOfNumbers<
  Num extends number,
  Acc extends number[] = []
> = Acc["length"] extends Num
  ? Acc
  :
      | TupleOfNumbers<Num, [...Acc, number]>
      | (Acc["length"] extends 0 ? never : Acc);

type TranslateUnit =
  | "px"
  | "em"
  | "rem"
  | "vw"
  | "vh"
  | "%"
  | "svh"
  | "svw"
  | "lvh"
  | "lvw"
  | "vmax"
  | "vmin"
  | "lh"
  | "rlh"
  | "in"
  | "pt";
type RotateUnit = "deg" | "rad" | "grad" | "turn";
type Unit = TranslateUnit | RotateUnit | "";

export default class CSSTransformBuilder {
  private readonly queue: string[];

  public constructor(queue: string[] = []) {
    this.queue = queue;
  }

  private addOperation(fn: string, val: string) {
    return new CSSTransformBuilder([...this.queue, `${fn}(${val})`]);
  }

  private addOperationNumbers(fn: string, nums: number[], unit: Unit = "") {
    return this.addOperation(fn, nums.map((n) => `${n}${unit}`).join(","));
  }

  // matrix(数値, 数値, 数値, 数値, 数値, 数値)
  // matrix3d(数値, 数値, 数値, 数値, 数値, 数値, 数値, 数値, 数値, 数値, 数値, 数値, 数値, 数値, 数値, 数値)

  public scale(...nums: TupleOfNumbers<3>) {
    return this.addOperationNumbers("scale", nums);
  }

  public scaleX(x: number) {
    return this.addOperationNumbers("scaleX", [x]);
  }

  public scaleY(y: number) {
    return this.addOperationNumbers("scaleY", [y]);
  }

  public scaleZ(z: number) {
    return this.addOperationNumbers("scaleZ", [z]);
  }

  public scale3d(x: number, y: number, z: number) {
    return this.addOperationNumbers("scale3d", [x, y, z]);
  }

  public translate(x: number, y: number, unit: TranslateUnit = "px") {
    return this.addOperationNumbers("translate", [x, y], unit);
  }

  public translateX(x: number, unit: TranslateUnit = "px") {
    return this.addOperationNumbers("translateX", [x], unit);
  }

  public translateY(y: number, unit: TranslateUnit = "px") {
    return this.addOperationNumbers("translateY", [y], unit);
  }

  public translateZ(z: number, unit: TranslateUnit = "px") {
    return this.addOperationNumbers("translateZ", [z], unit);
  }

  public translate3d(
    x: number,
    y: number,
    z: number,
    unit: TranslateUnit = "px"
  ) {
    return this.addOperationNumbers("translate3d", [x, y, z], unit);
  }

  public rotate(num: number, unit: RotateUnit = "deg") {
    return this.addOperationNumbers("rotate", [num], unit);
  }

  public rotate3d(
    x: number,
    y: number,
    z: number,
    deg: number,
    unit: RotateUnit = "deg"
  ) {
    return this.addOperation("rotate3d", [x, y, z, `${deg}${unit}`].join(","));
  }

  public rotateX(num: number, unit: RotateUnit = "deg") {
    return this.addOperationNumbers("rotateX", [num], unit);
  }

  public rotateY(num: number, unit: RotateUnit = "deg") {
    return this.addOperationNumbers("rotateY", [num], unit);
  }

  public rotateZ(num: number, unit: RotateUnit = "deg") {
    return this.addOperationNumbers("rotateZ", [num], unit);
  }

  public skew(x: number, y: number, unit: RotateUnit = "deg") {
    return this.addOperationNumbers("skew", [x, y], unit);
  }

  public skewX(num: number, unit: RotateUnit = "deg") {
    return this.addOperationNumbers("skewX", [num], unit);
  }

  public skewY(num: number, unit: RotateUnit = "deg") {
    return this.addOperationNumbers("skewY", [num], unit);
  }

  public perspective(num: number) {
    return this.addOperationNumbers("perspective", [num]);
  }

  public toString() {
    return this.queue.length ? this.queue.join(" ") : "none";
  }
}

export const buildTransform = (
  chain: (t: CSSTransformBuilder) => CSSTransformBuilder
) => chain(new CSSTransformBuilder()).toString();
