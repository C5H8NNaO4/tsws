---
title: 06 Any and unknown / Any
chapter: Basics
slug: basics/any-and-unknown
hasCode: true
position: 7
---

# Any and unknown type

There are times when you'll need to work with values that are unknown to you at the time you develop your code.

In these cases, you can use the `any` and `unknown` types and use type assertion and type guards to maintain control over what your code is allowed to do with the values that are passed.

## Any type

The `any` type is the one type that can represent **any** JavaScript value with no constraints.

This _can_ be useful when you're expecting a value from a third-party library or user inputs where the value is dynamic.

And, as mentioned earlier, using the `any` type allows you to gradually migrate your JavaScript code to use static types in TypeScript.

Check the code right.

When this example is compiled, it doesn't throw an error because the `any` type encompasses values of `every possible type`.
The any type opts out of type checking and doesn't force you to do any checking before you call, construct, or access properties on these values.

Using the any type in this example allows you to call:

- A property that doesn't exist for the type.
- `randomValue` as a function.
- A method that only applies to a string type.

Because `randomValue` is registered as `any`, all of the following examples are valid TypeScript.

Runtime errors may occur depending on the actual datatype of the variable.

:::note{.warn}
Remember that all the convenience of `any` comes at the cost of **losing type safety**.
Type safety is one of the main motivations for using TypeScript.

**You should avoid using any when it's not necessary.**
:::
