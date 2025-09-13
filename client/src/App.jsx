import React, { useEffect, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { verifyToken } from "./redux/reducers/auth";

import ProtectedRoute from "./Components/auth/ProtectedRoute";

const Home = React.lazy(() => import("./pages/Home"));
const Login = React.lazy(() => import("./pages/Loginpage"));
const Register = React.lazy(() => import("./pages/Register"));
const Chat = React.lazy(() => import("./pages/Chat"));
const Auth = React.lazy(() => import("./pages/Auth"));

function App() {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <ProtectedRoute user={!user} redirect="/chat">
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <ProtectedRoute user={!user} redirect="/chat">
            <Register />
          </ProtectedRoute>
        }
      />
      <Route path="/chat">
        <Route index element={<Chat />} />
        <Route path=":id" element={<Chat />} />
      </Route>
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}

export default App;
