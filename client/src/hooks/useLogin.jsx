import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { validateEmail, validatePassword } from "../utils/validation";
import axiosInstance from "../utils/axios";
import { setMyUser } from "../redux/reducers/auth";

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [field, setField] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const [postMessage, setPostMessage] = useState({
    isSuccess: false,
    text: "",
  });

  const { email, password } = field;
  const { email: emailError, password: passwordError } = error;

  const handleFieldChange = (fieldName, value) => {
    setField((prev) => ({ ...prev, [fieldName]: value }));

    // If there was an error for this field, clear it
    if (error[fieldName]) {
      setError((prev) => ({ ...prev, [fieldName]: "" }));
    }

    setPostMessage((prev) => (prev.text !== "" ? { text: "" } : prev));
  };

  const validateField = () => {
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    const isValid = emailErr == "" && passwordErr == "";

    // TODO: remove this later
    if (emailErr != "") {
      handleFieldChange("email", "");
    }

    if (passwordErr != "") {
      handleFieldChange("password", "");
    }

    if (!isValid) {
      setError({
        email: emailErr,
        password: passwordErr,
      });
    }

    return isValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const isValid = validateField();

    if (!isValid) {
      return;
    }

    try {
      setPostMessage({
        isSuccess: true,
        text: "Sending...",
      });

      const response = await axiosInstance.post("/api/Auth/Login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, firstName, lastName, email, phoneNumber } =
          response.data;

        localStorage.setItem("token", token);
        dispatch(setMyUser({ firstName, lastName, email, phoneNumber }));

        navigate("/auth");
      }
    } catch (err) {
      setPostMessage({
        isSuccess: false,
        text: "Error! " + (err.response ? err.response.data : err.message),
      });
    }
  };

  const navigateToRegister = () => {
    navigate("/register");
  };

  return {
    // Field
    email,
    password,

    // Error
    emailError,
    passwordError,

    //Message
    postMessage,

    // Handle
    handleFieldChange,
    handleLogin,
    navigateToRegister,
  };
};

export default useLogin;
