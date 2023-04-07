import React, { Children, Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to={"/account"} replace />;
  }
  if (isAdmin && user.role !== "admin") {
    return <Navigate to="/account" replace />;
  }

  return children;
};

export default ProtectedRoute;
