export default class CSSTransformBuilder {
    private readonly queue;
    constructor(queue?: string[]);
    private addOperation;
    private addOperationNumbers;
    scale(x: number, y: number): CSSTransformBuilder;
    scaleX(x: number): CSSTransformBuilder;
    scaleY(y: number): CSSTransformBuilder;
    scaleZ(z: number): CSSTransformBuilder;
    scale3d(x: number, y: number, z: number): CSSTransformBuilder;
    translate(x: number, y: number, unit?: string): CSSTransformBuilder;
    translateX(x: number, unit?: string): CSSTransformBuilder;
    translateY(y: number, unit?: string): CSSTransformBuilder;
    translateZ(z: number, unit?: string): CSSTransformBuilder;
    translate3d(x: number, y: number, z: number, unit?: string): CSSTransformBuilder;
    rotate(num: number, unit?: string): CSSTransformBuilder;
    rotate3d(x: number, y: number, z: number, deg: number, unit?: string): CSSTransformBuilder;
    rotateX(num: number, unit?: string): CSSTransformBuilder;
    rotateY(num: number, unit?: string): CSSTransformBuilder;
    rotateZ(num: number, unit?: string): CSSTransformBuilder;
    skew(x: number, y: number, unit?: string): CSSTransformBuilder;
    skewX(num: number, unit?: string): CSSTransformBuilder;
    skewY(num: number, unit?: string): CSSTransformBuilder;
    perspective(num: number): CSSTransformBuilder;
    toString(): string;
}
export declare const buildTransform: (chain: (t: CSSTransformBuilder) => CSSTransformBuilder) => string;
