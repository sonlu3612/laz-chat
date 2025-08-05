import React, { use } from "react";
import { useEffect } from "react";
import { useState, useRef } from "react";
import { isEmail, matches } from "validator";
import InputGroup from "../Components/InputGroup";

const Register = (props) => {
  useEffect(() => {
    console.log("Register component mounted");
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState("");

  const firstNameRegex = /^[A-Za-z]+(?:[-\s][A-Za-z]+)*$/;
  const lastNameRegex = /^[A-Za-z]+(?:[-\s][A-Za-z]+)*$/;
  const phoneRegex = /^[0-9]{10}$/;

  const isFirstNameValid = () => {
    if (!firstName.trim()) {
      setFirstNameErrorMessage("First name is required.");
      return false;
    } else if (firstName.length > 20) {
      setFirstNameErrorMessage("First name cannot exceed 20 characters.");
      return false;
    } else if (!matches(firstName, firstNameRegex)) {
      setFirstNameErrorMessage(
        "First name can only contain letters and cannot start or end with a space or a hyphen."
      );
      return false;
    }
    return true;
  };

  const isLastNameValid = () => {
    if (!lastName.trim()) {
      setLastNameErrorMessage("Last name is required.");
      return false;
    } else if (lastName.length > 20) {
      setLastNameErrorMessage("Last name cannot exceed 20 characters.");
      return false;
    } else if (!matches(lastName, lastNameRegex)) {
      setLastNameErrorMessage(
        "Last name can only contain letters cannot start or end with a space or a hyphen."
      );
      return false;
    }
    return true;
  };

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

  const isPhoneValid = () => {
    if (!phone.trim()) {
      setPhoneErrorMessage("Phone is required.");
      return false;
    } else if (!(phone.length == 10)) {
      setPhoneErrorMessage("Phone must be 10 digits.");
      return false;
    } else if (!matches(phone, phoneRegex)) {
      setPhoneErrorMessage("Phone can only contain letters and numbers.");
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
    const isFirstNameOK = isFirstNameValid();
    const isLastNameOK = isLastNameValid();
    const isEmailOK = isEmailValid();
    const isPhoneOK = isPhoneValid();
    const isPasswordOK = isPasswordValid();
    const isConfirmPasswordOK = isPasswordOK ? isConfirmPasswordValid() : true;

    if (!isPasswordOK || !isConfirmPasswordOK) {
      setPassword("");
      setConfirmPassword("");
    }

    return (
      isFirstNameOK &&
      isLastNameOK &&
      isEmailOK &&
      isPhoneOK &&
      isPasswordOK &&
      isConfirmPasswordOK
    );
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

            <div className="grid grid-cols-2">
              <InputGroup
                title="First name"
                placeholder="First name"
                type="text"
                isRequired={true}
                errorMessage={firstNameErrorMessage}
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.target.value);
                  setFirstNameErrorMessage("");
                }}
              />

              <InputGroup
                title="Last name"
                placeholder="Last name"
                type="text"
                isRequired={true}
                errorMessage={lastNameErrorMessage}
                value={lastName}
                onChange={(event) => {
                  setLastName(event.target.value);
                  setLastNameErrorMessage("");
                }}
              />
            </div>

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
              title="Phone"
              placeholder="Phone"
              type="tel"
              isRequired={true}
              errorMessage={phoneErrorMessage}
              value={phone}
              onChange={(event) => {
                setPhone(event.target.value);
                setPhoneErrorMessage("");
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
              <a href="#" className="text-blue-600">
                Terms of Service
              </a>{" "}
              and have read the{" "}
              <a href="#" className="text-blue-600">
                Privacy Policy
              </a>
            </p>

            <div className="w-full flex py-2">
              <button
                type="submit"
                onClick={handleSubmitAsync}
                className="rounded-2xl text-center m-auto px-6 py-2 cursor-pointer bg-blue-200 hover:bg-blue-400"
                style={{ transition: "background 100ms linear" }}
              >
                Create Account
              </button>
            </div>

            <p className="px-4 pt-2 text-center">
              Already have an account?{" "}
              <a className="text-blue-600" href="/login">
                Log in
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
