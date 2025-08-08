import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import ProtectedRoute from "../Components/auth/ProtectedRoute";

const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/Loginpage"));
const Register = React.lazy(() => import("../pages/Register"));

export default function AppRoutes() {
  const [user, setUser] = useState(null);

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
    </Routes>
  );
}
