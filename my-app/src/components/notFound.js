import React from "react";

import { useContext } from "react";

import { AuthContext } from "./authContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const { authStatus, setAuthStatus } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleTakeMeHome = () => {
    navigate("/", { replace: true });
  };

  if (authStatus.currentUser != null) {
    return (
      <div>
        <h1>404 - Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Button variant="contained" onClick={handleTakeMeHome}>
          Take Me Home
        </Button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>404 - Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <Button variant="contained" onClick={handleTakeMeHome}>
          Take Me Home
        </Button>
      </div>
    );
  }
};

export default NotFound;
