import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../config/firebase";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ResponsiveAppBar from "./navbar";
import Stack from "@mui/material/Stack";

import dashboardPic from "../assets/dashboard.png";

const HomePage = () => {
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
            component="img"
            sx={{
              height: 400,
              width: 800,
              borderRadius: "16px",
              boxShadow: 3,
              //maxHeight: { xs: 233, md: 167 },
              //maxWidth: { xs: 350, md: 250 },
            }}
            alt="The house from the offer."
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
            fontSize={32}
            fontWeight={600}
            align="left"
            color={"white"}
          >
            for your inventory
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
              placeholder
            </Box>
            <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
              placeholder
            </Box>
          </Stack>
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
            <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
              placeholder
            </Box>
            <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
              placeholder
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
