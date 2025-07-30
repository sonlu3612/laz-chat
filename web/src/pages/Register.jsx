import React, { use } from "react";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { isEmail, matches } from "validator";

const Register = (props) => {
  useEffect(() => {
    console.log("Register component mounted");
  });

  const emailInputRef = useRef(null);
  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name } = e.target;

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const isEmailValid = (newErrors, email) => {
    if (!email.trim()) {
      newErrors.email = "Email is required.";
      return false;
    } else if (!isEmail(email)) {
      newErrors.email = "Email is not valid";
      return false;
    }
    return true;
  };

  const isUserNameValid = (newErrors, username) => {
    if (!username.trim()) {
      newErrors.username = "Username is required.";
      return false;
    } else if (!matches(username, /^[a-zA-Z0-9]+$/)) {
      newErrors.username = "Username can only contain letters and numbers.";
      return false;
    }
    return true;
  };

  const isPasswordValid = (newErrors, password) => {
    if (!password) {
      newErrors.password = "Password is required.";
      return false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
      return false;
    } else if (password.length > 20) {
      newErrors.password = "Password cannot exceed 20 characters.";
      return false;
    } else if (!matches(password, /^[a-zA-Z0-9]+$/)) {
      newErrors.password = "Password can only contain letters and numbers.";
      return false;
    }
    return true;
  };

  const isConfirmPasswordValid = (
    newErrors,
    isPasswordValid,
    password,
    confirmPassword
  ) => {
    if (isPasswordValid) {
      if (!confirmPassword) {
        newErrors.confirmPassword = "Confirm Password is required.";
        return false;
      } else if (
        confirmPassword.length < 6 ||
        confirmPassword.length > 20 ||
        password !== confirmPassword
      ) {
        newErrors.confirmPassword = "Confirm Password must match the Password";
        return false;
      }
    }

    return true;
  };

  const validateForm = () => {
    let newErrors = {};

    const username = usernameInputRef.current.value;
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    const confirmPassword = confirmPasswordInputRef.current.value;

    const isEmailOK = isEmailValid(newErrors, email);
    const isUsernameOK = isUserNameValid(newErrors, username);
    const isPasswordOK = isPasswordValid(newErrors, password);
    const isConfirmPasswordOK = isConfirmPasswordValid(
      newErrors,
      isPasswordOK,
      password,
      confirmPassword
    );

    if (!isPasswordOK || !isConfirmPasswordOK) {
      passwordInputRef.current.value = "";
      confirmPasswordInputRef.current.value = "";
    }

    setErrors(newErrors);
    return isEmailOK && isUsernameOK && isPasswordOK && isConfirmPasswordOK;
  };

  const handleSubmitAsync = async (e) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) {

      return;
    }
    alert("Form is ok!");
  };

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
              <input
                onChange={handleChange}
                name="email"
                type="email"
                id="email"
                placeholder="Email"
                ref={emailInputRef}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>

            <div className="input-group">
              <label htmlFor="username">
                Username <span style={{ color: "red" }}>*</span>
              </label>
              <input
                onChange={handleChange}
                name="username"
                type="text"
                id="username"
                placeholder="Username"
                ref={usernameInputRef}
              />
              {errors.username && (
                <p className="error-message">{errors.username}</p>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="password">
                Password <span style={{ color: "red" }}>*</span>
              </label>
              <input
                onChange={handleChange}
                name="password"
                type="password"
                id="password"
                placeholder="Password"
                ref={passwordInputRef}
              />
              {errors.password && (
                <p className="error-message">{errors.password}</p>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="confirm-password">
                Confirm Password <span style={{ color: "red" }}>*</span>
              </label>
              <input
                onChange={handleChange}
                name="confirmPassword"
                type="password"
                id="confirm-password"
                placeholder="Confirm Password"
                ref={confirmPasswordInputRef}
              />
              {errors.confirmPassword && (
                <p className="error-message">{errors.confirmPassword}</p>
              )}
            </div>

            <p className="terms-text">
              By creating an account, you agree to the{" "}
              <a href="#">Terms of Service</a> and have read the{" "}
              <a href="#">Privacy Policy</a>
            </p>

            <button
              type="submit"
              onClick={handleSubmitAsync}
              className="create-account-btn"
            >
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

.error-message {
  color: red;
  font-size: 14px;
}
        `}
      </style>
    </>
  );
};

export default Register;
