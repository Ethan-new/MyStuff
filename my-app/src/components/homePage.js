import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../config/firebase";

const HomePage = () => {
  return <Navigate to="/login" />;
};

export default HomePage;
