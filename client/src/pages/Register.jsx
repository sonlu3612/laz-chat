import { useEffect } from "react";
import { useState } from "react";
import { replace, useNavigate } from "react-router-dom";
import { isEmail, matches } from "validator";

import axiosInstance from "../utils/axios";
import InputGroup from "../Components/InputGroup";
import { Navigate } from "react-router-dom";

const Register = (props) => {
  useEffect(() => {
    console.log("Register component mounted");
  });

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [postMessage, setPostMessage] = useState({
    isSuccess: false,
    text: "",
  });

  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState("");

  const firstNameRegex = /^[A-Za-z]+(?:[-\s][A-Za-z]+)*$/;
  const lastNameRegex = /^[A-Za-z]+(?:[-\s][A-Za-z]+)*$/;
  const phoneNumberRegex = /^[0-9]{10}$/;
  const passwordRegex_HasLowercase = /[a-z]/;
  const passwordRegex_HasUppercase = /[A-Z]/;
  const passwordRegex_HasDigit = /\d/;
  const passwordRegex_HasUniqueChar = /[@$!%*?&]/;

  const isFirstNameValid = () => {
    if (!firstName.trim()) {
      setFirstNameErrorMessage("First name is required.");
      return false;
    }
    if (firstName.length > 20) {
      setFirstNameErrorMessage("First name cannot exceed 20 characters.");
      return false;
    }
    if (!matches(firstName, firstNameRegex)) {
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
    }
    if (lastName.length > 20) {
      setLastNameErrorMessage("Last name cannot exceed 20 characters.");
      return false;
    }
    if (!matches(lastName, lastNameRegex)) {
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
    }
    if (!isEmail(email)) {
      setEmailErrorMessage("Email is not valid");
      return false;
    }
    return true;
  };

  const isPhoneNumberValid = () => {
    if (!phoneNumber.trim()) {
      setPhoneNumberErrorMessage("PhoneNumber is required.");
      return false;
    }
    if (!(phoneNumber.length == 10)) {
      setPhoneNumberErrorMessage("PhoneNumber must be 10 digits.");
      return false;
    }
    if (!matches(phoneNumber, phoneNumberRegex)) {
      setPhoneNumberErrorMessage(
        "Phone Number can only contain letters and numbers."
      );
      return false;
    }

    return true;
  };

  const isPasswordValid = () => {
    if (!password.trim()) {
      setPasswordErrorMessage("Password is required.");
      return false;
    }
    if (password.length < 6) {
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      return false;
    }
    if (password.length > 20) {
      setPasswordErrorMessage("Password cannot exceed 20 characters.");
      return false;
    }
    if (!matches(password, passwordRegex_HasLowercase)) {
      setPasswordErrorMessage(
        "Password needs at least 1 digit, 1 lowercase, 1 uppercase and 1 unique char(@, $, !, %, *, ?, &)"
      );
      return false;
    }
    if (!matches(password, passwordRegex_HasUppercase)) {
      setPasswordErrorMessage(
        "Password needs at least 1 digit, 1 lowercase, 1 uppercase and 1 unique char(@, $, !, %, *, ?, &)"
      );
      return false;
    }
    if (!matches(password, passwordRegex_HasDigit)) {
      setPasswordErrorMessage(
        "Password needs at least 1 digit, 1 lowercase, 1 uppercase and 1 unique char(@, $, !, %, *, ?, &)"
      );
      return false;
    }
    if (!matches(password, passwordRegex_HasUniqueChar)) {
      setPasswordErrorMessage(
        "Password needs at least 1 digit, 1 lowercase, 1 uppercase and 1 unique char(@, $, !, %, *, ?, &)"
      );
      return false;
    }

    return true;
  };

  const isConfirmPasswordValid = () => {
    if (!confirmPassword.trim()) {
      setConfirmPasswordErrorMessage("Confirm Password is required.");
      return false;
    }
    if (
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
    const isPhoneNumberOK = isPhoneNumberValid();
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
      isPhoneNumberOK &&
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

    setPostMessage({
      isSuccess: true,
      text: "Sending...",
    });

    try {
      await axiosInstance
        .post("/api/users/register", {
          firstName,
          lastName,
          email,
          phoneNumber,
          password,
        })
        .then((response) => {
          if (response.status === 200) {
            setPostMessage({
              isSuccess: true,
              text: "Registration Success! Navigate to home page...",
            });
            navigate("/login", replace(true));
          } else {
            setPostMessage({
              isSuccess: false,
              text: "Error! " + response.data,
            });
          }
        });
    } catch (err) {
      setPostMessage({
        isSuccess: false,
        text: "Error! " + (err.response ? err.response.data : err.message),
      });
    }
  };

  return (
    <>
      <div className="bg-light-surface-container-highest w-screen h-screen flex ">
        <div className=" bg-light-surface rounded-2xl py-8 mx-auto my-auto w-md">
          <form>
            <h2 className="text-center text-2xl mb-4">Create an account</h2>

            {postMessage.text !== "" &&
              (postMessage.isSuccess === true ? (
                <p className="text-light-success text-center mb-4">
                  {postMessage.text}
                </p>
              ) : (
                <p className="text-light-error text-center mb-4">
                  {postMessage.text}
                </p>
              ))}

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
                  setPostMessage({ text: "" });
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
                  setPostMessage({ text: "" });
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
                setPostMessage({ text: "" });
              }}
            />

            <InputGroup
              title="Phone"
              placeholder="Phone"
              type="tel"
              isRequired={true}
              errorMessage={phoneNumberErrorMessage}
              value={phoneNumber}
              onChange={(event) => {
                setPhoneNumber(event.target.value);
                setPhoneNumberErrorMessage("");
                setPostMessage({ text: "" });
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
                setPostMessage({ text: "" });
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
                setPostMessage({ text: "" });
              }}
            />

            <p className="px-4 py-2">
              By creating an account, you agree to the{" "}
              <a href="#" className="text-light-primary underline">
                Terms of Service
              </a>{" "}
              and have read the{" "}
              <a href="#" className="text-light-primary underline">
                Privacy Policy
              </a>
            </p>

            <div className="w-full flex py-2">
              <button
                type="submit"
                onClick={handleSubmitAsync}
                className=" bg-light-primary text-light-on-primary rounded-2xl text-center m-auto px-6 py-2 cursor-pointer"
              >
                Create Account
              </button>
            </div>

            <p className="px-4 pt-2 text-center">
              Already have an account?{" "}
              <span
                className="text-light-primary underline cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Log in
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
