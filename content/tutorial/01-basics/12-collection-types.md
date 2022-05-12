---
title: 12 Collection Types
chapter: Basics
slug: basics/collection-types
hasCode: true
position: 14
---

# Collection types

The object types are all class, interface, array, and literal types (anything that is not a primitive type.) For now, let's look at the array and Tuple types.

## Arrays

TypeScript, like JavaScript, allows you to work with arrays.
Arrays can be written in one of two ways.
In the first, you use the type of the elements followed by square brackets (`[ ]`) to denote an array of that element type:

```ts
let list: number[] = [1, 2, 3];
```

The second way uses a generic `Array` type, using the syntax `Array<type>`:

```ts
let list: Array<number> = [1, 2, 3];
```

:::note{.warn}
`type[]` is the preferred syntax.
Some applications of TypeScript, such as JSX, can get confused when using `< >` for type conversions.
:::

## Tuples

Having an array of the same value types is useful, but sometimes you have an array that contains values of mixed types.
For that purpose, TypeScript provides the Tuple type.
To declare a Tuple, use the syntax variableName: `[type, type, ...]`.

## Exercise

Check the code to create a Tuple that contains a string and a number (in this very order):

```ts
let person1: [string, number] = ['Marcia', 35];
let person2: [string, number] = [35, 'Peter']; // errors
let person3: [string, number] = ['Fritz', 35, true]; //errors too
```

Exercise:

- Create an array of Tuples, containing 3 persons.
- Use a custom Type for Persons.
- aggregate all `Person.lastName` to an Array using `GuestList.map`.
  - Accessing the last Name is quite hacky to read, right? use an Enum to access persons properties.
