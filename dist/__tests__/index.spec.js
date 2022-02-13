"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importStar(require(".."));
describe('build single transform functions', () => {
    it('scale', () => {
        const transform = new __1.default().scale(1, 2);
        expect(transform.toString()).toEqual('scale(1,2)');
    });
    it('translate', () => {
        const transform = new __1.default().translate(10, 10);
        expect(transform.toString()).toEqual('translate(10px,10px)');
    });
    it('translate with unit', () => {
        const transform = new __1.default().translate(20, 30, '%');
        expect(transform.toString()).toEqual('translate(20%,30%)');
    });
});
describe('multi functions', () => {
    it('none', () => {
        const transform = new __1.default();
        expect(transform.toString()).toBe('none');
    });
    it('connect with space', () => {
        const transform = new __1.default()
            .scale(10, 10)
            .translate(10, 10);
        expect(transform.toString()).toBe('scale(10,10) translate(10px,10px)');
    });
    it('chain don\'t change base transform', () => {
        const transform = new __1.default().scale(10, 10);
        const transform2 = transform.translate(10, 10);
        expect(transform.toString()).toBe('scale(10,10)');
        expect(transform2.toString()).toBe('scale(10,10) translate(10px,10px)');
    });
    it('axis translate', () => {
        const transform = new __1.default().translateX(1).translateY(2).translateZ(3);
        expect(transform.toString()).toEqual('translateX(1px) translateY(2px) translateZ(3px)');
    });
});
describe('functional', () => {
    it('scale and translate', () => {
        const res = __1.buildTransform(t => t.scale(1, 2).translate(10, 10));
        expect(res).toEqual('scale(1,2) translate(10px,10px)');
    });
});
//# sourceMappingURL=index.spec.js.map