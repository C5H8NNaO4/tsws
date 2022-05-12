---
title: 07 Any and unknown / unknown
chapter: Basics
slug: basics/any-and-unknown-2
hasCode: true
position: 8
---

# Unknown type

While flexible, the any type can cause unexpected errors. To address this, TypeScript introduced the unknown type.

The unknown type is similar to the any type in that any value is assignable to type unknown. However, you can't access any properties of an unknown type, nor can you call or construct them.

This example changes the any type in the previous example to unknown.
It will now raise type check errors and prevent you from compiling the code until you take appropriate action to resolve them.

:::note{.info}
The core difference between `any` and `unknown` is that you are unable to interact with a variable of type unknown.
:::

Doing so generates a compiler error.
Any bypasses any compile-time checks, and the object is evaluated at runtime.
If the method or property exists it will behave as expected.
