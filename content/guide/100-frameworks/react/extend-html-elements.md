---
title: extend HTML elements
slug: frameworks/react/extend-elements
type: Guide
position: 6
---

# How to type (extend) HTML elements

Sometimes, you want to create a small, modular component that takes the attributes of a native HTML element as its props.

Some useful components that you may create for your application are `button` , `img` , or `input` elements.

The `@types/react` library ships with `ComponentPropsWithoutRef` type that you can use to grab all the native attributes of an HTML element as the props type of your component.

For example, the native `button` element knows about the `onClick` attribute already, but when you create a React `<Button>` component, you usually need to define the prop using an `interface` or a `type` like this:

```tsx
type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

const Button = ({ children, onClick }: ButtonProps) => {
  return <button onClick={onClick}>{children}</button>;
};
```

With the above example, you need to keep adding another prop to the `ButtonProps` as you need them as follows:

```tsx
type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
  type: 'button' | 'submit' | 'reset' | undefined;
};
```

The `ComponentPropsWithoutRef` type can be used so that you don’t need to add these native HTML attributes to the `type` as you grow your application.

You can simply create a `type` that has all the native `button` attributes as props like this:

```tsx
type ButtonProps = React.ComponentPropsWithoutRef<'button'>;

const Button = ({ children, onClick, type }: ButtonProps) => {
  return (
    <button onClick={onClick} type={type}>
      {children}
    </button>
  );
};
```

The `ComponentPropsWithoutRef<"button">` type has all the props of a native HTML `button` element.

If you want to create an `<Img>` component, then you can use the `ComponentPropsWithoutRef<"img">` type:

```tsx
type ImgProps = React.ComponentPropsWithoutRef<'img'>;

const Img = ({ src, loading }: ImgProps) => {
  return <img src={src} loading={loading} />;
};
```

You only need to change the generic type of `ComponentPropsWithoutRef<T>` to extend different HTML elements. For example:

- `ComponentPropsWithoutRef<'img'>` to extend `<img>` element
- `ComponentPropsWithoutRef<'button'>` to extend `<button>` element
- `ComponentPropsWithoutRef<'a'>` to extend `<a>` element

And so on.

When you need to add a custom prop that doesn’t exist in the native HTML element, you can create an `interface` that extends the native attributes as follows:

```tsx
interface ImgProps extends React.ComponentPropsWithoutRef<'img'> {
  customProp: string;
}

const Img = ({ src, loading, customProp }: ImgProps) => {
  // use the customProp here..
  return <img src={src} loading={loading} />;
};
```

This is particularly useful if you need a custom prop to determine the look of your component.

In the following example, the custom prop `color` is used to determine the `style: color` CSS attribute of the `<h1>` element:

```tsx
interface headerProps extends React.ComponentPropsWithoutRef<'h1'> {
  variant: 'primary' | 'secondary';
}

const Header = ({ children, variant }: headerProps) => {
  return <h1 style={{ color: variant === 'primary' ? 'black' : 'red' }}>{children}</h1>;
};
```

The `ComponentPropsWithoutRef` type makes it easy to create a component that’s an extension of native HTML elements without having to type all possible prop parameters yourself.

You can even add additional props by extending the `interface`.

The `ComponentPropsWithoutRef` interface also has a twin called `ComponentPropsWithRef` that you can use when you need to forward a reference to the component’s children.

Learn more about ref forwarding here: [https://reactjs.org/docs/forwarding-refs.html](https://reactjs.org/docs/forwarding-refs.html)

## ComponentPropsWithoutRef vs [Element]HTMLAttributes

If you have used TypeScript with React before, you may be familiar with the `[Element]HTMLAttributes` interface from `@types/react` library that you can use to extend HTML elements as follows:

```tsx
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

type ImgProps = React.ImgHTMLAttributes<HTMLImageElement>;
```

These `[Element]HTMLAttributes` interfaces produce the same type as `ComponentPropsWithoutRef` interface, but they are more verbose since you need to use a different interface and generic for each HTML element.

On the other hand, `ComponentPropsWithoutRef` only requires you to change the generic type `<T>`. Both are fine for extending HTML elements in React components.

You can see an explanation from the library author here:

https://github.com/DefinitelyTyped/DefinitelyTyped/issues/36505#issuecomment-549394273

## When to use `type` vs `interface`?

Both `type` and `interface` from TypeScript can be used to define React props, components, and hooks.

From the [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces):

> Type aliases and interfaces are very similar, and in many cases you can choose between them freely. Almost all features of an `interface` are available in `type` > **the key distinction** is that a type cannot be re-opened to add new properties vs an interface which is always extendable.

When using interfaces, you can freely `extends` an interface as follows:

```tsx
interface HtmlAttributes {
  disabled: boolean;
}

interface ButtonHtmlAttributes extends HtmlAttributes {
  type: 'Submit' | 'Button' | null;
}
```

But types can’t be extended like interfaces. You need to use the intersection symbol (`&`) as follows:

```tsx
type HtmlAttributes = {
  disabled: boolean;
};

type ButtonHtmlAttributes = HtmlAttributes & {
  type: 'Submit' | 'Button' | null;
};
```

Next, an `interface` declaration is always an object, while a `type` declaration can be of primitive values as shown below:

```tsx
type isLoading = boolean;
type Theme = 'dark' | 'light';
type Lang = 'en' | 'fr';
```

None of the above examples are possible with an `interface` , so a `type` might be preferred for simple Context object values.

The question is when to use one over the other? From the TypeScript Handbook again:

> If you would like a heuristic, use `interface` until you need to use features from `type`.

The TypeScript code analyzer will tell you when you strictly need to use either an `interface` or a `type`.

:::tip
**When you’re not sure which one to use**, always go with `interface` until you see a reason to use `type` .
:::

If you need more details, here’s a [StackOverflow answer](https://stackoverflow.com/a/65948871) comparing interfaces and types.

## Conclusion

Through this tutorial, you’ve learned the most common typings you may need when developing a React-TypeScript application.

[sauce](https://blog.bitsrc.io/react-with-typescript-cheatsheet-9dd891dc5bfe#7b87)
