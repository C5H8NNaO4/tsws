import React from 'react';
import { useState, useEffect } from 'react';
import ReactDom from 'react-dom';

export const CounterExample = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
    console.log(document.title);
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

const root = document.createElement('div');
document.body.appendChild(root);
ReactDom.render(<CounterExample />, root);
