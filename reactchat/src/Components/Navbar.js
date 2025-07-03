import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
        <div className='logo'>Logo</div>
        <div className='actions'>
            <button className='btn-download'>DownLoad</button>
            <button className='btn-login'>Login</button>
        </div>
    </nav>
  )
}

export default Navbar