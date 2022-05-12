---
title: 08 Type assertion
chapter: Basics
slug: basics/type-assertion
hasCode: true
position: 9
---

# Type assertion

If you need to treat a variable as a different data type you can use a type assertion.
A type assertion tells TypeScript you have performed any special checks that you need before calling the statement.

:::note{.remember}
A type assertion tells the compiler "trust me, I know what I’m doing."
:::

A type assertion is like a type cast in other languages, but it performs no special checking or restructuring of data.
It has no runtime impact and is used purely by the compiler.

Type assertions have two forms. One is the as-syntax:

`(randomValue as string).toUpperCase();`

The other version is the "angle-bracket" syntax:

`(<string>randomValue).toUpperCase();`

:::note{.warn}
`as` is the preferred syntax.
Some applications of TypeScript, such as JSX, can get confused when using `< >` for type conversions.
:::

The following example performs the necessary check to determine that randomValue is a string before using type assertion to call the toUpperCase method.

TypeScript now assumes that you have made the necessary check.
The type assertion says that randomValue should be treated as a string and then the toUpperCase method can be applied.
