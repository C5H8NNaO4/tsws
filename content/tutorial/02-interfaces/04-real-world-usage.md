---
title: 04 Real World Usage
chapter: Interfaces
slug: interfaces/rw-usage
position: 4
sauce: https://docs.microsoft.com/en-us/learn/modules/typescript-implement-interfaces/4-extend-interface
---

# Real World Usage

There are days, where ice cream just does not help.

Two solutions to choose from:

1. more ice cream (always worth a try)
2. advancing interface usage.

# Whats the interface of an indexable type?

[//]: # '(**POJO**: **P**lain **O**ld **J**avaScript **O**bject, in case you forgot)'

Indexable types have an index signature that describes the type you can use to index into the object, along with the corresponding return types when indexing.

- a JavaScript-Array for example has number-based indices
- while objects have string, number or even symbol based access

For example, this `IceCreamArray` interface declares an index signature as a number and returns a string type.
This index signature states that `IceCreamArra` is indexed with a number and it will return a string. Say whaaat.

```ts
interface IceCreamArray {
  [index: number]: IceCream;
}

const creams: IceCreamArray = ['chocolate', 'vanilla', 'strawberry'];
const myCream: string = creams[0]; // referencing ice creams maybe wasn't the best idea 😂
console.log(myCream);
```

You can also use the built-in array type or create a type alias for a custom array, but by using an interface, you can define your own array type so that anyone who wants to work with that interface can apply it consistently.

Same example using string based indices:

```ts
interface IceCreams {
    [index: string]: string;
}

const creams: IceCreams = {
    'strawberry':   { ... },
    'chocolate':    { ... },
    'vanilla':      { ... },
};

const myCream: string = creams.vanilla; // still not better 😂
console.log(myCream);
```

[//]: # 'Btw. having a typed map, which `IceCreams` defines, can be aliased as `Record<key-type, value-type>`:'

## Describe a JavaScript API using an interface

A common pain point for JavaScript and TypeScript developers alike is working with external JavaScript libraries.
You can use an interface to describe existing JavaScript APIs and clarify function parameters and return types.
The interface provides you with a clear understanding of what an API is expecting and what it will return.

The `fetch` API is a native JavaScript function that you can use to interact with web services.
This example declares an `interface` called `Post` for the return types in a JSON file and then uses fetch with async and await to generate a strongly typed response.

For now, ignore handling async/await, don't think of side effects etc.

These topics will be addressed later
