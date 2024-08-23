type TupleOfNumbers<Num extends number, Acc extends number[] = []> = Acc["length"] extends Num ? Acc : TupleOfNumbers<Num, [...Acc, number]> | (Acc["length"] extends 0 ? never : Acc);
type PrimitiveTranslateUnit = "px" | "em" | "rem" | "vw" | "vh" | "%" | "svh" | "svw" | "lvh" | "lvw" | "vmax" | "vmin" | "lh" | "rlh" | "in" | "pt";
type PrimitiveRotateUnit = "deg" | "rad" | "grad" | "turn";
type PrimitiveUnit = PrimitiveTranslateUnit | PrimitiveRotateUnit;
type NumWithUnit<T extends PrimitiveUnit = PrimitiveUnit> = `${number}${T}`;
export type CustomUnit<T extends PrimitiveUnit = PrimitiveUnit> = (num: number) => NumWithUnit<T>;
type CssTransformProps<T extends PrimitiveUnit> = number | NumWithUnit<T>;
type Operator = "+" | "-" | "*" | "/";
type CalcArray<T extends PrimitiveUnit = PrimitiveUnit> = [
    CssTransformProps<T> | CalcArray<T>,
    Operator,
    CssTransformProps<T> | CalcArray<T>
];
type CommonProps<T extends PrimitiveUnit = PrimitiveUnit> = CssTransformProps<T> | CalcArray<T>;
type TupleOfNumberHasUnit<Num extends number, Unit extends PrimitiveUnit, Acc extends CommonProps<Unit>[] = []> = Acc["length"] extends Num ? [...Acc, (Unit | CustomUnit<Unit>)?] : TupleOfNumberHasUnit<Num, Unit, [...Acc, CommonProps<Unit>]>;
type PropsHasUnitFn<Num extends number, Unit extends PrimitiveUnit> = (...props: TupleOfNumberHasUnit<Num, Unit>) => CSSTransformBuilder;
export default class CSSTransformBuilder {
    private readonly queue;
    constructor(queue?: string[]);
    private addOperation;
    private addOperationNumbers;
    scale(...nums: TupleOfNumbers<3>): CSSTransformBuilder;
    scaleX(x: number): CSSTransformBuilder;
    scaleY(y: number): CSSTransformBuilder;
    scaleZ(z: number): CSSTransformBuilder;
    scale3d(x: number, y: number, z: number): CSSTransformBuilder;
    translate: PropsHasUnitFn<2, PrimitiveTranslateUnit>;
    translateX: PropsHasUnitFn<1, PrimitiveTranslateUnit>;
    translateY: PropsHasUnitFn<1, PrimitiveTranslateUnit>;
    translateZ: PropsHasUnitFn<1, PrimitiveTranslateUnit>;
    translate3d: PropsHasUnitFn<3, PrimitiveTranslateUnit>;
    rotate: PropsHasUnitFn<1, PrimitiveRotateUnit>;
    rotate3d: PropsHasUnitFn<4, PrimitiveRotateUnit>;
    rotateX: PropsHasUnitFn<1, PrimitiveRotateUnit>;
    rotateY: PropsHasUnitFn<1, PrimitiveRotateUnit>;
    rotateZ: PropsHasUnitFn<1, PrimitiveRotateUnit>;
    skew: PropsHasUnitFn<2, PrimitiveRotateUnit>;
    skewX: PropsHasUnitFn<1, PrimitiveRotateUnit>;
    skewY: PropsHasUnitFn<1, PrimitiveRotateUnit>;
    perspective(num: number): CSSTransformBuilder;
    toString(): string;
}
export declare const buildTransform: (chain: (t: CSSTransformBuilder) => CSSTransformBuilder) => string;
export {};
