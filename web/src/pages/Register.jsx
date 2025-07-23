import React, { use } from "react";
import { useEffect } from "react";

const Register = (props) => {
  
  useEffect(() => {
    console.log("Register component mounted");
  });


  return (
    <>
      <div className="page-container">
        <div className="signup-container">
          <h2>Create an account</h2>
          <form>
            <div className="input-group">
              <label htmlFor="email">
                Email <span style={{ color: "red" }}>*</span>
              </label>
              <input type="email" id="email" placeholder="Email" />
            </div>
            <div className="input-group">
              <label htmlFor="username">
                Username <span style={{ color: "red" }}>*</span>
              </label>
              <input type="text" id="username" placeholder="Username" />
            </div>

            <div className="input-group">
              <label htmlFor="password">
                Password <span style={{ color: "red" }}>*</span>
              </label>
              <input type="password" id="password" placeholder="Password" />
            </div>

            <div className="input-group">
              <label htmlFor="confirm-password">
                Confirm Password <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="password"
                id="confirm-password"
                placeholder="Confirm Password"
              />
            </div>

            <p className="terms-text">
              By creating an account, you agree to the{" "}
              <a href="#">Terms of Service</a> and have read the{" "}
              <a href="#">Privacy Policy</a>
            </p>

            <button type="submit" className="create-account-btn">
              Create Account
            </button>
          </form>

          <p className="login-prompt">
            Already have an account? <a href="/login">Log in</a>
          </p>
        </div>
      </div>
      <style>
        {`

body{
  background-color: #F2F4F7;
}

.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  color: #1c1e21;
  font-family: Arial, sans-serif;
}

.signup-container {
  background-color: #fff;
  padding: 40px;
  border-radius: 16px;
  width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.signup-container h2 {
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 15px 0;
}

.input-group {
  display: flex;
  flex-direction: column;
}

.input-group label {
  margin-bottom: 8px;
  margin-top: 8px;
  font-size: 14px;
  color: #1c1e21;
}

.input-group input {
  background-color: rgba(0,0,0,0);
  border: 1px solid rgb(204, 208, 213);
  border-radius: 8px;
  padding: 12px;
  color: rgb(28, 30, 33);
  font-size: 16px;
}

.input-group input::placeholder {
  color: #888888;
}

.terms-text {
  font-size: 12px;
  color: #777;
  margin: 10px 0;
}

.terms-text a {
  font-size: 12px;
  color: #4a90e2;
}

.create-account-btn {
  width: 100%;
  padding: 12px;
  background-color: #4a90e2;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 10px;
}

.login-prompt {
  text-align: center;
  font-size: 14px;
  color: #777777;
}

.login-prompt a {
  color: #4a90e2;
  font-size: 14px;
  text-decoration: none;
  font-weight: bold;
}
        `}
      </style>
    </>
  );
};

export default Register;
