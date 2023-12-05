import { auth, db } from "../config/firebase";

import { signOut } from "firebase/auth";

import { Link, useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      Hello
      <button onClick={logout}>Logout</button>
    </div>
  );
};
