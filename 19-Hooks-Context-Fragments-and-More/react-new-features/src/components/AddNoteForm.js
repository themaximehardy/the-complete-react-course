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
