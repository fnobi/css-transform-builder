css-transform-builder
----

[![CircleCI](https://circleci.com/gh/fnobi/css-transform-builder/tree/master-build.svg?style=svg)](https://circleci.com/gh/fnobi/css-transform-builder/tree/master-build)

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
```

## functional

```ts
import { buildTransform } from "css-transform-builder";

console.log(buildTransform(t => t.scale(1, 2)));
// => "scale(1,2)"

console.log(buildTransform(t => t.scale(1, 2).translate(10, 10)));
// => "scale(1,2) translate(10px,10px)"

const transform3 = new CSSTransformBuilder();
console.log(buildTransform(t => t.rotate(20).translateY(10, "%")));
// => "rotate(20deg) translateY(10%)"
```