"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildTransform = void 0;
const calcSolver = (calc) => {
    const calcArraySolver = (calc) => calc
        .map((c) => (Array.isArray(c) ? `(${calcArraySolver(c)})` : c))
        .join(" ");
    return `calc(${calcArraySolver(calc)})`;
};
class CSSTransformBuilder {
    constructor(queue = []) {
        this.translate = (x, y, unit = "px") => this.addOperationNumbers("translate", [x, y], unit);
        this.translateX = (x, unit = "px") => this.addOperationNumbers("translateX", [x], unit);
        this.translateY = (y, unit = "px") => this.addOperationNumbers("translateY", [y], unit);
        this.translateZ = (z, unit = "px") => this.addOperationNumbers("translateZ", [z], unit);
        this.translate3d = (x, y, z, unit = "px") => this.addOperationNumbers("translate3d", [x, y, z], unit);
        this.rotate = (num, unit = "deg") => this.addOperationNumbers("rotate", [num], unit);
        this.rotate3d = (x, y, z, deg, unit = "deg") => this.addOperation("rotate3d", [x, y, z, `${deg}${unit}`].join(","));
        this.rotateX = (num, unit = "deg") => this.addOperationNumbers("rotateX", [num], unit);
        this.rotateY = (num, unit = "deg") => this.addOperationNumbers("rotateY", [num], unit);
        this.rotateZ = (num, unit = "deg") => this.addOperationNumbers("rotateZ", [num], unit);
        this.skew = (x, y, unit = "deg") => this.addOperationNumbers("skew", [x, y], unit);
        this.skewX = (num, unit = "deg") => this.addOperationNumbers("skewX", [num], unit);
        this.skewY = (num, unit = "deg") => this.addOperationNumbers("skewY", [num], unit);
        this.queue = queue;
    }
    addOperation(fn, val) {
        return new CSSTransformBuilder([...this.queue, `${fn}(${val})`]);
    }
    addOperationNumbers(fn, nums, unit = "") {
        return this.addOperation(fn, nums
            .map((n) => typeof n === "string"
            ? n
            : Array.isArray(n)
                ? calcSolver(n)
                : typeof unit === "string"
                    ? `${n}${unit}`
                    : unit(n))
            .join(","));
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