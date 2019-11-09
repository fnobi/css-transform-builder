import CSSTransformBuilder from '../src/';

describe('build single transform functions', () => {
    it('scale', () => {
        const transform = new CSSTransformBuilder().scale(1, 2);
        expect(transform.toString()).toEqual('scale(1,2)');
    });
    it('translate', () => {
        const transform = new CSSTransformBuilder().translate(10, 10);
        expect(transform.toString()).toEqual('translate(10px,10px)');
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
});