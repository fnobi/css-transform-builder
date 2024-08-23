# css-transform-builder

[![master-build](https://github.com/fnobi/css-transform-builder/actions/workflows/masterBuild.yml/badge.svg?branch=master)](https://github.com/fnobi/css-transform-builder/actions/workflows/masterBuild.yml)

## class base

```ts
import CSSTransformBuilder from "css-transform-builder";

const transform = new CSSTransformBuilder().scale(1, 2);
console.log(transform.toString());
// => "scale(1,2)"

const transform2 = transform.translate(10, 10);
console.log(transform2.toString());
// => "scale(1,2) translate(10px,10px)"

const transform3 = new CSSTransformBuilder().rotate(20).translateY(10, "%");
console.log(transform3.toString());
// => "rotate(20deg) translateY(10%)"

const customFunc: CustomUnit<"vw"> = (n) => `${n * 2}vw`;
const transform4 = new CSSTransformBuilder().translate(10, 10, customFunc);
console.log(transform4.toString());
// => "translate(20vw,20vw)"

const transform5 = new CSSTransformBuilder().translateY("10%");
console.log(transform5.toString());
// => "translateY(10%)"

const transform6 = new CSSTransformBuilder().translateX([["20px", "+", "10px"], "+", ["20px", "+", "10px"]]);
console.log(transform6.toString());
// => "translateX(calc((20px + 10px) + (20px + 10px)))"
```

## functional

```ts
import { buildTransform } from "css-transform-builder";

console.log(buildTransform(t => t.scale(1, 2)));
// => "scale(1,2)"

console.log(buildTransform(t => t.scale(1, 2).translate(10, 10)));
// => "scale(1,2) translate(10px,10px)"

console.log(buildTransform(t => t.rotate(20).translateY(10, "%")));
// => "rotate(20deg) translateY(10%)"

const customFunc: CustomUnit<"px"> = (n) => `${n * 2}px`;
console.log(buildTransform(t => t.translate(10, 10, customFunc)));
// => "translate(20px,20px)"

console.log(buildTransform(t => t.translateY("10%")));
// => "translateY(10%)"

console.log(buildTransform(t => t.translateX([["20px", "+", "10px"], "+", ["20px", "+", "10px"]])));
// => "translateX(calc((20px + 10px) + (20px + 10px)))"
```
