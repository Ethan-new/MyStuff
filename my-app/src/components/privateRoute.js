import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../config/firebase";

const PrivateRoute = ({ children }) => {
  console.log(auth.currentUser);
  return auth.currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
