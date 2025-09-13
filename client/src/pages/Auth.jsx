import { useEffect, useState } from "react";
import axiosInstance from "../utils/axios";

const Auth = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchAuth();
  }, []);

  const fetchAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axiosInstance.get("/api/Test/secure", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { message, claims } = data;
      setMessage(`${message}\n${claims[1].value}`);
    } catch (err) {
      const data = err.response ? err.response.data : err.message;
      setMessage(data);
    }
  };

  return message;
};

export default Auth;
