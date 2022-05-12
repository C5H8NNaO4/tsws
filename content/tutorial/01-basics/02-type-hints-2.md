---
title: 02 Type hints 2
chapter: Basics
slug: basics/type-hints-2
hasCode: true
position: 2
---

# Type hints # 2

1. Update the TypeScript code to specify a type for each parameter. Replace `x` with `x: number` and `y` with `y: number`.
   You'll notice that the errors are now gone from the parameters, but a new one has appeared under the first argument in the function call:
   `"Argument of type 'string' is not assignable to parameter of type 'number'."`

2. Replace `three` with a number to correct the error.
   You could pass in a literal value, a variable, or any other data and, because TypeScript understands the shape of your object, it can notify you of the type conflict at development time.

3. Review the `JavaScript` and notice that there are no changes to it.
   TypeScript was able to provide type checking during development, but this has had no impact on the resulting JavaScript code because it doesn't support types.
   You might have noticed that the `Errors`-tab is gone now as well.

**You did it! was not too hard, was it?**
