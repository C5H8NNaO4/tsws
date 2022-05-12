---
title: 01 Type hints
chapter: Basics
slug: /
hasCode: true
position: 1
---

# Type hints

TypeScript is _intentionally_ and **strictly** a superset of JavaScript:

> it's _just JavaScript_ with **optional** Type checking.

In TypeScript, you can identify the data type of a variable or parameter by using a type hint.

### <ins>Check the Editor on the right.</ins>

It's awesome, i know!

In line 5, replace `3` with `"three"`.
You will end up with `"three6"`.

```ts
console.log(addNumbers('three', 6));
```

You've probably run into this situation before and, as you know, it can cause some unexpected results.

In the Editor, notice the squiggly red lines under the parameter names in the `addNumbers` function.
This indicates that the type checker identified errors.

<ins>Also you find all errors found on the `Errors`-Tab.</ins>

Hover over one of the parameters and read the description of the error.

TypeScript has implicitly assigned a type of `any`, which is the broadest type because it can essentially contain anything.

:::note{.warn}
Using `any`, implicitly or explicitly is quite always a bad idea.
As a rule of thumb: try to avoid it if possible.
:::
