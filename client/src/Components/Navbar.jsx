import React from 'react'
import {useNavigate } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const navigate = useNavigate ();

  const handleLoginClick = () => {
    navigate("/login")
  }

  return (

    <nav className="navbar">
        <div className='logo'>Logo</div>
        <div className='actions'>
            <button className='btn-download'>DownLoad</button>
            <button className='btn-login' onClick={handleLoginClick}>Login</button>
        </div>
    </nav>
  )
}

export default Navbar