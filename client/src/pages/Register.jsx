import React, { use } from "react";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { isEmail, matches } from "validator";
import InputGroup from "../Components/InputGroup";

const Register = (props) => {
  useEffect(() => {
    console.log("Register component mounted");
  });

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState("");

  const isEmailValid = () => {
    if (!email.trim()) {
      setEmailErrorMessage("Email is required.");
      return false;
    } else if (!isEmail(email)) {
      setEmailErrorMessage("Email is not valid");
      return false;
    }
    return true;
  };

  const isUserNameValid = () => {
    if (!username.trim()) {
      setUsernameErrorMessage("Username is required.");
      return false;
    } else if (!matches(username, /^[a-zA-Z0-9]+$/)) {
      setUsernameErrorMessage("Username can only contain letters and numbers.");
      return false;
    }
    return true;
  };

  const isPasswordValid = () => {
    if (!password.trim()) {
      setPasswordErrorMessage("Password is required.");
      return false;
    } else if (password.length < 6) {
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      return false;
    } else if (password.length > 20) {
      setPasswordErrorMessage("Password cannot exceed 20 characters.");
      return false;
    } else if (!matches(password, /^[a-zA-Z0-9]+$/)) {
      setPasswordErrorMessage("Password can only contain letters and numbers.");
      return false;
    }
    return true;
  };

  const isConfirmPasswordValid = () => {
    if (!confirmPassword.trim()) {
      setConfirmPasswordErrorMessage("Confirm Password is required.");
      return false;
    } else if (
      confirmPassword.length < 6 ||
      confirmPassword.length > 20 ||
      password !== confirmPassword
    ) {
      setConfirmPasswordErrorMessage(
        "Confirm Password must match the Password"
      );
      return false;
    }

    return true;
  };

  const validateForm = () => {
    const isEmailOK = isEmailValid();
    const isUsernameOK = isUserNameValid();
    const isPasswordOK = isPasswordValid();
    const isConfirmPasswordOK = isPasswordOK ? isConfirmPasswordValid() : true;

    if (!isPasswordOK || !isConfirmPasswordOK) {
      setPassword("");
      setConfirmPassword("");
    }

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
      <div className="w-screen h-screen flex bg-white">
        <div className="shadow border-1 rounded-2xl py-8 mx-auto my-auto w-md">
          <form>
            <h2 className="text-center text-2xl mb-4">Create an account</h2>
            <InputGroup
              title="Email"
              placeholder="Email"
              type="email"
              isRequired={true}
              errorMessage={emailErrorMessage}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setEmailErrorMessage("");
              }}
            />

            <InputGroup
              title="Username"
              placeholder="Username"
              type="text"
              isRequired={true}
              errorMessage={usernameErrorMessage}
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
                setUsernameErrorMessage("");
              }}
            />

            <InputGroup
              title="Password"
              placeholder="Password"
              type="password"
              isRequired={true}
              errorMessage={passwordErrorMessage}
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setPasswordErrorMessage("");
              }}
            />

            <InputGroup
              title="Confirm Password"
              placeholder="Confirm Password"
              type="password"
              isRequired={true}
              errorMessage={confirmPasswordErrorMessage}
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                setConfirmPasswordErrorMessage("");
              }}
            />

            <p className="px-4 py-2">
              By creating an account, you agree to the{" "}
              <a href="#" className="text-blue-600">Terms of Service</a> and have read the{" "}
              <a href="#" className="text-blue-600">Privacy Policy</a>
            </p>

            <div className="w-full flex py-2">
            <button
              type="submit"
              onClick={handleSubmitAsync}
              className="rounded-2xl text-center m-auto px-6 py-2 cursor-pointer bg-blue-200 hover:bg-blue-400"
              style={{transition: "background 100ms linear"}}
            >
              Create Account
            </button>
            </div>
            
            <p className="px-4 pt-2 text-center">
              Already have an account? <a className="text-blue-600" href="/login">Log in</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
