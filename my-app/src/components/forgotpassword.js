import { useState } from "react";
import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
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
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const [error, seterror] = useState(false);
  const [success, setsuccess] = useState(false);

  const [errorMSG, seterrorMSG] = useState("");
  const navigate = useNavigate();

  //console.log(auth?.currentUser);

  const resetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setsuccess(true);
    } catch (err) {
      console.log(err.code);
      seterror(true);

      if (err.code === "auth/email-already-in-use") {
        seterrorMSG("Error: " + "Email already in use");
      } else if (err.code === "auth/weak-password") {
        seterrorMSG("Error: " + "Password should be at least 6 characters");
      } else if (err.code === "auth/invalid-email") {
        seterrorMSG("Error: " + "Email must be vaild");
      } else if (err.code == "auth/missing-email") {
        seterrorMSG("Error: " + "Please enter an email");
      } else {
        seterrorMSG("Error: " + err);
      }
    }
  };

  return (
    <div>
      <Grid container spacing={2} marginY={20}>
        <Grid item xs={2}></Grid>
        <Grid container justifyContent="center" alignItems="center" item xs={8}>
          <Card>
            <CardContent>
              <Typography color="text.primary" gutterBottom>
                Reset Password
              </Typography>
            </CardContent>
            <CardContent>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
              />
            </CardContent>

            <CardActions sx={{ justifyContent: "space-between" }}>
              <Button onClick={() => navigate("/login", { replace: true })}>
                Login
              </Button>
              <Button variant="contained" onClick={resetPassword}>
                Reset
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={2}></Grid>

        <Grid container justifyContent="center" alignItems="center" item xs={8}>
          <Stack>
            {success && (
              <Alert
                variant="filled"
                sx={{ mt: "8px" }}
                onClose={() => {
                  setsuccess(false);
                }}
                severity="success"
              >
                Password reset link has been sent to your email
              </Alert>
            )}
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
          </Stack>
        </Grid>

        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );
};
