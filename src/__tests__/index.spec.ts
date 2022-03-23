import CSSTransformBuilder, { buildTransform } from "..";

describe('build single transform functions', () => {
    it('scale', () => {
        const transform = new CSSTransformBuilder().scale(1, 2);
        expect(transform.toString()).toEqual('scale(1,2)');
    });
    it('scale with a argument', () => {
        const transform = new CSSTransformBuilder().scale(2);
        expect(transform.toString()).toEqual('scale(2)');
    });
    it('translate', () => {
        const transform = new CSSTransformBuilder().translate(10, 10);
        expect(transform.toString()).toEqual('translate(10px,10px)');
    });
    it('translate with unit', () => {
        const transform = new CSSTransformBuilder().translate(20, 30, '%');
        expect(transform.toString()).toEqual('translate(20%,30%)');
    });
});

describe('multi functions', () => {
    it('none', () => {
        const transform = new CSSTransformBuilder();
        expect(transform.toString()).toBe('none');
    });
    it('connect with space', () => {
        const transform = new CSSTransformBuilder()
            .scale(10, 10)
            .translate(10, 10);
        expect(transform.toString()).toBe('scale(10,10) translate(10px,10px)');
    });
    it('chain don\'t change base transform', () => {
        const transform = new CSSTransformBuilder().scale(10, 10);
        const transform2 = transform.translate(10, 10);
        expect(transform.toString()).toBe('scale(10,10)');
        expect(transform2.toString()).toBe('scale(10,10) translate(10px,10px)');
    });
    it('axis translate', () => {
        const transform = new CSSTransformBuilder().translateX(1).translateY(2).translateZ(3);
        expect(transform.toString()).toEqual('translateX(1px) translateY(2px) translateZ(3px)');
    });
});

describe('functional', () => {
    it('scale and translate', () => {
        const res = buildTransform(t => t.scale(1, 2).translate(10, 10));
        expect(res).toEqual('scale(1,2) translate(10px,10px)');
    });
});