css-transform-builder
----

[![CircleCI](https://circleci.com/gh/fnobi/css-transform-builder/tree/master-build.svg?style=svg)](https://circleci.com/gh/fnobi/css-transform-builder/tree/master-build)

```ts
const transform = new CSSTransformBuilder().scale(1, 2);
console.log(transform.toString());
// => "scale(1,2)"

const transform2 = transform.translate(10, 10);
console.log(transform2.toString());
// => "scale(1,2) translate(10px,10px)"
```