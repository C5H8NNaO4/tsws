---
title: 02 Declare & instantiate
chapter: Interfaces
slug: interfaces/declare-instantiate
position: 2
sauce: https://docs.microsoft.com/en-us/learn/modules/typescript-implement-interfaces/3-declare-instantiate-interface
---

# Declare and instantiate an interface

To declare an interface, start with the interface keyword followed by the interface name (the identifier.)
The interface name may not be one of the predefined type names in the type system.
And, by convention, interface names are in PascalCase.

:::note
The TypeScript coding guidelines suggest interfaces should **not** start with the letter I (capital i).
:::

Then, define the properties (or members) of the interface and their type.
Properties can be required, optional, or read only.

| Property type | Description                                                                                                                                                                               | Example                       |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| Required      | All properties are required, unless otherwise specified.                                                                                                                                  | `firstName: string;`          |
| Optional      | Add a question mark (`?`) to the end of the property name. Use this for properties that are not required. This prevents the type system from raising an error if the property is omitted. | `firstName?: string;`         |
| Read only     | Add the readonly keyword in front of the property name. Use this for properties that should only be modified when an object is first created.                                             | `readonly firstName: string;` |

## Declare an interface with members

```ts transpile monaco file="ice-cream.ts"
interface IceCream {
  flavor: string;
  scoops: number;
}
```

implementing this interface:

Let's start by using the `IceCream` interface as a type in a variable declaration.
Declare a new variable called `iceCream` as type `IceCream` and then assign values to the required properties. Notice as you start to type the property names, Intellisense suggests the correct names and types.
Check your work by displaying the value on the console (don't forget the `Run` button).

<details>
<summary>got lost?</summary>

```ts
let iceCream: IceCream = {
  flavor: 'vanilla',
  scoops: 2,
};

console.log(iceCream.flavor);
```

</details>

Next, let's create a function at the bottom called `tooManyScoops` that uses the `IceCream` interface as parameter type.
This function checks the number of scoops in the IceCream object and returns a message based on the result.

To test your work, pass in the object `{ flavor: 'vanilla', scoops: 5 }` as a parameter and check the result by returning it to the console.

```ts
function tooManyScoops(dessert: IceCream) { // ....
```

Combined with your previous console.log statement, the output should be

```
"vanilla"
"5 is too many scoops!"
```

Note the compiled JavaScript output. The interface is ... gone!?

:::note{.remember}
TypeScript is transpiled to JavaScript - thus all TypeScript-Features unknown to JavaScript get removed
:::

What happens if you add another property to the IceCream interface?

Add a new property called instructions and assign it the string type and hit `Run`.

Review the errors that appear in your code.
To resolve them, you should add the instructions property to the implementation details of the variable declaration and add it as a parameter passed to the function.

For now, make the instructions property optional by adding a question mark to the property name.
All the errors should resolve because the instructions property is no longer required by the interface.

**So far, so good!**

But an ice cream sundae without toppings is just ice cream.

Next, we'll look at how to extend an interface (without getting diabetes).
