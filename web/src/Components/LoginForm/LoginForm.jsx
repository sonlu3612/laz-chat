import React from 'react'
import './LoginForm.css'

const LoginForm = () => {
  return (
    <div className='wrapper'>
        <form action="">
          <h1>Login</h1>
          <div className="input-box">
            <p>Email</p>
            <input type="email" required/>
          </div>
          <div className="input-box">
            <p>Password</p>
            <input type="password" required/>
          </div>

          <div className="forgot-password">
            <a href="#!">Forgot your password?</a>
          </div>

          <button type='submit'>Login</button>

          <div className="register-link">
            <p>Don't have a account? <a href="#!">Register</a></p>
          </div>
        
        </form>
    </div>
  )
}

export default LoginForm