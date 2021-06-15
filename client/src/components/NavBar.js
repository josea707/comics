import React from 'react';
import { Link } from 'react-router-dom';
const NavBar = () => {
  return (
    <header>
      <div className='navbar-container center'>
        <Link to='/' className='navbar-container__links white'>
          {' '}
          Home
        </Link>
        <Link to='/info/about' className='navbar-container__links white'>
          {' '}
          About
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
