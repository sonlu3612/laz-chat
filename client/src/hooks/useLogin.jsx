import { useState, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { validateEmail, validatePassword } from "../utils/validation";
import axiosInstance from "../utils/axios";
import { setMyUser } from "../redux/reducers/auth";

const useLogin = (deps = {}) => {
  // Deps
  const dispatch = deps.dispatch ?? useDispatch();
  const navigate = deps.navigate ?? useNavigate();
  const axios = deps.axios ?? axiosInstance;

  // To avoid setting state on unmounted component
  const mountedRef = useRef(true);
  useEffect(() => () => (mountedRef.current = false), []);

  // State
  const [field, setField] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [postMessage, setPostMessage] = useState({
    isSuccess: false,
    text: "",
  });

  // Handlers
  const handleFieldChange = useCallback(
    (fieldName, value) => {
      setField((prev) => ({ ...prev, [fieldName]: value }));

      // If there was an error for this field, clear it
      if (error[fieldName]) {
        setError((prev) => ({ ...prev, [fieldName]: "" }));
      }

      if (postMessage.text) setPostMessage({ isSuccess: false, text: "" });
    },
    [error, postMessage.text]
  );

  const validateField = useCallback(() => {
    const emailErr = validateEmail(field.email);
    const passwordErr = validatePassword(field.password);

    const isValid = emailErr === "" && passwordErr === "";

    if (!isValid) {
      setError({
        email: emailErr,
        password: passwordErr,
      });
    }

    return isValid;
  }, [field.email, field.password]);

  const handleLogin = useCallback(
    async (e) => {
      e?.preventDefault();
      if (!validateField()) return;

      setIsLoading(true);
      setPostMessage({ isSuccess: false, text: "Sending..." });

      const controller = new AbortController();
      try {
        const response = await axios.post(
          "/api/Auth/Login",
          {
            email: field.email,
            password: field.password,
          },
          { signal: controller.signal }
        );

        if (!mountedRef.current) return;

        if (response.status === 200) {
          const { token, firstName, lastName, email, phoneNumber } =
            response.data;

          localStorage.setItem("token", token);
          dispatch(setMyUser({ firstName, lastName, email, phoneNumber }));
          setPostMessage({ isSuccess: true, text: "Logged in" });
          navigate("/auth");
        } else {
          setPostMessage({ isSuccess: false, text: "Unexpected response" });
        }
      } catch (err) {
        if (err.name === "CanceledError" || err.name === "AbortError") return;
        if (!mountedRef.current) return;
        setPostMessage({
          isSuccess: false,
          text: "Error! " + (err.response?.data || err.message),
        });
      } finally {
        if (mountedRef.current) setIsLoading(false);
      }

      return () => controller.abort();
    },
    [field.email, field.password, validateField, axios, dispatch, navigate]
  );

  const navigateToRegister = useCallback(
    () => navigate("/register"),
    [navigate]
  );

  return {
    // Field
    ...field,

    // Error
    emailError: error.email,
    passwordError: error.password,

    // Message & status
    postMessage,
    isLoading,

    // Handlers
    handleFieldChange,
    handleLogin,
    navigateToRegister,
  };
};

export default useLogin;
