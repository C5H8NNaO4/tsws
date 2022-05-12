---
title: 05 Using Interfaces - Hands on
chapter: Interfaces
slug: interfaces/hands-on
position: 5
sauce: https://docs.microsoft.com/en-us/learn/modules/typescript-implement-interfaces/4-extend-interface
---

# Using Interfaces - Hands on

In this lab, you'll convert some JavaScript code to strongly typed code using interfaces.

The JavaScript code contains two functions:
`calculateInterestOnlyLoanPayment`, which calculates the payment for an interest only loan,
and `calculateConventionalLoanPayment`, which calculates the payment for a conventional loan.

As with most loan calculations, both functions accept `principal` and `interestRate` parameters.

The difference between them is that the `calculateConventionalLoanPayment` function accepts a third property,
months that the `calculateInterestOnlyLoanPayment` function does not.

| Property       | Description                                                                                                                                                                                                                 |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `principal`    | The principal amount of the loan.                                                                                                                                                                                           |
| `interestRate` | The annual interest rate of the loan. For example, 5% is specified as 5.                                                                                                                                                    |
| `months`       | The term of the loan specified in months. An interest only loan does not require this property because the number of months is irrelevant (the loan will never be repaid when an interest only payment is made each month.) |

## Exercises

- Declare an interface called `Loan` that defines two properties, `principal` and `interestRate`.
- Declare an interface called `ConventionalLoan` that extends `Loan`, and defines the additional property required for a conventional loan, `months`.
- Update the two functions to implement the new interfaces and strongly type the parameters.
- Don't forget return value types

## Playground

```ts monaco transpile file="loan-utils.ts"
// TODO: Declare the Loan interface

// TODO: Declare the ConventionalLoan interface

// TODO: use interface instead of arguments-list
function calculateInterestOnlyLoanPayment(principle, interestRate) {
  // Calculates the monthly payment of an interest only loan
  let interest = interestRate / 1200;
  let payment = principle * interest;
  return 'The interest only loan payment is ' + payment.toFixed(2);
}

// TODO: use interface instead of arguments-list
function calculateConventionalLoanPayment(principle, interestRate, months) {
  // Calculates the monthly payment of a conventional loan
  let interest = interestRate / 1200;
  let payment = (principle * interest) / (1 - Math.pow(1 / (1 + interest), months));
  return 'The conventional loan payment is ' + payment.toFixed(2);
}

// ----- tests

let interestOnlyPayment = calculateInterestOnlyLoanPayment({ principal: 30000, interestRate: 5 });
let conventionalPayment = calculateConventionalLoanPayment({
  principal: 30000,
  interestRate: 5,
  months: 180,
});

assertEqual(interestOnlyPayment, 'The interest only loan payment is 125.00');
assertEqual(conventionalPayment, 'The conventional loan payment is 237.24');
```

---

<details>
<summary>example Solution</summary>
<div>

```ts
interface Loan {
  principle: number;
  interestRate: number;
}

interface ConventionalLoan extends Loan {
  months: number;
}

function calculateInterestOnlyLoanPayment(loanTerms: Loan): string {
  let interest: number = loanTerms.interestRate / 1200;
  let payment: number = loanTerms.principle * interest;

  return 'The interest only loan payment is ' + payment.toFixed(2);
}

function calculateConventionalLoanPayment(loanTerms: ConventionalLoan): string {
  let interest: number = loanTerms.interestRate / 1200;
  let payment: number =
    (loanTerms.principle * interest) / (1 - Math.pow(1 / (1 + interest), loanTerms.months));

  return 'The conventional loan payment is ' + payment.toFixed(2);
}

let interestOnlyPayment = calculateInterestOnlyLoanPayment({ principle: 30000, interestRate: 5 });
let conventionalPayment = calculateConventionalLoanPayment({
  principle: 30000,
  interestRate: 5,
  months: 180,
});
```

</div>
</details>

:::note
Writing code similar to shown examples is **really** bad practice - one of our main goals is not to write any code - but to write better code.
However, to transfer / learn the ideas behind Interfaces and Types, it's a good trade-off.
:::
