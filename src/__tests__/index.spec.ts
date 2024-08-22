import CSSTransformBuilder, { buildTransform } from "..";

describe("build single transform functions", () => {
  it("scale", () => {
    const transform = new CSSTransformBuilder().scale(1, 2);
    expect(transform.toString()).toBe("scale(1,2)");
  });
  it("scale with a argument", () => {
    const transform = new CSSTransformBuilder().scale(2);
    expect(transform.toString()).toBe("scale(2)");
  });
  it("translate", () => {
    const transform = new CSSTransformBuilder().translate(10, 10);
    expect(transform.toString()).toBe("translate(10px,10px)");
  });
  it("translate with unit", () => {
    const transform = new CSSTransformBuilder().translate(20, 30, "%");
    expect(transform.toString()).toBe("translate(20%,30%)");
  });
  it("translate with custom unit", () => {
    const customUnit = (n: number) =>  (n * 2) + "vw";
    const transform = new CSSTransformBuilder().translate(20, 30, customUnit);
    expect(transform.toString()).toBe("translate(40vw,60vw)");
  });
});

describe("multi functions", () => {
  it("none", () => {
    const transform = new CSSTransformBuilder();
    expect(transform.toString()).toBe("none");
  });
  it("connect with space", () => {
    const transform = new CSSTransformBuilder().scale(10, 10).translate(10, 10);
    expect(transform.toString()).toBe("scale(10,10) translate(10px,10px)");
  });
  it("chain don't change base transform", () => {
    const transform = new CSSTransformBuilder().scale(10, 10);
    const transform2 = transform.translate(10, 10);
    expect(transform.toString()).toBe("scale(10,10)");
    expect(transform2.toString()).toBe("scale(10,10) translate(10px,10px)");
  });
  it("axis translate", () => {
    const transform = new CSSTransformBuilder()
      .translateX(1)
      .translateY(2)
      .translateZ(3);
    expect(transform.toString()).toBe(
      "translateX(1px) translateY(2px) translateZ(3px)"
    );
  });
  it("axis translate with unit", () => {
    const customUnit = (n: number) =>  (n * 2) + "vw";
    const transform = new CSSTransformBuilder()
      .translateX(1)
      .translateY(2, "%")
      .translateZ(3, customUnit);
    expect(transform.toString()).toBe("translateX(1px) translateY(2%) translateZ(6vw)");
  });
});

describe("functional", () => {
  it("scale and translate", () => {
    const res = buildTransform((t) => t.scale(1, 2).translate(10, 10));
    expect(res).toBe("scale(1,2) translate(10px,10px)");
  });
});
