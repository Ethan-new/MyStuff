import logo from "./logo.svg";
import "./App.css";
import { Auth } from "./components/auth";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "./components/dashboard";
import HomePage from "./components/homePage";
import PrivateRoute from "./components/privateRoute";
import { CreateAccount } from "./components/createAccount";
import { ForgotPassword } from "./components/forgotpassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/login" element={<Auth />} />
        <Route exact path="/newaccount" element={<CreateAccount />} />
        <Route exact path="/forgotpassword" element={<ForgotPassword />} />
        <Route
          exact
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
