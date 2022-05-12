---
title: Type System
slug: 'reference/type-system'
type: Guide
position: 51
---

# Type System

We covered the main features of the TypeScript Type System back when we discussed [Why TypeScript?](../intro). The following are a few key takeaways from that discussion which don't need further explanation:

- The type system in TypeScript is designed to be _optional_ so that _your JavaScript is TypeScript_.
- TypeScript does not block _JavaScript emit_ in the presence of Type Errors, allowing you to _progressively update your JS to TS_.

Now let's start with the _syntax_ of the TypeScript type system. This way you can start using these annotations in your code immediately and see the benefit. This will prepare you for a deeper dive later.

:::warning[Remember!]
TypeScript provides compile time type safety for your JavaScript code.
:::

## Basic Annotations

As mentioned before Types are annotated using `:TypeAnnotation` syntax. Anything that is available in the type declaration space can be used as a Type Annotation.

The following example demonstrates type annotations for variables, function parameters and function return values:

```ts
var num: number = 123;
function identity(num: number): number {
  return num;
}
```

### Primitive Types

The JavaScript primitive types are well represented in the TypeScript type system. This means `string`, `number`, `boolean` as demonstrated below:

```ts
var num: number;
var str: string;
var bool: boolean;

num = 123;
num = 123.456;
num = '123'; // Error

str = '123';
str = 123; // Error

bool = true;
bool = false;
bool = 'false'; // Error
```

### Arrays

TypeScript provides dedicated type syntax for arrays to make it easier for you to annotate and document your code. The syntax is basically postfixing `[]` to any valid type annotation (e.g. `:boolean[]`). It allows you to safely do any array manipulation that you would normally do and protects you from errors like assigning a member of the wrong type. This is demonstrated below:

```ts
var boolArray: boolean[];

boolArray = [true, false];
console.log(boolArray[0]); // true
console.log(boolArray.length); // 2
boolArray[1] = true;
boolArray = [false, false];

boolArray[0] = 'false'; // Error!
boolArray = 'false'; // Error!
boolArray = [true, 'false']; // Error!
```

### Interfaces

Interfaces are the core way in TypeScript to compose multiple type annotations into a single named annotation. Consider the following example:

```ts
interface Name {
  first: string;
  second: string;
}

var name: Name;
name = {
  first: 'John',
  second: 'Doe',
};

name = {
  // Error : `second` is missing
  first: 'John',
};
name = {
  // Error : `second` is the wrong type
  first: 'John',
  second: 1337,
};
```

Here we've composed the annotations `first: string` + `second: string` into a new annotation `Name` that enforces the type checks on individual members. Interfaces have a lot of power in TypeScript and we will dedicate an entire section to how you can use that to your advantage.

### Inline Type Annotation

Instead of creating a new `interface` you can annotate anything you want _inline_ using `:{ /*Structure*/ }`. The previous example presented again with an inline type:

```ts
var name: {
  first: string;
  second: string;
};
name = {
  first: 'John',
  second: 'Doe',
};

name = {
  // Error : `second` is missing
  first: 'John',
};
name = {
  // Error : `second` is the wrong type
  first: 'John',
  second: 1337,
};
```

Inline types are great for quickly providing a one off type annotation for something. It saves you the hassle of coming up with (a potentially bad) type name. However, if you find yourself putting in the same type annotation inline multiple times it's a good idea to consider refactoring it into an interface (or a `type alias` covered later in this section).
