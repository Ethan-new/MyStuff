import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../config/firebase";

import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ResponsiveAppBar from "./navbar";

const HomePage = () => {
  return (
    <div>
      <ResponsiveAppBar></ResponsiveAppBar>
      <Grid container spacing={2}>
        <Grid item xs={2}></Grid>
        <Grid item xs={8} sx={{ mx: "auto" }}>
          <Typography variant="h1" gutterBottom>
            Welcome To My Stuff
          </Typography>
          <Typography variant="body1" gutterBottom>
            Welcome to My Stuff - Your Personal Inventory Management Solution!
            At My Stuff, we understand that keeping track of your belongings can
            be a challenging task. Whether you're managing your home inventory,
            organizing your wardrobe, or tracking your collectibles, we're here
            to simplify the process for you. Say goodbye to clutter and
            confusion and hello to a more organized life!
          </Typography>

          <Typography variant="h4" gutterBottom>
            Why Choose My Stuff?
          </Typography>
          <Typography variant="body1" gutterBottom>
            📦 Effortless Organization: My Stuff makes it easy to catalog and
            categorize all your possessions. With our user-friendly interface,
            you'll have everything neatly organized in no time.
          </Typography>
          <Typography variant="body1" gutterBottom>
            🔍 Quick Search: Can't find that one item you're looking for? Our
            powerful search feature will help you locate your belongings in
            seconds.
          </Typography>
          <Typography variant="body1" gutterBottom>
            🔐 Privacy and Security: Your data's safety is our top priority. We
            use state-of-the-art security measures to protect your information.
          </Typography>
          <Typography variant="body1" gutterBottom>
            🌐 Cloud Storage: Store your data securely in the cloud, ensuring
            you never lose your inventory, even if your device is lost or
            damaged.
          </Typography>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </div>
  );

  //return <Navigate to="/login" />;
};

export default HomePage;
