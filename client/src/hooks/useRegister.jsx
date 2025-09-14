import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePhoneNumber,
  validatePassword,
  validateConfirmPassword,
} from "../utils/validation";
import axiosInstance from "../utils/axios";

const useRegister = () => {
  const navigate = useNavigate();

  const [field, setField] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [postMessage, setPostMessage] = useState({
    isSuccess: false,
    text: "",
  });

  const { firstName, lastName, email, phoneNumber, password, confirmPassword } =
    field;

  const {
    firstName: firstNameError,
    lastName: lastNameError,
    email: emailError,
    phoneNumber: phoneNumberError,
    password: passwordError,
    confirmPassword: confirmPasswordError,
  } = error;

  const handleFieldChange = (fieldName, value) => {
    setField((prev) => ({ ...prev, [fieldName]: value }));

    // If there was an error for this field, clear it
    if (error[fieldName]) {
      setError((prev) => ({ ...prev, [fieldName]: "" }));
    }

    setPostMessage({ text: "" });
  };

  const validateField = () => {
    const firstNameErr = validateFirstName(firstName);
    const lastNameErr = validateLastName(lastName);
    const emailErr = validateEmail(email);
    const phoneNumberErr = validatePhoneNumber(phoneNumber);
    const passwordErr = validatePassword(password);
    const confirmPasswordErr = validateConfirmPassword(
      password,
      passwordErr,
      confirmPassword
    );

    const isValid =
      firstNameErr == "" &&
      lastNameErr == "" &&
      emailErr == "" &&
      phoneNumberErr == "" &&
      passwordErr == "" &&
      confirmPasswordErr == "";

    if (firstNameErr != "") {
      handleFieldChange("firstName", "");
    }

    if (lastNameErr != "") {
      handleFieldChange("lastName", "");
    }

    if (emailErr != "") {
      handleFieldChange("email", "");
    }

    if (phoneNumberErr != "") {
      handleFieldChange("phoneNumber", "");
    }

    if (passwordErr != "") {
      handleFieldChange("password", "");
      handleFieldChange("confirmPassword", "");
    }

    if (confirmPasswordErr != "") {
      handleFieldChange("confirmPassword", "");
      handleFieldChange("password", "");
    }

    if (!isValid) {
      setError({
        firstName: firstNameErr,
        lastName: lastNameErr,
        email: emailErr,
        phoneNumber: phoneNumberErr,
        password: passwordErr,
        confirmPassword: confirmPasswordErr,
      });
    }

    return isValid;
  };

  const handleSubmitAsync = async (e) => {
    e.preventDefault();

    const isValid = validateField();

    if (!isValid) {
      return;
    }

    setPostMessage({
      isSuccess: true,
      text: "Sending...",
    });

    try {
      await axiosInstance
        .post("/api/Auth/register", {
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

  const navigateToLogin = () => {
    navigate("/login");
  };

  return {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    confirmPassword,
    firstNameError,
    lastNameError,
    emailError,
    phoneNumberError,
    passwordError,
    confirmPasswordError,
    postMessage,
    handleFieldChange,
    handleSubmitAsync,
    navigateToLogin,
  };
};

export default useRegister;
