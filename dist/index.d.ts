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
    translate(x: number, y: number): CSSTransformBuilder;
    translateX(num: number): CSSTransformBuilder;
    translateY(num: number): CSSTransformBuilder;
    translateZ(num: number): CSSTransformBuilder;
    translate3d(x: number, y: number, z: number): CSSTransformBuilder;
    rotate(num: number): CSSTransformBuilder;
    rotate3d(x: number, y: number, z: number, deg: number): CSSTransformBuilder;
    rotateX(num: number): CSSTransformBuilder;
    rotateY(num: number): CSSTransformBuilder;
    rotateZ(num: number): CSSTransformBuilder;
    skew(x: number, y: number): CSSTransformBuilder;
    skewX(num: number): CSSTransformBuilder;
    skewY(num: number): CSSTransformBuilder;
    perspective(num: number): CSSTransformBuilder;
    toString(): string;
}
