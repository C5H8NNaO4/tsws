---
title: Understand typings
slug: 'frameworks/react/understand-typings'
type: Guide
position: 5
---

# Understanding different typings for React components

Although TypeScript could infer the return type of React function components as you code the components, you may have a project with a linting rule that requires the return type to be explicitly defined.

The `@types/react` library has several types that you can use to define the return type of React function components. They are:

- `ReactElement`
- `JSX.Element`
- `ReactNode`

This section is dedicated to helping you understand these types and when to use them.

[A ReactElement](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/03a8c197dd9c8c23ad0725f2a9e2fe37b27a4ca3/types/react/index.d.ts#L146) is an `interface` for an object with type, props, and key properties as shown below:

```ts
type Key = string | number;
interface ReactElement<
  P = any,
  T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>,
> {
  type: T;
  props: P;
  key: Key | null;
}
```

A `JSX.Element` is an extension of `ReactElement` that has the `type<T>` and `props<P>` implemented as `any` as you can see in the [repository](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts#L3091):

```ts
declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}
  }
}
```

The `type` for `ReactElement` is more strict than in `JSX.Element` , but they are essentially the same

Finally, `ReactNode` is a `type` that’s very loose as it includes anything that can be returned by the `render()` method of React class components.

In the repository, `ReactNode` is defined like this:

```ts
type ReactNode = ReactChild | ReactFragment | ReactPortal | boolean | null | undefined;
```

This is why when your component has a `children` prop that can receive another component, it’s recommended to use `ReactNode` as its type because it can receive anything that can be rendered by React.

On the other hand, `ReactElement` and `JSX.Element` are more strict when compared with `ReactNode` as it doesn’t allow you to return values like `null`

## When to use each type?

The `ReactNode` type is best used for typing a `children` prop that can receive another React component or JSX elements like this:

```tsx
const App = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};
// At index.ts
<App>
  <Header />
  <h2>Another title</h2>
</App>;
```

This is because both `ReactElement` and `JSX.Element` types are more strict on the return type (doesn’t allow `null`) and they expect you to return a single element.

To accept both single and multiple children for these two types, you need to use `ReactElement | ReactElement[]` or `JSX.Element | JSX.Element[]` as the `children` type

The `ReactElement` and `JSX.Element` types are more suited for explicitly defining the return type of a React component like this:

```tsx
const App = (): React.ReactElement | JSX.Element => {
  return <div>hello</div>;
};
```

But since we’re talking about best practices here, then I recommend you follow the definition of `FunctionComponent` interface in the [types library](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts#L550), which uses `ReactElement<any, any> | null` :

```ts
interface FunctionComponent<P = {}> {
  (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  propTypes?: WeakValidationMap<P> | undefined;
  contextTypes?: ValidationMap<any> | undefined;
  defaultProps?: Partial<P> | undefined;
  displayName?: string | undefined;
}
```

And because `JSX.Element` is exactly extending `ReactElement<any, any>` , you can define a React function component return type as follows:

```tsx
const App = (): JSX.Element | null => {
  return <div>hello</div>;
};
```

This way, your component can still render nothing by returning `null` .

I hope this section has helped you to understand the different types that can be used for typing React components.
