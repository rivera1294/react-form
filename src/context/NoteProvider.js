import React, { useReducer } from 'react';
import NoteContext from './noteContext';
import noteReducer from './noteReducer';

const NoteProvider = props => {
  const initialState = {
    notes: []
  };

  const [state, dispatch] = useReducer(noteReducer, initialState);

  // Get all Posts
  const getNotes = async () => {
    try {
      const res = await fetch('/notes');
      const data = await res.json();
      dispatch({ type: 'SET_NOTES', payload: data });
    } catch (err) {
      console.log(err);
    }
  };
  // Get Post by id
  const postNote = async data => {
    try {
      dispatch({ type: 'SENDING_REQUEST' });
      const res = await fetch(`/notes/`, {});
      const data = await res.json();
      dispatch({ type: 'REQUEST_FINISHED' });
      dispatch({ type: 'SET_POST', payload: data });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <NoteContext.Provider
      value={{
        notes: state.notes,
        getNotes
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteProvider;
