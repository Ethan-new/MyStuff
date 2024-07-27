import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { useContext } from "react";
import { AuthContext } from "./authContext";

import { useState } from "react";

import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ResponsiveAppBar from "./navbar";
import Stack from "@mui/material/Stack";

import { Link, useNavigate } from "react-router-dom";

import dashboardPic from "../assets/dashboard.png";
import tagPic from "../assets/tags.png";
import searchPic from "../assets/search.png";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const HomePage = () => {
  const navigate = useNavigate();
  const [errorMSG, seterrorMSG] = useState("");
  const [error, seterror] = useState(false);

  const { auth2, setAuth } = useContext(AuthContext);
  const { authStatus, setAuthStatus } = useContext(AuthContext);

  async function goToSignUpPage() {
    try {
      await signInWithEmailAndPassword(auth, "abc@gmail.com", "123123");
      setAuthStatus({
        type: "signin",
        auth: auth,
      });
      navigate("/dashboard/", { replace: true });
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

  //navigate("/newaccount", { replace: true });

  return (
    <div className="homepage_gradient_background">
      <ResponsiveAppBar></ResponsiveAppBar>
      <Grid
        container
        spacing={2}
        direction="column"
        alignItems="center"
        justifyContent="center"
        paddingBottom={25}
      >
        <Grid item xs={1}></Grid>
        <Grid item xs={10} sx={{ mx: "auto", mt: "10em" }}>
          <Typography
            variant="h2"
            align="center"
            fontWeight={"bolder"}
            color={"#302d2d"}
          >
            Open-Source IMS
          </Typography>
          <Typography
            variant="subtitle1"
            fontSize={32}
            fontWeight={"700"}
            align="center"
            color={"white"}
            gutterBottom
          >
            Modern, Powerful, Affordable
          </Typography>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginBottom="20px"
          >
            <Button
              onClick={goToSignUpPage}
              color="success"
              variant="contained"
            >
              Demo Now!
            </Button>
          </Box>

          <Box
            component="img"
            sx={{
              height: 400,
              width: 800,
              borderRadius: "16px",
              boxShadow: 3,
              //maxHeight: { xs: 233, md: 167 },
              //maxWidth: { xs: 350, md: 250 },
            }}
            alt="Pic of Dashboard"
            src={dashboardPic}
          />

          <Typography
            variant="subtitle1"
            fontSize={42}
            fontWeight={600}
            align="left"
            color={"#16bde9"}
            lineHeight={1}
          >
            Powerful Management System
          </Typography>

          <Typography
            variant="subtitle1"
            fontSize={42}
            fontWeight={600}
            align="left"
            color={"white"}
          >
            Features
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Box>
              <Box
                component="img"
                sx={{
                  height: 300,
                  width: 200,
                  borderRadius: "16px",
                  boxShadow: 3,
                  //maxHeight: { xs: 233, md: 167 },
                  //maxWidth: { xs: 350, md: 250 },
                }}
                alt="Pic of Dashboard"
                src={tagPic}
              />
              <Typography
                variant="subtitle1"
                fontSize={26}
                fontWeight={600}
                align="left"
                color={"white"}
              >
                Item Tagging
              </Typography>
            </Box>
            <Box>
              <Box
                component="img"
                sx={{
                  height: 300,
                  width: 500,
                  borderRadius: "16px",
                  boxShadow: 3,
                  //maxHeight: { xs: 233, md: 167 },
                  //maxWidth: { xs: 350, md: 250 },
                }}
                alt="Pic of Dashboard"
                src={searchPic}
              />
              <Typography
                variant="subtitle1"
                fontSize={26}
                fontWeight={600}
                align="left"
                color={"white"}
              >
                Advanced Search
              </Typography>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
    </div>
  );

  //return <Navigate to="/login" />;
};

export default HomePage;
