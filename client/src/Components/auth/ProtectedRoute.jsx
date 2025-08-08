import React from "react";
import { Navigate, Outlet, Route } from "react-router-dom";

const ProtectedRoute = ({ children, user, redirect = "/login" }) => {
  if (user === null || user === undefined) return <Navigate to={redirect} />;
  else return children;
};

export default ProtectedRoute;
