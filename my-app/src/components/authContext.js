import React, { createContext, useReducer, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
  const [auth2, setAuth] = useState(null);
  const [authStatus, setAuthStatus] = useReducer(authReducer, "");

  function authReducer(state, action) {
    switch (action.type) {
      case "signin": {
        return action.auth;
      }

      case "changed": {
        return false;
      }
      case "deleted": {
        return false;
      }
      default: {
        throw Error("Unknown action: " + action.type);
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        auth2,
        setAuth,
        authStatus,
        setAuthStatus,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
