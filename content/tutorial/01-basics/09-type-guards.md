---
title: 09 Type guards
chapter: Basics
slug: basics/type-guards
hasCode: true
position: 10
---

# Type guards

The previous example demonstrates the use of typeof in the if block to examine the type of an expression at runtime. This is called a type guard.

You may be familiar with using typeof and instanceof in JavaScript to test for these conditions. TypeScript understands these conditions and will change type inference accordingly when used in an if block.

You can use the following conditions to learn the type of a variable:

| Type        | Predicate                          |
| ----------- | ---------------------------------- |
| `string`    | `typeof s === "string"`            |
| `number`    | `typeof n === "number"`            |
| `boolean`   | `typeof b === "boolean"`           |
| `undefined` | `typeof undefined === "undefined"` |
| `function`  | `typeof f === "function"`          |
| `array`     | `Array.isArray(a)`                 |

For practice, finish the code on the right
