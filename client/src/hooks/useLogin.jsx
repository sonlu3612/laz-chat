import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

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
  const { emailError, passwordError } = error;

  const setEmail = (value) => {
    setField({ ...field, email: value });
    setError({ ...error, email: "" });
  };

  const setPassword = (value) => {
    setField({ ...field, password: value });
    setError({ ...error, password: "" });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email is required.");
      return;
    }
    if (!password) {
      setPasswordError("Password is required.");
      return;
    }

    // NEED TO ADD VALIDATION FOR EMAIL AND PASSWORD

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
        const { token, firstName, lastName } = response.data;

        localStorage.setItem("token", token);
        dispatch(setMyUser({ firstName, lastName }));

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
    email,
    password,
    setEmail,
    setPassword,
    emailError,
    passwordError,
    postMessage,
    handleLogin,
    navigateToRegister,
  };
};

export default useLogin;
