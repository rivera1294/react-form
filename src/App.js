import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';

function App() {
  const [notes, setNotes] = useState(null);
  const [form, setForm] = useState({ title: '', description: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    setIsSubmitting(true)
    const res = await fetch('/notes');
    const data = await res.json();
    setIsSubmitting(false)
    setNotes(data);
  }

  const validate = () => {
    // console.log('form', form)
    let err = {};
    if (!form.title) {
      err.title = 'Title is required';
    }
    if (!form.title.length > 40) {
      err.title = 'Title cannot be more than 40 characters';
    }
    if (!form.description) {
      err.description = 'Description is required';
    }

    return err;
  }

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const postNotes = async (data) => {
    await fetch('/notes', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate();

    if (Object.keys(errs).length === 0) {
      setIsSubmitting(true)
      await postNotes(form);
      setIsSubmitting(false);
      setForm({ title: '', description: '' })
    } else {
      showError(errs);
    }

    fetchNotes();
  };

  const showError = (errorObj) => {
    let errMsg = '';
    for (let err in errorObj) {
      errMsg += `${errorObj[err]}. `
    }
    alert(`Errors ${errMsg}`);
  }

  return (
    <div className='App'>
      <Navbar />
      <div className='container' style={{ width: '400px', marginTop: 20 }}>
        {
          isSubmitting
            ?
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            : ''
        }
        <form onSubmit={handleSubmit}>
          <fieldset>
            <div className='form-group'>
              <label>Title</label>
              <input
                type='text'
                name='title'
                className='form-control'
                id='exampleInputEmail1'
                onChange={handleChange}
                value={form.title}
                aria-describedby='emailHelp'
                placeholder='Title'
              />
            </div>
            <div className='form-group'>
              <label>Description</label>
              <textarea
                className='form-control'
                name='description'
                onChange={handleChange}
                value={form.description}
                placeholder='Description'
                id='exampleTextarea'
                rows='3'
              ></textarea>
            </div>
          </fieldset>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <div style={{ width: 400, marginTop: 20 }}>{
          JSON.stringify(notes, null, 8)
        }</div>
      </div>
    </div>
  );
}

export default App;
