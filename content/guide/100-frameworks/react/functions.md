---
title: Functions
slug: frameworks/react/functions
type: Guide
position: 2
---

# How to type React function components

TypeScript’s Definitely Typed library include the `React.FunctionComponent` (or `React.FC` for short) that you can use to type React function components.

You can combine the `type Props` and the `React.FC` type to create a type-safe function component with props as follows:

```tsx
type Props = {
  title: string;
};

const App: React.FC<Props> = ({ title }) => {
  return <h1>{title}</h1>;
};
```

When you call on the `App` component above, you will be required to specify the `message` prop with `string` type.

But since TypeScript is able to infer the type of your variable, you can remove typing the component with `React.FC` like this:

```ts
type Props = {
  title: string;
};
const App = ({ title }: Props) => <div>{title}</div>;
// App type will be inferred
```

If you have only a few props for the component, you can even type the props inline, removing the need to create the `type Props` as shown below:

```ts
const App = ({ title }: { title: string }) => <div>{title}</div>;
```

Because of TypeScript’s inferred type feature, there’s no need for you to type React function components at all.
