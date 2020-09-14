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

// const App = (props) => {
//   const [count, setCount] = useState(props.count);
//   const [text, setText] = useState('');

//   useEffect(() => {
//     console.log('This should only run once!');
//   }, []);

//   useEffect(() => {
//     console.log('useEffect ran');
//     document.title = count;
//   }, [count]);

//   return (
//     <div>
//       <p>
//         The current {text || 'count'} is {count}.
//       </p>
//       <button onClick={() => setCount(count + 1)}>+1</button>
//       <button onClick={() => setCount(0)}>reset</button>
//       <button onClick={() => setCount(count - 1)}>-1</button>

//       <input
//         type="text"
//         value={text}
//         onChange={(e) => {
//           setText(e.target.value);
//         }}
//       />
//     </div>
//   );
// };

// App.defaultProps = {
//   count: 0,
// };

ReactDOM.render(
  <React.StrictMode>
    <NoteApp />
    {/* <App /> */}
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
