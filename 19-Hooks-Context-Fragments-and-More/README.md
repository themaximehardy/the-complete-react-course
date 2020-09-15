# Hooks, Context, Fragments, and More

### 1. Introduction

We're going to cover some **new React features** this includes _React Hooks_, the _Context API_, _React fragments_ and more along the way. Plus, we're going to explore **create-react-app**, a tool that makes easy to bootstrap a new React app!

### 2. Using Create React App

Create a new React app ([documentation](https://reactjs.org/docs/create-a-new-react-app.html)) via [`create-react-app`](https://github.com/facebook/create-react-app). This package is a React toolchain which help with tasks like:

- Scaling to many files and components.
- Using third-party libraries from npm.
- Detecting common mistakes early.
- Live-editing CSS and JS in development.
- Optimizing the output for production.

```sh
# install globally npm
npm i -g create-react-app
# check the version
create-react-app --version
# create a new project
create-react-app react-new-features

### OR, you could use npx
npx create-react-app my-app
cd my-app
yarn start
```

### 3. The useState Hook

The new feature **React Hooks** were first made available in version `16.8.0` of React. React Hooks were added to make our lives easier and it allows us to simplify our code!

Let's create a stateless functional component `App`. The reason is that React Hooks tie into our functional components. When functional components were introduced they were praised for being **lightweight**, **easy to work with**, **fast** and **easy to test**!

This is true but they also have their own set of limitations. For example there's no way to manage local state like we can do with a class based component. And there's also no way to tap into other react features like life cycle methods.

There are two ways of create components: **stateless functional components** and **class based components** and they have a very different set of features... But with React Hooks this is no longer the case!

_Important note: React hooks brings about exactly **zero breaking changes**!_

```js
// react-new-features/src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const App = () => {
  return (
    <div>
      <p>The current count is 0.</p>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
```

A React Hook is a function that lets you tap into a React feature like state or life cycle methods. Now, React ships with its own set of Hooks we can use as building blocks and we can also create our own Hooks. Let's focus on built-in Hooks first.

The first one `useState` allows us to use component state in our stateless functional components something we could not do in the past. As consequence, _stateless functional components_ become _functional components_ because it is possible to use state inside of them.

```js
// react-new-features/src/index.js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const App = () => {
  // count: current state value that's going to change over time
  // setCount: function we can call in order to update the state.
  // useState(0); – 0 = default value
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>The current count is {count}.</p>
      <button onClick={increment}>+1</button>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
```

---

```js
// react-new-features/src/index.js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const App = (props) => {
  const [count, setCount] = useState(props.count);

  const increment = () => {
    setCount(count + 1);
  };

  const reset = () => {
    setCount(0);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <div>
      <p>The current count is {count}.</p>
      <button onClick={increment}>+1</button>
      <button onClick={reset}>reset</button>
      <button onClick={decrement}>-1</button>
    </div>
  );
};

App.defaultProps = {
  count: 0,
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
```

### 4. useState vs. setState

We've learned one big difference between state and class based components about the state. In our functional components, the **state does not need to be an object**.

```js
const [count, setCount] = useState(0); // here is a number
```

What if I want to track more than one thing? Should I convert the state into an object? **Nope**! React wants you to call you state multiple times for the multiple things you are tracking.

```js
// react-new-features/src/index.js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const App = (props) => {
  const [count, setCount] = useState(props.count);
  const [text, setText] = useState('');

  return (
    <div>
      <p>
        The current {text || 'count'} is {count}.
      </p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(0)}>reset</button>
      <button onClick={() => setCount(count - 1)}>-1</button>

      <input
        type="text"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
    </div>
  );
};

App.defaultProps = {
  count: 0,
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
```

There are three things worth noting:

1. The **state** doesn't need to be an object with `useState`.
2. You can call `useState` as many times as you need for all of the different things you want to track (good practice)
3. When using `useState` and updating the state, **it completely replaces what was there before** as opposed to how state worked in the past with objects where the data was merged.

### 5. Complex State with useState

```js
// react-new-features/src/index.js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const addNote = (e) => {
    e.preventDefault();
    setNotes([
      ...notes,
      {
        title,
        body,
      },
    ]);
    setTitle('');
    setBody('');
  };

  const removeNote = (title) => {
    setNotes(notes.filter((note) => note.title !== title));
  };

  return (
    <div>
      <h1>Notes</h1>
      {notes.map((note) => (
        <div key={note.title}>
          <h3>{note.title}</h3>
          <p>{note.body}</p>
          <button onClick={() => removeNote(note.title)}>x</button>
        </div>
      ))}
      <p>Add note</p>
      <form onSubmit={addNote}>
        <br />
        <input
          placeholder="Title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <br />
        <textarea
          placeholder="Body"
          onChange={(e) => setBody(e.target.value)}
          cols="30"
          rows="10"
          value={body}
        ></textarea>
        <button>add note</button>
      </form>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <NoteApp />
  </React.StrictMode>,
  document.getElementById('root'),
);
```

### 6. The useEffect Hook

`useEffect` allows us to do something in functional components that we previously were not able to do. And this is kind of like **a replacement for lifecycle methods** in our class based components.

```js
useEffect(() => {
  console.log('useEffect ran');
  document.title = count;
});
```

`useEffect` is similar to a combination of `componentDidMount()` and `componentDidUpdate()`.

```js
// react-new-features/src/index.js
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const NoteApp = () => {
  const notesData = JSON.parse(localStorage.getItem('notes'));
  const [notes, setNotes] = useState(notesData || []);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  });

  const addNote = (e) => {
    e.preventDefault();
    setNotes([
      ...notes,
      {
        title,
        body,
      },
    ]);
    setTitle('');
    setBody('');
  };

  const removeNote = (title) => {
    setNotes(notes.filter((note) => note.title !== title));
  };

  return (
    <div>
      <h1>Notes</h1>
      {notes.map((note) => (
        <div key={note.title}>
          <h3>{note.title}</h3>
          <p>{note.body}</p>
          <button onClick={() => removeNote(note.title)}>x</button>
        </div>
      ))}
      <p>Add note</p>
      <form onSubmit={addNote}>
        <br />
        <input
          placeholder="Title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <br />
        <textarea
          placeholder="Body"
          onChange={(e) => setBody(e.target.value)}
          cols="30"
          rows="10"
          value={body}
        ></textarea>
        <button>add note</button>
      </form>
    </div>
  );
};
//...
```

### 7. useEffect Dependencies

Here, we are going to see how to **conditionally fire** an effect.

```js
useEffect(() => {
  console.log('This should only run once!');
}, []);
// [] => prevent to fire more than once!
// componentDidMount

useEffect(() => {
  console.log('useEffect ran');
  document.title = count;
}, [count]);
// [count] => only fire when count value is changed
// You should be explicit about what your effects depends on
```

---

```js
// react-new-features/src/index.js
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    const notesData = JSON.parse(localStorage.getItem('notes'));
    setNotes(notesData || []);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (e) => {
    e.preventDefault();
    setNotes([
      ...notes,
      {
        title,
        body,
      },
    ]);
    setTitle('');
    setBody('');
  };

  const removeNote = (title) => {
    setNotes(notes.filter((note) => note.title !== title));
  };

  return (
    <div>
      <h1>Notes</h1>
      {notes.map((note) => (
        <div key={note.title}>
          <h3>{note.title}</h3>
          <p>{note.body}</p>
          <button onClick={() => removeNote(note.title)}>x</button>
        </div>
      ))}
      <p>Add note</p>
      <form onSubmit={addNote}>
        <br />
        <input
          placeholder="Title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <br />
        <textarea
          placeholder="Body"
          onChange={(e) => setBody(e.target.value)}
          cols="30"
          rows="10"
          value={body}
        ></textarea>
        <button>add note</button>
      </form>
    </div>
  );
};
//...
```

### 8. Cleaning up Effects

So far, we've learned how we can work with `useEffect` to **substitute some of the lifecycle methods** as `componentDidMount()` and `componentDidUpdate()`. There's another lifecycle method that can be substituted using `useEffect` and that is `componentDidUnmount()` so this would have fired when our component was being unmounted and removed from the screen.

```js
//...
const Note = ({ note, removeNote }) => {
  useEffect(() => {
    console.log('Setting Up Effect');

    // return a function will have the same effect then componentDidUnmount()
    return () => {
      console.log('Cleaning Up Effect');
    };
  }, []);
  // be sure to add [] to avoid multiple not needed rerendering

  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <button onClick={() => removeNote(note.title)}>x</button>
    </div>
  );
};
//...
```

---

```js
// react-new-features/src/index.js
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const NoteApp = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    const notesData = JSON.parse(localStorage.getItem('notes'));
    setNotes(notesData || []);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (e) => {
    e.preventDefault();
    setNotes([
      ...notes,
      {
        title,
        body,
      },
    ]);
    setTitle('');
    setBody('');
  };

  const removeNote = (title) => {
    setNotes(notes.filter((note) => note.title !== title));
  };

  return (
    <div>
      <h1>Notes</h1>
      {notes.map((note) => (
        <Note key={note.title} note={note} removeNote={removeNote} />
      ))}
      <p>Add note</p>
      <form onSubmit={addNote}>
        <br />
        <input
          placeholder="Title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <br />
        <textarea
          placeholder="Body"
          onChange={(e) => setBody(e.target.value)}
          cols="30"
          rows="10"
          value={body}
        ></textarea>
        <button>add note</button>
      </form>
    </div>
  );
};

const Note = ({ note, removeNote }) => {
  useEffect(() => {
    console.log('Setting Up Effect');

    return () => {
      console.log('Cleaning Up Effect');
    };
  }, []);

  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <button onClick={() => removeNote(note.title)}>x</button>
    </div>
  );
};
//...
```

### 9. The useReducer Hook

The advantages of using Redux

1. Getting a **simpler way to describe the complex state changes** by defining **reducers**.
2. Getting the ability to **not have to pass props manually around**.

```js
// react-new-features/src/index.js
import React, { useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

const notesReducer = (state, action) => {
  switch (action.type) {
    case 'POPULATE_NOTES':
      return action.notes;
    case 'ADD_NOTE':
      return [...state, { title: action.title, body: action.body }];
    case 'REMOVE_NOTE':
      return state.filter((note) => note.title !== action.title);
    default:
      return state;
  }
};

const NoteApp = () => {
  const [notes, dispatch] = useReducer(notesReducer, []);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('notes'));

    if (notes) {
      dispatch({ type: 'POPULATE_NOTES', notes });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_NOTE', title, body });
    setTitle('');
    setBody('');
  };

  const removeNote = (title) => {
    dispatch({ type: 'REMOVE_NOTE', title });
  };

  return (
    <div>
      <h1>Notes</h1>
      {notes.map((note) => (
        <Note key={note.title} note={note} removeNote={removeNote} />
      ))}
      <p>Add note</p>
      <form onSubmit={addNote}>
        <br />
        <input
          placeholder="Title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <br />
        <textarea
          placeholder="Body"
          onChange={(e) => setBody(e.target.value)}
          cols="30"
          rows="10"
          value={body}
        ></textarea>
        <button>add note</button>
      </form>
    </div>
  );
};

const Note = ({ note, removeNote }) => {
  useEffect(() => {
    console.log('Setting Up Effect');

    return () => {
      console.log('Cleaning Up Effect');
    };
  }, []);

  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <button onClick={() => removeNote(note.title)}>x</button>
    </div>
  );
};
//...
```

### 10. The Context API & useContext Hook: Part I

Now, you know how to use the `useReducer` hook to manage a more complex state. Here, we're going to talk about the **React Context API** and the `useContext` Hook to **manage a more complex hierarchy of components**.

One of the problems is that all of our components were really **tightly bond**. We have a ton of props being passed between them. This included **data to be rendered** and **functions to be called** and it made our **components really hard to reuse** throughout the application.

Redux as a solution, aprovider component and then the `Connect` function allowing our individual components to grab the data they needed without needing the parent component to pass it down. Now this functionality is baked right into React itself.

Let's organise or files and folders (before using the Context API).

![files-and-folders](../img/s19/19-1-files-and-folders.png 'files-and-folders')

```js
// react-new-features/src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import NoteApp from './components/NoteApp';

ReactDOM.render(
  <React.StrictMode>
    <NoteApp />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

```js
// react-new-features/src/reducers/note.js
const notesReducer = (state, action) => {
  switch (action.type) {
    case 'POPULATE_NOTES':
      return action.notes;
    case 'ADD_NOTE':
      return [...state, { title: action.title, body: action.body }];
    case 'REMOVE_NOTE':
      return state.filter((note) => note.title !== action.title);
    default:
      return state;
  }
};

export { notesReducer as default };
```

```js
// react-new-features/src/components/NoteApp.js
import React, { useEffect, useReducer } from 'react';
import notesReducer from '../reducers/note';
import NoteList from './NoteList';
import AddNoteFrom from './AddNoteForm';

const NoteApp = () => {
  const [notes, dispatch] = useReducer(notesReducer, []);

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('notes'));

    if (notes) {
      dispatch({ type: 'POPULATE_NOTES', notes });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const removeNote = (title) => {
    dispatch({ type: 'REMOVE_NOTE', title });
  };

  return (
    <div>
      <h1>Notes</h1>
      <NoteList notes={notes} removeNote={removeNote} />
      <AddNoteFrom dispatch={dispatch} />
    </div>
  );
};

export { NoteApp as default };
```

```js
// react-new-features/src/components/NoteList.js
import React from 'react';

import Note from './Note';

const NoteList = ({ notes, removeNote }) => {
  return notes.map((note) => (
    <Note key={note.title} note={note} removeNote={removeNote} />
  ));
};

export { NoteList as default };
```

```js
// react-new-features/src/components/Note.js
import React from 'react';

const Note = ({ note, removeNote }) => {
  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <button onClick={() => removeNote(note.title)}>x</button>
    </div>
  );
};

export { Note as default };
```

```js
// react-new-features/src/components/AddNoteForm.js
import React, { useState } from 'react';

const AddNoteForm = ({ dispatch }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const addNote = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_NOTE', title, body });
    setTitle('');
    setBody('');
  };

  return (
    <>
      <p>Add note</p>
      <form onSubmit={addNote}>
        <br />
        <input
          placeholder="Title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <br />
        <textarea
          placeholder="Body"
          onChange={(e) => setBody(e.target.value)}
          cols="30"
          rows="10"
          value={body}
        ></textarea>
        <button>add note</button>
      </form>
    </>
  );
};

export { AddNoteForm as default };
```

_Note: we didn't really cover anything new but in order to cover what is coming next, we needed a more complex set of components where we were passing props between them._

Previously, we solved it with **Redux**. Now, we're going to solve it using the **React Context API** and the **use context hook**.

### 11. The Context API & useContext Hook: Part II

From the [React documentation](https://reactjs.org/docs/context.html). **Context –**

> Context provides a way to pass data through the component tree without having to pass props down manually at every level.

![files-and-folders](../img/s19/19-2-files-and-folders.png 'files-and-folders')

```js
// react-new-features/src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import NoteApp from './components/NoteApp';

ReactDOM.render(
  <React.StrictMode>
    <NoteApp />
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

```js
// react-new-features/src/context/notes-context.js
import React from 'react';

const NotesContext = React.createContext();

export { NotesContext as default };
```

```js
// react-new-features/src/reducers/note.js
const notesReducer = (state, action) => {
  switch (action.type) {
    case 'POPULATE_NOTES':
      return action.notes;
    case 'ADD_NOTE':
      return [...state, { title: action.title, body: action.body }];
    case 'REMOVE_NOTE':
      return state.filter((note) => note.title !== action.title);
    default:
      return state;
  }
};

export { notesReducer as default };
```

```js
// react-new-features/src/components/NoteApp.js
import React, { useEffect, useReducer } from 'react';
import notesReducer from '../reducers/note';
import NoteList from './NoteList';
import AddNoteFrom from './AddNoteForm';
import NotesContext from '../context/notes-context';

const NoteApp = () => {
  const [notes, dispatch] = useReducer(notesReducer, []);

  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem('notes'));

    if (notes) {
      dispatch({ type: 'POPULATE_NOTES', notes });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  return (
    <NotesContext.Provider value={{ notes, dispatch }}>
      <h1>Notes</h1>
      <NoteList />
      <AddNoteFrom />
    </NotesContext.Provider>
  );
};

export { NoteApp as default };
```

```js
// react-new-features/src/components/NoteList.js
import React, { useContext } from 'react';
import Note from './Note';
import NotesContext from '../context/notes-context';

const NoteList = () => {
  const { notes } = useContext(NotesContext);

  return notes.map((note) => <Note key={note.title} note={note} />);
};

export { NoteList as default };
```

```js
// react-new-features/src/components/Note.js
import React, { useContext } from 'react';
import NotesContext from '../context/notes-context';

const Note = ({ note }) => {
  const { dispatch } = useContext(NotesContext);

  const removeNote = (title) => {
    dispatch({ type: 'REMOVE_NOTE', title });
  };

  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <button onClick={() => removeNote(note.title)}>x</button>
    </div>
  );
};

export { Note as default };
```

```js
// react-new-features/src/components/AddNoteForm.js
import React, { useState, useContext } from 'react';
import notes_context from '../context/notes-context';

const AddNoteForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const { dispatch } = useContext(notes_context);

  const addNote = (e) => {
    e.preventDefault();
    dispatch({ type: 'ADD_NOTE', title, body });
    setTitle('');
    setBody('');
  };

  return (
    <>
      <p>Add note</p>
      <form onSubmit={addNote}>
        <br />
        <input
          placeholder="Title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <br />
        <textarea
          placeholder="Body"
          onChange={(e) => setBody(e.target.value)}
          cols="30"
          rows="10"
          value={body}
        ></textarea>
        <button>add note</button>
      </form>
    </>
  );
};

export { AddNoteForm as default };
```

### 12. Fragments

```js
import React from 'react';

const Test = () => {
  return (
    <>
      <p>first element</p>
      <p>second element</p>
    </>
  );
};

export { Test as default };
```

### 13. Creating Custom Hooks

**STEP 1**

```js
// react-new-features/src/components/Note.js
import React, { useState, useContext } from 'react';
import NotesContext from '../context/notes-context';

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  return position;
};

const Note = ({ note }) => {
  const { dispatch } = useContext(NotesContext);
  const position = useMousePosition();

  const removeNote = (title) => {
    dispatch({ type: 'REMOVE_NOTE', title });
  };

  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <p>
        position: {position.x}, {position.y}
      </p>
      <button onClick={() => removeNote(note.title)}>x</button>
    </div>
  );
};

export { Note as default };
```

**STEP 2**

```js
// react-new-features/src/components/Note.js
import React, { useState, useEffect, useContext } from 'react';
import NotesContext from '../context/notes-context';

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log('Setting up event');
    const handleMouseMove = (e) => {
      setPosition({
        x: e.pageX,
        y: e.pageY,
      });
    };
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return position;
};

const Note = ({ note }) => {
  const { dispatch } = useContext(NotesContext);
  const position = useMousePosition();

  const removeNote = (title) => {
    dispatch({ type: 'REMOVE_NOTE', title });
  };

  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <p>
        position: {position.x}, {position.y}
      </p>
      <button onClick={() => removeNote(note.title)}>x</button>
    </div>
  );
};

export { Note as default };
```

**STEP 3**

```js
// react-new-features/src/hooks/useMousePosition.js
import { useState, useEffect } from 'react';

const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log('Setting up event');
    const handleMouseMove = (e) => {
      setPosition({
        x: e.pageX,
        y: e.pageY,
      });
    };
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return position;
};

export { useMousePosition as default };
```

```js
// react-new-features/src/components/Note.js
import React, { useContext } from 'react';
import NotesContext from '../context/notes-context';
import useMousePosition from '../hooks/useMousePosition';

const Note = ({ note }) => {
  const { dispatch } = useContext(NotesContext);
  const position = useMousePosition();

  const removeNote = (title) => {
    dispatch({ type: 'REMOVE_NOTE', title });
  };

  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <p>
        position: {position.x}, {position.y}
      </p>
      <button onClick={() => removeNote(note.title)}>x</button>
    </div>
  );
};

export { Note as default };
```
