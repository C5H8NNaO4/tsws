---
title: 11 Literal Types
chapter: Basics
slug: basics/literal-types
hasCode: true
position: 13
---

# Literal types

A literal is a more concrete subtype of a collective type.

What this means is that `"Hello World"` is a `string`, but a `string` is not `"Hello World"` inside the type system.

There are three sets of literal types available in TypeScript: `string`, `number`, and `boolean`.
By using literal types, you can specify an exact value that a string, number, or boolean must have (for example, `"yes"`, `"no"`, or `"maybe"`.)

[//]: # '## What is literal narrowing?'
[//]: # 'When you declare a variable via `let` in TypeScript, you are telling the compiler that there is the chance that this variable will change its contents.'
[//]: #
[//]: # 'In contrast, using `const` to declare a variable will inform TypeScript that this object will never change.'
[//]: # 'Declaring with `const` types it to the value (for example, "Hello World").'
[//]: #
[//]: # 'The process of going from an infinite number of potential cases to a smaller, finite number of potential cases is called narrowing.'

## Defining literal types

Literal types are written as object, array, function, or constructor type literals and are used to compose new types from other types.

The best way to demonstrate the use of literal types is with an example.

This type definition creates a literal type called `testResult`, which can contain one of three `string` values.

When setting the value of the variable `myResult`, `"incomplete"` and `"pass"` are valid entries, while `"failure"` is not because it is not one of the items in the testResult type definition.

You can also use `boolean` values when defining literal types, or any combination of types.

### Fix the examples and continue;
