---
title: TypeScript and React
slug: 'frameworks/react'
type: Guide
position: 1
---

# How to type React props

Since React props are used to send transmit data between one React component to another, there are many types that you can use to type React props.

To write the types of your props, you need to add a colon and the object literal notation (`: {}`) next to the destructuring assignment of the `children` prop at the component declaration

Here’s an example of typing a `string` and a `number` props:

```tsx
const App = ({ title, score }: { title: string; score: number }) => (
  <h1>
    {title} = {score}
  </h1>
);
```

## Creating a type alias for the props

Since the convention in React is to write one component in one `.js` or `.jsx` file, you can declare a `type` alias for the component props to make the code easier to read.

Here’s an example of creating a `type` alias for the `App` component props:

```ts
type Props = {
  title: string;
  score: number;
};

const App = ({ title, score }: Props) => (
  <h1>
    {title} = {score}
  </h1>
);
```

As you can see, the `type` object for component props will save you from having to include the prop types inline.

## Typing optional props

You can make a prop optional by adding the question mark `?` symbol after the prop name.

The following example makes the `title` prop optional:

```ts
type Props = {
  title?: string;
  score: number;
};
```

The optional prop means that you can render the component without passing the prop, but when you do pass the prop, it must be of the declared type.

## List of types for React component props

Now that you know how to check the props type, here’s a list of common types that you may want to use in your React application.

First, you have primitive types like `string` , `number` , and `boolean` as shown below:

```ts
type Props = {
  // primitive types
  title: string;
  score: number;
  isWinning: boolean;
};
```

You can also create an array of one type by adding the array literal notation (`[]`) after the type as follows:

```ts
type Props = {
  title: string[]; // an array of string
  score: number;
  isWinning: boolean;
};
```

You can also write literal values to specify the exact values that can be accepted by the prop.

You need to separate the literals using a single pipe operator `|` as shown below:

```ts
type Props = {
  priority: 'high' | 'normal' | 'low';
  score: 5 | 9 | 10;
};
```

TypeScript will throw a static error when the value of `priority` or `score` prop above doesn’t match any of the literal values.

Next, you can type an `object` prop as follows:

```ts
type Props = {
  user: {
    username: string;
    age: number;
    isMember: boolean;
  };
};
```

When you have an array of objects prop, just add the array literal notation at the end of the object declaration as follows:

```ts
type Props = {
  user: {
    username: string;
    age: number;
    isMember: boolean;
  }[]; // right here
};
```

React props can also receive functions such as `onClick` and `onChange` , so you may need to type function props.

You can type the parameters accepted by the function or take an `event` object from the HTML as shown below:

```ts
type Props = {
  // function that returns nothing
  onClick: () => void;
  // function accepts a parameter and has return type
  onChange: (target: string) => boolean;
  // function that takes an event
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};
```

If you’re declaring an `onChange` function in the component’s body, then you can immediately check the parameter and the return types of the function as shown below:

```ts
const App = () => {
  const [message, setMessage] = useState('');

  const onChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setMessage(e.currentTarget.value);
  };

  // code omitted for clarity..
};
```

Finally, React components can accept another component as the `children` prop, so you need to use `ReactNode` to type these `children` props:

```ts
type Props = {
  children: React.ReactNode;
};

const App = ({ children }: Props) => <div>{children}</div>;
```

And those are the most common types you may use for React props.

Let’s learn how to type React function components next!
