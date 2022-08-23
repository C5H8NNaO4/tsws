---
title: TypeScript Workshop
slug: '/'
type: Guide
---

# TypeScript - What?

TypeScript is a language extension that adds static typing to JavaScript. 
It reached a breaking point sometime in 2020 and is fast becoming the default way to write JavaScript.

**"Why?"** you ask? Good Question!

Because it solves many of JavaScript's sharpest edges. 

So what is it exactly?

TypeScript is _intentionally_ and **strictly** a <ins>superset</ins> of JavaScript, which means that you can continue to use the JavaScript skills you've already developed and add certain features that were previously unavailable to you.

:::important[Your Grandma already does it!]
TypeScript it's _just plain old JavaScript_ with **optional** Type checking. End of Story. 
<small>Almost.</small>
:::

<details>
  <summary>What is a superset?</summary>

![TypeScript covers plain old JavaScript as you already know it (maybe not yet as good as your Grandma)](ts-superset.jpg)
</details>

### Is it any good?

[Yes.](https://news.ycombinator.com/item?id=3067434) - It even is better! You will see.

## Why is it any good?

**<u>Learning</u>:**<br/> The great thing for **learning** is that the types are <ins>**completely optional**</ins>. Your JavaScript code `.js` file can be renamed to a `.ts` file and TypeScript will still give you back valid `.js` equivalent to the original JavaScript file.


**<u>Early spotted bugs</u>:**<br/> The compiler checks types at compile time and provides error reporting.


**<u>Readability</u>:**<br/> Static typing gives the code more structure, making it self-documenting and more readable.


**<u>Rich IDE support</u>:**<br/>
![Type information allows code editors and IDEs to offer features like code navigation, autocompletion, and smarter hints.](TypeScript-autocomplete.webp)
 
 
**<u>Safer refactoring</u>:**<br/> Types allows IDEs to know more about your code, and assist you while refactoring large portions of your code base.


**<u>Type inference</u>:**<br/> 
![Enables you to take advantage of many TypeScript features even without declaring variable types.](TypeScript-type-inference.png)


**<u>Availability</u>**<br/> of new and future JavaScript features: TypeScript transpiles many **recent ES6** features to plain old-school JavaScript, allowing you to use them even on user-agents that don't support them natively yet.


## How does it work?

Again: TypeScript provides **compile time** type safety for your JavaScript code.
This is no surprise given its name.

Your JavaScript code `.js` file can be renamed to a `.ts` file and TypeScript will still give you back valid `.js` equivalent to the original JavaScript file.

:::remember[Type Hints]
With type hints you describe the **shape** of a value, which allows TypeScript to validate it before executing.
<br/>
Shapes tell you, your **Editor/IDE** and **team** what the heck your variables, values and parameters/arguments are.
:::

[//]: # (Through static type checking, **TypeScript catches code issues early** in development that JavaScript can't normally catch until the code is run in the browser.)

[//]: # (Types also let you describe what your code is intended to do.)

[//]: # (If you're working on a team, a teammate who comes in after you can easily understand it too.)

![Types also power the intelligence and productivity benefits of development tools, such as IntelliSense, symbol-based navigation, go to definition, find all references, statement completion, and code refactoring.](TypeScript-type-inference-on-arrays.png)

Writing types can be optional in TypeScript, because type inference allows you to get a lot of power without writing additional code. 

If TypeScript can determine the data type implicitly (for example: `let age = 42`), it automatically infers the data type.

## Workshop Take-Away Skills

- You will learn how to apply the JavaScript syntax you already know to TypeScript’s type system.
- This will help you build your own programming experience and give your code more structure.
- You’ll also use TypeScript’s linter to reduce compilation errors and speed up workflow.

### Lets do some type hints...things now!!

Smash that "Workshop" Button on top right!
