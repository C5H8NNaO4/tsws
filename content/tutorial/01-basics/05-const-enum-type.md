---
title: 05 const Enum Type
chapter: Basics
slug: basics/const-enum-type
hasCode: true
position: 6
---

# `const enum` Type

If the name of enum is not important, or is never actually part of the data being processed, the `const` enum will be replaced by its value when getting compiled.

Also, next to number-values you can assign string values too.
The only difference is, that TypeScript will not auto-increment the values, so you need to have a value for every key.

Compare the JavaScript output of with `enums` within the Editor.

:::note{.remember}
Using enums is a nice catch when trying to prevent magic numbers or magic strings.
Just look at the Editor-Support by adding a new `line` like this: <br/>
`let h:Habitats = Habitats`
and press the `.` key. <br/>
Then be impressed.
:::
