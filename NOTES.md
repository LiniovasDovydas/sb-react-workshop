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

const Counter = lazy(() => import('../../components/counter/counter'));

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
  console.log('fibo run');
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

# Extra Work
A simple todo list with add and remove and completed

## **Step 1:** Create a todo list component
`src/components/todoList/todoList.tsx`
```tsx
import React, { useState } from 'react';

export type SingleTodo = {
  title: string;
  completed: boolean;
}

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<SingleTodo[]>([]);

  return <>Todo list</>;
};
```

## **Step 2:** Import todo list
`src/Workshop/content/content.tsx`
```tsx
import React, { Suspense } from 'react';
import { TodoList } from '../../components/todoList/todoList';

export const Content: React.FC = () => (
  <div className="startingTitle">
    <TodoList />
  </div>
);
```

## **Step 3:** Create a component for adding a todo
`src/components/addToDo/addToDo.tsx`
```ts
import React, { createRef } from 'react';
import { SingleTodo } from '../todoList/todoList';

interface IAddToDo {
  onAdd(todo: SingleTodo): void;
}

export const AddToDo: React.FC<IAddToDo> = ({ onAdd }) => {
  const todoTitleRef = createRef<HTMLInputElement>();

  return (
    <div>
      <input type="text" ref={todoTitleRef} />
      <button type="button">Add</button>
    </div>
  )
}
```
`src/components/todoList/todoList.tsx`
```ts
export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<SingleTodo[]>([]);

  return (
    <div>
      <AddToDo onAdd={() => {}} />
      Todo List
    </div>
  );
};
```

## **Step 4:** Make add button functional
`src/components/addToDo/addToDo.tsx`
```ts
export const AddToDo: React.FC<IAddToDo> = ({ onAdd }) => {
  const todoTitleRef = createRef<HTMLInputElement>();

  const onAddClick = () => {
    const title = todoTitleRef.current!.value;
    if(title && title.length) {
      onAdd({
        completed: false,
        title
      });
      todoTitleRef.current!.value = '';
    }
  }

  return (
    <div>
      <input type="text" ref={todoTitleRef} />
      <button type="button" onClick={onAddClick}>Add</button>
    </div>
  )
}
```

## **Step 5:** Make todoList to add todo to the array
`src/components/todoList/todoList.tsx`
```ts
export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<SingleTodo[]>([]);

  const onTodoAdd = (todo: SingleTodo) => {
    setTodos([
      ...todos,
      todo
    ]);
  }

  return (
    <div>
      <AddToDo onAdd={onTodoAdd} />
      Todo List
    </div>
  );
};
```

## **Step 6:** Create a single todo component
`src/components/todoItem/todoItem.tsx`
```ts
import React from 'react';
import { SingleTodo } from '../todoList/todoList';

type SingleTodoProps = {
  onToggleCompleted(): void;
} & SingleTodo;

export const TodoItem: React.FC<SingleTodoProps> = ({ completed, title, onToggleCompleted }) => (
  <li className={['todoItem', completed ? 'todoItemCompleted' : ''].join(' ')}>
    <span className="todoItemTitle">{title}</span>
    <input type="checkbox" checked={completed} onChange={onToggleCompleted} />
    <button type="button">Remove</button>
  </li>
);
```

## **Step 7:** Display todos
`src/components/todoList/todoList.tsx`
```ts
export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<SingleTodo[]>([]);

  const onTodoAdd = (todo: SingleTodo) => {
    setTodos([
      ...todos,
      todo
    ]);
  }

  return (
    <div>
      <AddToDo onAdd={onTodoAdd} />
      <ol>
        {todos.length
          ? todos.map((todo, index) => (
            <TodoItem key={index} {...todo} onToggleCompleted={() => {}} />
          )) : <div>No todos found</div>}
      </ol>
    </div>
  );
};
```

## **Step 7:** Complete todos
`src/components/todoList/todoList.tsx`
```tsx
export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<SingleTodo[]>([]);

  const onTodoAdd = (todo: SingleTodo) => {
    setTodos([
      ...todos,
      todo
    ]);
  }

  const onToggleTodo = (index: number) => () => {
    const todosMap = todos.map((todo, todoIndex) => ({
      ...todo,
      completed: todoIndex === index
        ? !todo.completed : todo.completed
    }));
    setTodos(todosMap);
  }

  return (
    <div>
      <AddToDo onAdd={onTodoAdd} />
      <ol>
        {todos.length
          ? todos.map((todo, index) => (
            <TodoItem key={index} {...todo} onToggleCompleted={onToggleTodo(index)} />
          )) : <div>No todos found</div>}
      </ol>
    </div>
  );
};
```

## **Step 8:** Remove todo
`src/components/todoItem/todoItem.tsx`
```tsx
type SingleTodoProps = {
  onToggleCompleted(): void;
  onTodoRemove(): void;
} & SingleTodo;

export const TodoItem: React.FC<SingleTodoProps> = ({ completed, title, onToggleCompleted, onTodoRemove }) => (
  <li className={['todoItem', completed ? 'todoItemCompleted' : ''].join(' ')}>
    <span className="todoItemTitle">{title}</span>
    <input type="checkbox" checked={completed} onChange={onToggleCompleted} />
    <button type="button" onClick={onTodoRemove}>Remove</button>
  </li>
);
```
`src/components/todoList/todoList.tsx`
```tsx
export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<SingleTodo[]>([]);

  const onTodoAdd = (todo: SingleTodo) => {
    setTodos([
      ...todos,
      todo
    ]);
  }

  const onToggleTodo = (index: number) => () => {
    const todosMap = todos.map((todo, todoIndex) => ({
      ...todo,
      completed: todoIndex === index
        ? !todo.completed : todo.completed
    }));
    setTodos(todosMap);
  }

  const onTodoRemove = (index: number) => () => {
    const todosMap = todos.filter((todo, todoIndex) => todoIndex !== index);
    setTodos(todosMap);
  }

  return (
    <div>
      <AddToDo onAdd={onTodoAdd} />
      <ol>
        {todos.length
          ? todos.map((todo, index) => (
            <TodoItem
              key={index}
              {...todo}
              onTodoRemove={onTodoRemove(index)}
              onToggleCompleted={onToggleTodo(index)}
            />
          )) : <div>No todos found</div>}
      </ol>
    </div>
  );
};
```

## **Step 9:** local storage useEffect
`src/components/todoList/todoList.tsx`
```tsx
const LocalStorageId = 'todos';

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<SingleTodo[]>(() => {
    const localTodos = localStorage.getItem(LocalStorageId);
    return localTodos ? JSON.parse(localTodos) : [];
  });

  const onTodoAdd = (todo: SingleTodo) => {
    setTodos([
      ...todos,
      todo
    ]);
  }

  const onToggleTodo = (index: number) => () => {
    const todosMap = todos.map((todo, todoIndex) => ({
      ...todo,
      completed: todoIndex === index
        ? !todo.completed : todo.completed
    }));
    setTodos(todosMap);
  }

  const onTodoRemove = (index: number) => () => {
    const todosMap = todos.filter((todo, todoIndex) => todoIndex !== index);
    setTodos(todosMap);
  }

  useEffect(() => {
    localStorage.setItem(LocalStorageId, JSON.stringify(todos));
  }, [todos]);

  return (
    <div>
      <AddToDo onAdd={onTodoAdd} />
      <ol>
        {todos.length
          ? todos.map((todo, index) => (
            <TodoItem
              key={index}
              {...todo}
              onTodoRemove={onTodoRemove(index)}
              onToggleCompleted={onToggleTodo(index)}
            />
          )) : <div>No todos found</div>}
      </ol>
    </div>
  );
};
```