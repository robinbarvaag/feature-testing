'use client';
import { useState } from 'react';

import ServerComponent from './server-component';

export default function Test() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <ServerComponent displayCount={count} />
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
