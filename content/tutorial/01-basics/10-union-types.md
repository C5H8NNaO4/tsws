---
title: 10 Union Types
chapter: Basics
slug: basics/union-types
hasCode: true
position: 10
---

# Union Types

A union type describes a value that can be one of several types.
This can be helpful when a value is not under your control (for example, values from a library, an API, or user input.)

The `any` type can also accept different types, so why would you want to use a union type?
The union types restrict the assignment of values to the specified types, whereas the any type has no restrictions.
**Another reason is Intellisense support.**

A union type uses the vertical bar or pipe (`|`) to separate each type.
In the following example, `multiType` can be a `number` or a `boolean`:

```ts
let multiType: number | boolean;
multiType = 20; //* Valid
multiType = true; //* Valid
multiType = 'twenty'; //* Invalid
```

Using type guards, you can easily work with a variable of a union type.
In this example, the add function accepts two values that can be either a `number` or a `string`.
If both values are number types, it adds them.
If both are string types, it concatenates them.
Otherwise, it raises an error.
