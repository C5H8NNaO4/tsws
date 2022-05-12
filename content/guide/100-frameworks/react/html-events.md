---
title: HTML Events & Forms
slug: 'frameworks/react/html-events-and-forms'
type: Guide
position: 4
---

# How to type HTML events and forms

Most HTML events types can be inferred correctly by TypeScript, so you don’t need to explicitly set the type.

For example, a `button` element `onClick` event will be inferred as `React.MouseEvent` by TypeScript:

```tsx
const App = () => (
  <button onClick={(e) => console.log('Clicked')}>button</button>
  // ^^^ e inferred as React.MouseEvent<HTMLButtonElement, MouseEvent>
);
```

For HTML forms, you will need to type the `onSubmit` event as `React.FormEvent` because the default inference `Any`will throw an error.

But the `onChange` events for your HTML inputs usually can be inferred from the event itself.

Here’s an example of a React form in TypeScript:

```tsx
const App = () => {
  const [email, setEmail] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle submission here...
    alert(`email value: ${email}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Email:
          <input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.currentTarget.value)}
            // ^^^ onChange inferred as React.ChangeEvent
          />
        </label>
      </div>
      <div>
        <input type="Submit" value="Submit" />
      </div>
    </form>
  );
};
```
