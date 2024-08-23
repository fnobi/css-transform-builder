type TupleOfNumbers<
  Num extends number,
  Acc extends number[] = []
> = Acc["length"] extends Num
  ? Acc
  :
      | TupleOfNumbers<Num, [...Acc, number]>
      | (Acc["length"] extends 0 ? never : Acc);

type PrimitiveTranslateUnit =
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
type PrimitiveRotateUnit = "deg" | "rad" | "grad" | "turn";
type PrimitiveUnit = PrimitiveTranslateUnit | PrimitiveRotateUnit;

type NumWithUnit<T extends PrimitiveUnit = PrimitiveUnit> = `${number}${T}`;

export type CustomUnit<T extends PrimitiveUnit = PrimitiveUnit> = (
  num: number
) => NumWithUnit<T>;

type CommonProps<T extends PrimitiveUnit = PrimitiveUnit> =
  | number
  | NumWithUnit<T>;

type TupleOfNumberHasUnit<
  Num extends number,
  Unit extends PrimitiveUnit,
  Acc extends CommonProps<Unit>[] = []
> = Acc["length"] extends Num
  ? [...Acc, (Unit | CustomUnit<Unit>)?]
  : TupleOfNumberHasUnit<Num, Unit, [...Acc, CommonProps<Unit>]>;

type Unit = PrimitiveUnit | CustomUnit | "";

type PropsHasUnitFn<Num extends number, Unit extends PrimitiveUnit> = (
  ...props: TupleOfNumberHasUnit<Num, Unit>
) => CSSTransformBuilder;

export default class CSSTransformBuilder {
  private readonly queue: string[];

  public constructor(queue: string[] = []) {
    this.queue = queue;
  }

  private addOperation(fn: string, val: string) {
    return new CSSTransformBuilder([...this.queue, `${fn}(${val})`]);
  }

  private addOperationNumbers(
    fn: string,
    nums: CommonProps[],
    unit: Unit = ""
  ) {
    return this.addOperation(
      fn,
      nums
        .map((n) =>
          typeof n === "string"
            ? n
            : typeof unit === "string"
            ? `${n}${unit}`
            : unit(n)
        )
        .join(",")
    );
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

  public translate: PropsHasUnitFn<2, PrimitiveTranslateUnit> = (
    x,
    y,
    unit = "px"
  ) => this.addOperationNumbers("translate", [x, y], unit);

  public translateX: PropsHasUnitFn<1, PrimitiveTranslateUnit> = (
    x,
    unit = "px"
  ) => this.addOperationNumbers("translateX", [x], unit);

  public translateY: PropsHasUnitFn<1, PrimitiveTranslateUnit> = (
    y,
    unit = "px"
  ) => this.addOperationNumbers("translateY", [y], unit);

  public translateZ: PropsHasUnitFn<1, PrimitiveTranslateUnit> = (
    z,
    unit = "px"
  ) => this.addOperationNumbers("translateZ", [z], unit);

  public translate3d: PropsHasUnitFn<3, PrimitiveTranslateUnit> = (
    x,
    y,
    z,
    unit = "px"
  ) => this.addOperationNumbers("translate3d", [x, y, z], unit);

  public rotate: PropsHasUnitFn<1, PrimitiveRotateUnit> = (num, unit = "deg") =>
    this.addOperationNumbers("rotate", [num], unit);

  public rotate3d: PropsHasUnitFn<4, PrimitiveRotateUnit> = (
    x,
    y,
    z,
    deg,
    unit = "deg"
  ) => this.addOperation("rotate3d", [x, y, z, `${deg}${unit}`].join(","));

  public rotateX: PropsHasUnitFn<1, PrimitiveRotateUnit> = (
    num,
    unit = "deg"
  ) => this.addOperationNumbers("rotateX", [num], unit);

  public rotateY: PropsHasUnitFn<1, PrimitiveRotateUnit> = (
    num,
    unit = "deg"
  ) => this.addOperationNumbers("rotateY", [num], unit);

  public rotateZ: PropsHasUnitFn<1, PrimitiveRotateUnit> = (
    num,
    unit = "deg"
  ) => this.addOperationNumbers("rotateZ", [num], unit);

  public skew: PropsHasUnitFn<2, PrimitiveRotateUnit> = (x, y, unit = "deg") =>
    this.addOperationNumbers("skew", [x, y], unit);

  public skewX: PropsHasUnitFn<1, PrimitiveRotateUnit> = (num, unit = "deg") =>
    this.addOperationNumbers("skewX", [num], unit);

  public skewY: PropsHasUnitFn<1, PrimitiveRotateUnit> = (num, unit = "deg") =>
    this.addOperationNumbers("skewY", [num], unit);

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
