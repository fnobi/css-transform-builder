"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTransform = void 0;
class CSSTransformBuilder {
    constructor(queue = []) {
        this.queue = queue;
    }
    addOperation(fn, val) {
        return new CSSTransformBuilder([...this.queue, `${fn}(${val})`]);
    }
    addOperationNumbers(fn, nums, unit = "") {
        return this.addOperation(fn, nums.map((n) => `${n}${unit}`).join(","));
    }
    // matrix(数値, 数値, 数値, 数値, 数値, 数値)
    // matrix3d(数値, 数値, 数値, 数値, 数値, 数値, 数値, 数値, 数値, 数値, 数値, 数値, 数値, 数値, 数値, 数値)
    scale(...nums) {
        return this.addOperationNumbers("scale", nums);
    }
    scaleX(x) {
        return this.addOperationNumbers("scaleX", [x]);
    }
    scaleY(y) {
        return this.addOperationNumbers("scaleY", [y]);
    }
    scaleZ(z) {
        return this.addOperationNumbers("scaleZ", [z]);
    }
    scale3d(x, y, z) {
        return this.addOperationNumbers("scale3d", [x, y, z]);
    }
    translate(x, y, unit = "px") {
        return this.addOperationNumbers("translate", [x, y], unit);
    }
    translateX(x, unit = "px") {
        return this.addOperationNumbers("translateX", [x], unit);
    }
    translateY(y, unit = "px") {
        return this.addOperationNumbers("translateY", [y], unit);
    }
    translateZ(z, unit = "px") {
        return this.addOperationNumbers("translateZ", [z], unit);
    }
    translate3d(x, y, z, unit = "px") {
        return this.addOperationNumbers("translate3d", [x, y, z], unit);
    }
    rotate(num, unit = "deg") {
        return this.addOperationNumbers("rotate", [num], unit);
    }
    rotate3d(x, y, z, deg, unit = "deg") {
        return this.addOperation("rotate3d", [x, y, z, `${deg}${unit}`].join(","));
    }
    rotateX(num, unit = "deg") {
        return this.addOperationNumbers("rotateX", [num], unit);
    }
    rotateY(num, unit = "deg") {
        return this.addOperationNumbers("rotateY", [num], unit);
    }
    rotateZ(num, unit = "deg") {
        return this.addOperationNumbers("rotateZ", [num], unit);
    }
    skew(x, y, unit = "deg") {
        return this.addOperationNumbers("skew", [x, y], unit);
    }
    skewX(num, unit = "deg") {
        return this.addOperationNumbers("skewX", [num], unit);
    }
    skewY(num, unit = "deg") {
        return this.addOperationNumbers("skewY", [num], unit);
    }
    perspective(num) {
        return this.addOperationNumbers("perspective", [num]);
    }
    toString() {
        return this.queue.length ? this.queue.join(" ") : "none";
    }
}
exports.default = CSSTransformBuilder;
const buildTransform = (chain) => chain(new CSSTransformBuilder()).toString();
exports.buildTransform = buildTransform;
//# sourceMappingURL=index.js.map