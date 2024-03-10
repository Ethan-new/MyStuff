import { useState } from "react";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { Link, useNavigate } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Alert } from "@mui/material";
import Typography from "@mui/material/Typography";

import { useContext } from "react";
import { AuthContext } from "./authContext";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState(false);
  const [errorMSG, seterrorMSG] = useState("");
  const navigate = useNavigate();

  const { auth2, setAuth } = useContext(AuthContext);
  const { authStatus, setAuthStatus } = useContext(AuthContext);

  //console.log(auth?.currentUser);

  const createAccount = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.log(err);
    }
  };
  const signIn = async () => {
    if (auth?.currentUser?.email) {
      setAuthStatus({
        type: "signin",
        auth: auth,
      });
      navigate("/dashboard/", { replace: true });
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setAuthStatus({
          type: "signin",
          auth: auth,
        });
      } catch (err) {
        seterror(true);
        console.log(err.code);
        if (err.code === "auth/invalid-credential") {
          seterrorMSG("Error: " + "No Account with theses credentials");
        } else if (err.code === "auth/invalid-email") {
          seterrorMSG("Error: " + "Email must be vaild");
        } else {
          seterrorMSG("Error: " + err);
        }

        console.log(err);
      }
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Grid container spacing={2} marginY={20}>
        <Grid item xs={2}></Grid>
        <Grid container justifyContent="center" alignItems="center" item xs={8}>
          <Typography color="text.primary" variant="h3" gutterBottom>
            My Stuff
          </Typography>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={2}></Grid>
        <Grid container justifyContent="center" alignItems="center" item xs={8}>
          <Card>
            <CardContent>
              <Typography color="text.primary" gutterBottom>
                Login
              </Typography>
            </CardContent>

            <CardContent>
              <TextField
                id="outlined-basic1"
                label="Email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
              />
            </CardContent>
            <CardContent sx={{ mb: 0, pb: 0 }}>
              <TextField
                id="outlined-basic2"
                label="Password"
                type="password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
              />
            </CardContent>

            <CardActions sx={{ pt: 0 }}>
              {" "}
              <Button
                sx={{ fontSize: "10px" }}
                onClick={() => {
                  navigate("/forgotpassword", { replace: true });
                }}
              >
                Forgot Password
              </Button>
            </CardActions>
            <CardActions sx={{ justifyContent: "space-between" }}>
              <Button
                onClick={() => navigate("/newaccount", { replace: true })}
              >
                Create Account
              </Button>
              <Button variant="contained" onClick={signIn}>
                Sign In
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item xs={2}></Grid>
        <Grid item xs={2}></Grid>
        <Grid container justifyContent="center" alignItems="center" item xs={8}>
          {error && (
            <Alert
              variant="filled"
              sx={{ mt: "8px" }}
              onClose={() => {
                seterror(false);
              }}
              severity="error"
            >
              {errorMSG}
            </Alert>
          )}
        </Grid>

        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
};
