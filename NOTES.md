# Workshop Notes

## **Step 1:** ReactDOM.render()

`index.html`
```html
<div id="root"></div>
```

`index.tsx`
```js
ReactDOM.render(
  <React.StrictMode>
    <ReactDOMStep />
  </React.StrictMode>,
  document.getElementById('root')
);
```

## **Step 2:** Create a custom component
`src/components/counter/counter.tsx`
```tsx
export const Counter: React.FC = () => {
  return <h2>Hello counter component!</h2>;
}
```
`src/Workshop/content`
```js
import { Counter } from '../components/Counter';

<Counter />
```

## **Step 3:** Importing css and assets
`src/components/counter`
```js
import SBLogo from '../../assets/sb-logo.svg';
import './counter.css';
```
`src/components/counter/counter.css`
```css
.counterStyle {
  color: darkcyan;
}
```
`src/components/counter/counter.tsx`
```jsx
export const Counter: React.FC = () => {
  return (
    <div>
      <img src={SBLogo} alt="sb" />
      <h2 className="counterStyle">Hello counter component!</h2>
    </div>
  )
}
```

## **Step 4:** Lazy load a component
`src/components/content`
```js
import React, { lazy, Suspense } from 'react';

const Counter = lazy(() => import('../counter'));

<Suspense fallback={<div>Fallback</div>}>
  <Counter />
</Suspense>
```

## **Step 5:** useState
```tsx
interface ICounterProps {
  initial: number;
}

export const Counter: React.FC<ICounterProps> = ({ initial }) => {
  const [count, setCount] = useState(initial);
  return (
    <div>
      <img src={SBLogo} alt="sb" />
      <h2 className="counterStyle">Count is {count}!</h2>
    </div>
  )
}
```
```jsx
export const Counter: React.FC<ICounterProps> = ({ initial }) => {
  const [count, setCount] = useState(initial);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    setCount(count - 1);
  }

  return (
    <div>
      <img src={SBLogo} alt="sb" />
      <h2 className="counterStyle">Count is {count}!</h2>
      <button type="button" onClick={increaseCount}>Increase Count</button>
      <button type="button" onClick={decreaseCount}>Decrease Count</button>
    </div>
  )
}
```

## **Step 6:** useEffect
### Mount & Unmount lifecycle

```js
export const Counter: React.FC<ICounterProps> = ({ initial }) => {
  const [count, setCount] = useState(initial);

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    setCount(count - 1);
  }

  useEffect(() => {
    const onBodyClick = () => {
      console.log('There was a click in body element.');
    };
    document.body.addEventListener('click', onBodyClick);
    return () => document.body.removeEventListener('click', onBodyClick);
  }, []);

  return (
    <div>
      <img src={SBLogo} alt="sb" />
      <h2 className="counterStyle">Count is {count}!</h2>
      <button type="button" onClick={increaseCount}>Increase Count</button>
      <button type="button" onClick={decreaseCount}>Decrease Count</button>
    </div>
  )
}
```
### Watch state changes
```jsx
export const Counter: React.FC<ICounterProps> = ({ initial }) => {
  const [count, setCount] = useState(initial);
  const [unchanged] = useState('unchanged');

  const increaseCount = () => {
    setCount(count + 1);
  };

  const decreaseCount = () => {
    setCount(count - 1);
  }

  useEffect(() => {
    const onBodyClick = () => {
      console.log('There was a click in body element.');
    };
    document.body.addEventListener('click', onBodyClick);
    return () => document.body.removeEventListener('click', onBodyClick);
  }, []);

  useEffect(() => {
    console.log('Count has changed to:', count);
    document.title = `Count: ${count}`;
  }, [count]);

  useEffect(() => {
    console.log('Count does not impact this:', unchanged);
  }, [unchanged]);

  return (
    <div>
      <img src={SBLogo} alt="sb" />
      <h2 className="counterStyle">Count is {count}!</h2>
      <button type="button" onClick={increaseCount}>Increase Count</button>
      <button type="button" onClick={decreaseCount}>Decrease Count</button>
    </div>
  )
}
```

## **Step 7:** useCallback
```js
export const Counter: React.FC<ICounterProps> = ({ initial }) => {
  const [count, setCount] = useState(initial);
  const [unchanged] = useState('unchanged');

  const increaseCount = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const decreaseCount = useCallback(() => {
    setCount(count - 1);
  }, [count]);

  useEffect(() => {
    const onBodyClick = () => {
      console.log('There was a click in body element.');
    };
    document.body.addEventListener('click', onBodyClick);
    return () => document.body.removeEventListener('click', onBodyClick);
  }, []);

  useEffect(() => {
    console.log('Count has changed to:', count);
    document.title = `Count: ${count}`;
  }, [count]);

  useEffect(() => {
    console.log('Count does not impact this:', unchanged);
  }, [unchanged]);

  return (
    <div>
      <img src={SBLogo} alt="sb" />
      <h2 className="counterStyle">Count is {count}!</h2>
      <button type="button" onClick={increaseCount}>Increase Count</button>
      <button type="button" onClick={decreaseCount}>Decrease Count</button>
    </div>
  )
}
```

## **Step 8:** useRef & createRef
```js
export const Counter: React.FC<ICounterProps> = ({ initial }) => {
  const [count, setCount] = useState(initial);
  const [unchanged] = useState('unchanged');
  const inputRef = createRef<HTMLInputElement>();
  const previousCount = useRef<number>(count);

  const increaseCount = useCallback(() => {
    previousCount.current = count;
    setCount(count + 1);
  }, [count]);

  const decreaseCount = useCallback(() => {
    previousCount.current = count;
    setCount(count - 1);
  }, [count]);

  useEffect(() => {
    const onBodyClick = () => {
      console.log('There was a click in body element.');
    };
    document.body.addEventListener('click', onBodyClick);
    return () => document.body.removeEventListener('click', onBodyClick);
  }, []);

  useEffect(() => {
    console.log('Count has changed to:', count, 'from ', previousCount.current);
    document.title = `Count: ${count}`;
    if(inputRef.current) {
      inputRef.current.value = `${count}`;
    }
  }, [count, inputRef]);

  useEffect(() => {
    console.log('Count does not impact this:', unchanged);
  }, [unchanged]);

  return (
    <div>
      <img src={SBLogo} alt="sb" />
      <h2 className="counterStyle">Count is {count}!</h2>
      <button type="button" onClick={increaseCount}>Increase Count</button>
      <button type="button" onClick={decreaseCount}>Decrease Count</button>
      <input ref={inputRef} />
    </div>
  )
}
```

## **Step 8:** useMemo
```js
function fibonacci(num: number){
  let a = 1, b = 0, temp;

  while (num >= 0){
    temp = a;
    a = a + b;
    b = temp;
    num--;
  }

  return b;
}

export const Counter: React.FC<ICounterProps> = ({ initial }) => {
  const [count, setCount] = useState(initial);
  const [unchanged] = useState('unchanged');
  const inputRef = createRef<HTMLInputElement>();
  const previousCount = useRef<number>(count);
  const bigCalculation = useMemo(() => fibonacci(14), []);

  const increaseCount = useCallback(() => {
    previousCount.current = count;
    setCount(count + 1);
  }, [count]);

  const decreaseCount = useCallback(() => {
    previousCount.current = count;
    setCount(count - 1);
  }, [count]);

  useEffect(() => {
    const onBodyClick = () => {
      console.log('There was a click in body element.');
    };
    document.body.addEventListener('click', onBodyClick);
    return () => document.body.removeEventListener('click', onBodyClick);
  }, []);

  useEffect(() => {
    console.log('Count has changed to:', count, 'from ', previousCount.current);
    document.title = `Count: ${count}`;
    if(inputRef.current) {
      inputRef.current.value = `${count}`;
    }
  }, [count, inputRef]);

  useEffect(() => {
    console.log('Count does not impact this:', unchanged);
  }, [unchanged]);

  return (
    <div>
      <img src={SBLogo} alt="sb" />
      <h2 className="counterStyle">Count is {count} and Fibo is {bigCalculation}!</h2>
      <button type="button" onClick={increaseCount}>Increase Count</button>
      <button type="button" onClick={decreaseCount}>Decrease Count</button>
      <br />
      <br />
      <input ref={inputRef} />
    </div>
  )
}
```
## **Step 9:** Custom hooks
```js
import { useCallback, useState } from "react";

export function useCounter(initial: number) {
  const [count, setCount] = useState(initial);

  const increaseCount = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  const decreaseCount = useCallback(() => {
    setCount(count - 1);
  }, [count]);

  return {
    count,
    increaseCount,
    decreaseCount
  }
}
```
```js
export const Counter: React.FC<ICounterProps> = ({ initial }) => {
  const { count, increaseCount, decreaseCount } = useCounter(initial);
  const [unchanged] = useState('unchanged');
  const inputRef = createRef<HTMLInputElement>();
  const previousCount = useRef<number>(count);
  const bigCalculation = useMemo(() => fibonacci(14), []);

  useEffect(() => {
    const onBodyClick = () => {
      console.log('There was a click in body element.');
    };
    document.body.addEventListener('click', onBodyClick);
    return () => document.body.removeEventListener('click', onBodyClick);
  }, []);

  useEffect(() => {
    console.log('Count has changed to:', count, 'from ', previousCount.current);
    document.title = `Count: ${count}`;
    if(inputRef.current) {
      inputRef.current.value = `${count}`;
    }
    previousCount.current = count;
  }, [count, inputRef]);

  useEffect(() => {
    console.log('Count does not impact this:', unchanged);
  }, [unchanged]);

  return (
    <div>
      <img src={SBLogo} alt="sb" />
      <h2 className="counterStyle">Count is {count} and Fibo is {bigCalculation}!</h2>
      <button type="button" onClick={increaseCount}>Increase Count</button>
      <button type="button" onClick={decreaseCount}>Decrease Count</button>
      <br />
      <br />
      <input ref={inputRef} />
    </div>
  )
}
```
## **Step 10:** memo
```js
const MemoizedLazyComponent = memo(LazyLoadedComponent);

function fibonacci(num: number){
  let a = 1, b = 0, temp;

  while (num >= 0){
    temp = a;
    a = a + b;
    b = temp;
    num--;
  }

  return b;
}

export const Counter: React.FC<ICounterProps> = ({ initial }) => {
  const { count, increaseCount, decreaseCount } = useCounter(initial);
  const [unchanged] = useState('unchanged');
  const inputRef = createRef<HTMLInputElement>();
  const previousCount = useRef<number>(count);
  const bigCalculation = useMemo(() => fibonacci(14), []);

  useEffect(() => {
    const onBodyClick = () => {
      console.log('There was a click in body element.');
    };
    document.body.addEventListener('click', onBodyClick);
    return () => document.body.removeEventListener('click', onBodyClick);
  }, []);

  useEffect(() => {
    console.log('Count has changed to:', count, 'from ', previousCount.current);
    document.title = `Count: ${count}`;
    if(inputRef.current) {
      inputRef.current.value = `${count}`;
    }
    previousCount.current = count;
  }, [count, inputRef]);

  useEffect(() => {
    console.log('Count does not impact this:', unchanged);
  }, [unchanged]);

  return (
    <div>
      <img src={SBLogo} alt="sb" />
      <h2 className="counterStyle">Count is {count} and Fibo is {bigCalculation}!</h2>
      <button type="button" onClick={increaseCount}>Increase Count</button>
      <button type="button" onClick={decreaseCount}>Decrease Count</button>
      <br />
      <br />
      <input ref={inputRef} />
      <MemoizedLazyComponent />
    </div>
  )
}
```