import React from 'react';

export const NoteList = ({ notes }) => {
  return (
    <div
      className='container'
      style={{
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <div className='card-container'>
        {notes
          ? notes.map((note, i) => {
              return (
                <div
                  key={note.id}
                  className='card border-primary mb-3'
                  style={{ maxWidth: '20rem' }}
                >
                  <div className='card-body'>
                    <h4 className='card-title'>{note.title}</h4>
                    <p className='card-text'>{note.description}</p>
                  </div>
                </div>
              );
            })
          : ''}
      </div>
    </div>
  );
};
