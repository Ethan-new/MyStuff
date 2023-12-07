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

export const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //console.log(auth?.currentUser);

  const createAccount = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/login", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };
  const signIn = async () => {
    if (auth?.currentUser?.email) {
      navigate("/dashboard", { replace: true });
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
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
          <Card>
            <CardContent>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
              />
            </CardContent>
            <CardContent>
              <TextField
                id="outlined-basic"
                label="Password"
                type="password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
              />
            </CardContent>
            <CardContent>
              <TextField
                id="outlined-basic"
                label="Confrim Password"
                type="password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
              />
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between" }}>
              <Button onClick={() => navigate("/login", { replace: true })}>
                Login
              </Button>
              <Button variant="contained" onClick={createAccount}>
                Create Account
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
};
