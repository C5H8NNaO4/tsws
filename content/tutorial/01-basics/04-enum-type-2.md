---
title: 04 Enum Type Creation
chapter: Basics
slug: basics/enum-type-creation
hasCode: true
position: 5
---

# Creating an `enum`

Now edit the code and declare a variable for a new employee named `employeeStatus` of the type `ContractStatus` and assign `Temp`.
Check the Console.

<details>
<summary>Click here for some Hint</summary>

```ts
const employeeStatus: ContractStatus = ContractStatus.Temp;
console.log(employeeStatus);
```

</details>

By default, enum values begin with a value of 0, so `Permanent` is `0`, `Temp` is `1`, and `Apprentice` is `2`.
If you want the values to start with a different value, in this case 1, specify that in the enum declaration.

Make the following edits to have the enum start the values at 1 and rerun:

```ts
enum ContractStatus {
  Permanent = 1,
  Temp,
  Apprentice,
}
```

To display the name associated with the enum, we can use the indexer provided.
Add the following to the bottom of your code:

```ts
console.log(ContractStatus[employeeStatus]);
```
