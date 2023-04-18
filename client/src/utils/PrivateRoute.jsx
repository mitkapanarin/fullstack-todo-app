import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const PrivateRoute = () => {
  const store = useSelector(z=>z)
  const isLoggedIn = store.User.id;
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
