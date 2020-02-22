import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        <div>
          <Link to={'/'} className='navbar-brand'>
            React form
          </Link>
        </div>

        <p style={{ margin: 0, alignSelf: 'center', color: 'white' }}>
          <Link to={'/new'} style={{ color: 'white' }}>
            Create Note
          </Link>
        </p>
      </div>
    </nav>
  );
};
