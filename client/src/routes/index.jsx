import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import ProtectedRoute from "../Components/auth/ProtectedRoute";

const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/Loginpage"));
const Register = React.lazy(() => import("../pages/Register"));
const Message = React.lazy(() => import("../pages/Message"));

export default function AppRoutes() {
  const { user } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={
          <ProtectedRoute user={!user} redirect="/">
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <ProtectedRoute user={!user} redirect="/">
            <Register />
          </ProtectedRoute>
        }
      />
      <Route path="/message">
        <Route index element={<Message />} />
        <Route path=":id" element={<Message />} />
      </Route>
    </Routes>
  );
}
