import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { NewNote } from './pages/NewNote';
import { Index } from './pages/Index';
import './App.css';

function App() {
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    async function fetchNotes() {
      const res = await fetch('/notes');
      const data = await res.json();
      setNotes(data);
    }
    fetchNotes();
  }, []);
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={() => <Index notes={notes} />} />
          <Route
            path='/new'
            exact
            component={() => <NewNote setNotes={setNotes} notes={notes} />}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
