import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link
} from 'react-router-dom';

export const NewNote = ({ setNotes, notes }) => {
  const [form, setForm] = useState({ title: '', description: '' });
  const [success, setSuccess] = useState(false);
  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  console.log(form);
  const handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('/notes', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    });
    const data = await response.json();
    setNotes({
      ...notes,
      data
    });
    setSuccess(true);
  };

  console.log(success);
  return (
    <>
      {success ? (
        <Redirect to='/' />
      ) : (
        <div className='container' style={{ width: '400px', marginTop: 20 }}>
          <form onSubmit={handleSubmit}>
            <fieldset>
              <div class='form-group'>
                <label for='exampleInputEmail1'>Title</label>
                <input
                  type='text'
                  name='title'
                  class='form-control'
                  id='exampleInputEmail1'
                  onChange={handleChange}
                  aria-describedby='emailHelp'
                  placeholder='Title'
                />
              </div>
              <div class='form-group'>
                <label for='exampleTextarea'>Description</label>
                <textarea
                  class='form-control'
                  name='description'
                  onChange={handleChange}
                  id='exampleTextarea'
                  rows='3'
                ></textarea>
              </div>
              <button type='submit'>Submit</button>
            </fieldset>
          </form>
        </div>
      )}
    </>
  );
};
