---
title: Hooks
slug: frameworks/react/hooks
type: Guide
position: 3
---

# How to type React hooks

React hooks are supported by `@types/react` library from version 16.8.

Generally, Typescript should be able to infer the type for your hooks unless you have specific cases where the type must be declared explicitly.

Let’s take a look at how to type React hooks one by one, starting from the `useState` hook

## Typing `useState` hook

The `useState` value can be inferred from the initial value you set when you call the function.

For example, the following `useState()` call initialize the state with an empty string. When you call the `setState` function, you need to put a string or there will be an error:

```ts
const App = () => {
  const [title, setTitle] = useState(''); // type is string
  const changeTitle = () => {
    setTitle(9); // error: number not assignable to string!
  };
};
```

But when you need to initialize your state with values like `null` or `undefined` , then you need to add a generic when you initialize the state.

A generic allows you to use several types for the `useState` hook as shown below:

```ts
// title is string or null
const [title, setTitle] = useState<string | null>(null);
// score is number or undefined
const [score, setScore] = useState<number | undefined>(undefined);
```

When you have a complex object as the state value, you can create an `interface` or a `type` for that object as follows:

```ts
interface Member {
  username: string;
  age?: number;
}
const [member, setMember] = useState<Member | null>(null);
```

And that’s how you can type `useState` hooks in your application.

## Typing `useEffect` and `useLayoutEffect` hooks

You don’t need to type the `useEffect` and `useLayoutEffect` hooks because they don’t deal with returning values. The cleanup function for the `useEffect` hook is not considered a value that can be changed either.

You can write these hooks as normal.

## Typing `useContext` hook

The `useContext` hook type is usually inferred from the initial value you passed into the `createContext()` function as follows:

```tsx
const AppContext = createContext({
  authenticated: true,
  lang: 'en',
  theme: 'dark',
});
const MyComponent = () => {
  const appContext = useContext(AppContext); //inferred as an object
  return <h1>The current app language is {appContext.lang}</h1>;
};
```

The context value above will be inferred as the following object:

```ts
{
  authenticated: boolean,
  lang: string,
  theme: string
}
```

Alternatively, you can also create a `type` that will serve as the generic for the `CreateContext` return value.

For example, suppose you have a `ThemeContext` that only has two values: `light` and `dark.`

Here’s how you type the context:

```ts
type Theme = 'light' | 'dark';
const ThemeContext = createContext<Theme>('dark');
```

The type will be used when you set the value of the context using `ThemeContext.Provider` later in your code.

Then, the `useContext` hook will infer the type from the context object `ThemeContext` that you passed as its argument:

```tsx
const App = () => {
  const theme = useContext(ThemeContext);
  return <div>The theme is {theme}</div>;
};
```

## Typing `useRef` hook

Based on [React documentation](https://reactjs.org/docs/hooks-reference.html#useref), the `useRef` hook is commonly used to reference an HTML input element as follows:

```tsx
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

Following this use case, you can write a generic that accepts `HTMLInputElement` as shown below:

```tsx
const inputRef = useRef<HTMLInputElement>(null);
```

You don’t need to add `null` to the generic type because the `HTMLInputElement` accepts either an `HTMLInputElement | null` already.

## Typing `useMemo` hook

The `useMemo` hook returns a memoized value, so the type will be inferred from the returned value:

```ts
const num = 24;

// inferred as a number from the returned value below
const result = useMemo(() => Math.pow(10, num), [num]);
```

## Typing `useCallback` hook

The `useCallback` hook returns a memoized callback function, so the type will be inferred from the value returned by the callback function:

```ts
const num = 9;

const callbackFn = useCallback(
  (num: number) => num * 2, // type inferred as a number
  [num],
);
```

## Typing custom hooks

Since custom hooks are functions, you can add explicit types for its parameters while inferring its type from the returned value

```ts
function useFriendStatus(friendID: number) {
  const [isOnline, setIsOnline] = useState(false);
  // code for changing the isOnline state omitted..
  return isOnline;
}
const status = useFriendStatus(9); // inferred type boolean
```

When you return an array similar to the `useState` hook, then you need to assert the returned value `as const` so that TypeScript doesn’t infer your type as a union:

```ts
function useCustomHook() {
  return ['Hello', false] as const;
}
```

Without the `as const` assertion, TypeScript will infer the returned values as `(string | boolean)[]` instead of `[string, boolean]`

And that’s how you can type React hooks. Let’s learn how to type HTML events and forms next.
