---
title: How not to learn TypeScript
slug: further-infos/how-not-to-learn
type: Guide
position: 100
---

# How not to learn TypeScript

TypeScript is a super-set of JavaScript, which means it adds more things to an already existing and defined language.

Over time you learn to spot which parts are JavaScript, and which parts are TypeScript.

It really helps to see TypeScript as this additional layer of types upon regular JavaScript.

A thin layer of meta-information, which will be peeled off before your JavaScript code runs in one of the available runtimes.

## Mistake 1: Ignore JavaScript

TypeScript is a superset of JavaScript and has been advertised like this ever since.

:::remember[Remember!]
TypeScript provides compile time type safety for your JavaScript code.
:::

## Mistake 2: Annotate everything

A type annotation is a way to explicitly tell which types to expect.

You know, the stuff that was very prominent in other programming languages, where the verbosity of

`StringBuilder stringBuilder = new StringBuilder();`
makes sure that you’re really, really dealing with a `StringBuilder`.

The opposite is type inference, where TypeScript tries to figure out the type for you.

`let a_number = 2` is of type `number`.

![type inference in editor](TypeScript-type-inference-on-arrays.png)


## Mistake 3: Mistake types for values

TypeScript is a super-set of JavaScript, which means it adds more things to an already existing and defined language.

Over time you learn to spot which parts are JavaScript, and which parts are TypeScript.

It really helps to see TypeScript as this additional layer of types upon regular JavaScript.

A thin layer of meta-information, which will be peeled off before your JavaScript code runs in one of the available runtimes.

:::remember
Some people even speak about TypeScript code **“erasing to JavaScript”** once compiled.
:::

## Mistake 4: Going all-in in the beginning

We’ve spoken a lot about what mistakes somebody can make coming to TypeScript from a different programming language.
To be fair, this has been my bread and butter for quite a while.

But there’s also a different trajectory: People who have written plenty of JavaScript, suddenly being confronted with another, sometimes very annoying tool.

This can lead to very frustrating experiences.

You know your codebase like the back of your hand, suddenly a compiler is telling you that it doesn’t understand things left and right and that you’ve made mistakes even though you know that your software will work.

## Mistake 5: Learn the wrong TypeScript

If your code needs to use one of the following keywords, you’re probably either in the wrong corner of TypeScript, or much further than you want to be:

- `namespace`
- `declare`
- `module`
- `<reference>`

This doesn’t mean that those keywords don’t contribute something very important and are necessary for a variety of use-cases.
When learning TypeScript, you don’t want to work with them at the beginning, though.
