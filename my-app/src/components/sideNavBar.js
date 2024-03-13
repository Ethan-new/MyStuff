import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import ListSubheader from "@mui/material/ListSubheader";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import SettingsIcon from "@mui/icons-material/Settings";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { auth, db } from "../config/firebase";
import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const drawerWidth = 240;

export default function PermanentDrawerLeft({ menuTrigger }) {
  const navigate = useNavigate();
  const [itemList, setitemList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const itemsCollecionRef = collection(
    db,
    "Users",
    auth.currentUser.uid,
    "FavTags"
  );

  useEffect(() => {
    const getItemList = async () => {
      setIsLoading(true);
      try {
        const data = await getDocs(itemsCollecionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        //console.log(filteredData);
        setitemList(filteredData);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };

    getItemList();
  }, [menuTrigger]);

  function getTagName(name) {
    let tempName = "/dashboard/" + name;
    //navigate(tempName);
    return tempName;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />

        <List
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Home
            </ListSubheader>
          }
        >
          <ListItem key="Settings" disablePadding>
            <ListItemButton disabled>
              <ListItemIcon>
                <SettingsIcon></SettingsIcon>
              </ListItemIcon>
              <ListItemText primary={"Settings (coming soon)"} />
            </ListItemButton>
          </ListItem>
          <ListItem key="All My Itemsli" disablePadding>
            <ListItemButton
              onClick={(e) => navigate("/dashboard", { replace: true })}
            >
              <ListItemIcon>
                <AllInclusiveIcon></AllInclusiveIcon>
              </ListItemIcon>
              <ListItemText primary={"All Items"} />
            </ListItemButton>
          </ListItem>
          <ListItem key="Tagsli" disablePadding>
            <ListItemButton
              onClick={(e) => navigate("/tags", { replace: true })}
            >
              <ListItemIcon>
                <BookmarkIcon></BookmarkIcon>
              </ListItemIcon>
              <ListItemText primary={"Tags"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Favorite Tags
            </ListSubheader>
          }
        >
          {itemList.map((text, index) => (
            <ListItem key={text.tag} disablePadding>
              <ListItemButton
                onClick={(e) =>
                  navigate("/dashboard/" + text.tag, { replace: true })
                }
              >
                <ListItemText primary={text.tag} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}
