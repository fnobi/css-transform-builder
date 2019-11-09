"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CSSTransformBuilder {
    constructor(queue = []) {
        this.queue = queue;
    }
    addOperation(fn, val) {
        return new CSSTransformBuilder([...this.queue, `${fn}(${val})`]);
    }
    addOperationNumbers(fn, nums, unit = "") {
        return this.addOperation(fn, nums.map(n => `${n}${unit}`).join(","));
    }
    // matrix(数値, 数値, 数値, 数値, 数値, 数値)
    // matrix3d(数値, 数値, 数値, 数値, 数値, 数値, 数値, 数値, 数値, 数値, 数値, 数値, 数値, 数値, 数値, 数値)
    scale(x, y) {
        return this.addOperationNumbers("scale", [x, y]);
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
    translate(x, y) {
        return this.addOperationNumbers("translate", [x, y], "px");
    }
    translateX(num) {
        return this.addOperationNumbers("translateX", [num], "px");
    }
    translateY(num) {
        return this.addOperationNumbers("translateY", [num], "px");
    }
    translateZ(num) {
        return this.addOperationNumbers("translateZ", [num], "px");
    }
    translate3d(x, y, z) {
        return this.addOperationNumbers("translate3d", [x, y, z], "px");
    }
    rotate(num) {
        return this.addOperationNumbers("rotate", [num], "deg");
    }
    rotate3d(x, y, z, deg) {
        return this.addOperation("rotate3d", [x, y, z, `${deg}deg`].join(","));
    }
    rotateX(num) {
        return this.addOperationNumbers("rotateX", [num], "deg");
    }
    rotateY(num) {
        return this.addOperationNumbers("rotateY", [num], "deg");
    }
    rotateZ(num) {
        return this.addOperationNumbers("rotateZ", [num], "deg");
    }
    skew(x, y) {
        return this.addOperationNumbers("skew", [x, y], "deg");
    }
    skewX(num) {
        return this.addOperationNumbers("skewX", [num], "deg");
    }
    skewY(num) {
        return this.addOperationNumbers("skewY", [num], "deg");
    }
    perspective(num) {
        return this.addOperationNumbers("perspective", [num]);
    }
    toString() {
        return this.queue.length ? this.queue.join(" ") : "none";
    }
}
exports.default = CSSTransformBuilder;
//# sourceMappingURL=index.js.map