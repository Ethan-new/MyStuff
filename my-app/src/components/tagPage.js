import { auth, db } from "../config/firebase";
import React, { useEffect, useState, useContext, useReducer } from "react";
import { FacebookAuthProvider, signOut } from "firebase/auth";

import ResponsiveAppBar from "./navbar";
import PermanentDrawerLeft from "./sideNavBar";

import { AuthContext } from "./authContext";
import { Link, useNavigate } from "react-router-dom";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import BookmarkBorder from "@mui/icons-material/BookmarkBorder";

export const TagPage = () => {
  const [itemList, setitemList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //DialogBox Info
  const [dialogInfo, setdialogInfo] = useState([]);
  const [openDialog, setopenDialog] = useState(false);
  const [isASave, setisASave] = useState(false);
  const [isADelete, setisADelete] = useState(false);

  //DialogBox Inputs
  const [dialogInfoName, setdialogInfoName] = useState("");

  //Completed Update MSG
  const [updateccompleted, setupdateccompleted] = useState(false);
  const [updateccompletedMSG, setupdateccompletedMSG] = useState("");

  //Current Id Being Edited
  const [curID, setCurID] = useState("");

  //Data Refresh
  const [toggle, setToggle] = useState(false);

  const { authStatus, setAuthStatus } = useContext(AuthContext);

  const tagCollecionRef = collection(
    db,
    "Users",
    authStatus.currentUser.uid,
    "FavTags"
  );

  const getItemList = async () => {
    setIsLoading(true);
    try {
      const data = await getDocs(tagCollecionRef);

      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setitemList(filteredData);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getItemList();
  }, [toggle]);

  const handleEditClick = (id) => () => {
    setCurID(id);
    setisASave(true);
    setisADelete(false);

    for (let i = 0; i < itemList.length; i++) {
      //console.log(itemList[i].name);
      if (itemList[i].id == id) {
        let tempArray = [];
        tempArray.push(id);
        tempArray.push(itemList[i].tag);
        tempArray.push("Edit Item");
        setdialogInfo(tempArray);
        //console.log(dialogInfo);
        i = itemList.length;
      }
    }
    setopenDialog(true);
  };
  const handleEditRequest = async () => {
    try {
      const itemDoc = doc(
        db,
        "Users",
        authStatus.currentUser.uid,
        "FavTags",
        curID
      );

      if (dialogInfoName == "") {
        setdialogInfoName(dialogInfo[1]);
      }

      await updateDoc(itemDoc, {
        tag: dialogInfoName,
        fav: false,
      });

      setupdateccompletedMSG("Update Is Finished");
      setToggle((prevState) => !prevState);

      setupdateccompleted(true);
      setopenDialog(false);
    } catch (e) {
      console.log(e);
    }
  };
  const handleDeleteClick = (id) => () => {
    setCurID(id);
    setisASave(false);
    setisADelete(true);
    for (let i = 0; i < itemList.length; i++) {
      //console.log(itemList[i].name);
      if (itemList[i].id == id) {
        let tempArray = [];
        tempArray.push(id);
        tempArray.push(itemList[i].tag);
        tempArray.push("Delete Item");
        setdialogInfo(tempArray);
        //console.log(dialogInfo);
        i = itemList.length;
      }
    }

    setopenDialog(true);
  };
  const handleDeleteRequest = async () => {
    try {
      const itemDoc = doc(
        db,
        "Users",
        authStatus.currentUser.uid,
        "FavTags",
        curID
      );
      await deleteDoc(itemDoc);
      setupdateccompletedMSG("Item was Deleted");
      setToggle((prevState) => !prevState);
      setupdateccompleted(true);
      setopenDialog(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangeFavStatus = (id, isFav, tag) => async () => {
    console.log("Test");
    let newVal = isFav;

    if (isFav === true) {
      newVal = false;
    } else {
      newVal = true;
    }
    try {
      const itemDoc = doc(
        db,
        "Users",
        authStatus.currentUser.uid,
        "FavTags",
        id
      );

      await updateDoc(itemDoc, {
        tag: tag,
        fav: newVal,
      });

      setupdateccompletedMSG("Update Is Finished");
      setToggle((prevState) => !prevState);
      setupdateccompleted(true);
      //setopenDialog(false);
    } catch (e) {
      console.log(e);
    }
  };

  const columns = [
    { field: "tag", headerName: "Tag Name", width: 130 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",

      getActions: (params) => {
        if (params.row.fav == true) {
          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(params.id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<BookmarkAddedIcon />}
              onClick={handleChangeFavStatus(
                params.id,
                params.row.fav,
                params.row.tag
              )}
              label="ChangeFav"
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(params.id)}
              color="inherit"
            />,
          ];
        } else {
          return [
            <GridActionsCellItem
              onClick={handleEditClick(params.id)}
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<BookmarkAddIcon />}
              label="ChangeFav"
              onClick={handleChangeFavStatus(
                params.id,
                params.row.fav,
                params.row.tag
              )}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
              onClick={handleDeleteClick(params.id)}
              color="inherit"
            />,
          ];
        }
      },
    },
  ];

  const handleClose = () => {
    setopenDialog(false);
  };

  const addItem = async () => {
    setisASave(false);
    setisADelete(false);
    let tempArray = [];
    tempArray.push("");
    tempArray.push("New Tag");
    setdialogInfo(tempArray);
    setopenDialog(true);
  };

  const addItemToDatabase = async () => {
    try {
      await addDoc(tagCollecionRef, {
        tag: dialogInfoName,
        fav: false,
      });
      setupdateccompletedMSG("Item Added To Database");
      setToggle((prevState) => !prevState);
      setopenDialog(false);
      setupdateccompleted(true);
    } catch (e) {
      console.log(e);
    }
  };

  //Dialog Box Button. One for editing, One for adding new item, One for Deleting
  let confirmButton;
  //Including Input Fields On Dialog Boxes
  let boxContent;
  //Each Dialog Box
  if (isASave) {
    confirmButton = <Button onClick={handleEditRequest}>Save</Button>;
    boxContent = (
      <DialogContent>
        <DialogContentText>ItemID: {dialogInfo[0]}</DialogContentText>

        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          margin={2}
        >
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label={dialogInfo[1]}
              variant="outlined"
              placeholder="Name"
              onChange={(e) => setdialogInfoName(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
    );
  } else if (isADelete) {
    confirmButton = (
      <Button variant="outlined" color="error" onClick={handleDeleteRequest}>
        Delete
      </Button>
    );
    boxContent = (
      <DialogContent>
        <Typography variant="h6" gutterBottom>
          Once you delete there will be no way to recover this item
        </Typography>
        <DialogContentText>ItemID: {dialogInfo[0]}</DialogContentText>

        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          margin={2}
        >
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Name: {dialogInfo[1]}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
    );
  } else {
    confirmButton = <Button onClick={addItemToDatabase}>Add Tag</Button>;
    boxContent = (
      <DialogContent>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          margin={2}
        >
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label={dialogInfo[1]}
              variant="outlined"
              placeholder="Name"
              onChange={(e) => setdialogInfoName(e.target.value)}
            />
          </Grid>
        </Grid>
      </DialogContent>
    );
  }

  //Is Loading
  let table;
  if (isLoading) {
    table = (
      <Box sx={{ display: "flex", mx: "auto", width: 200 }}>
        <CircularProgress sx={{ display: "flex", mx: "auto", width: 200 }} />{" "}
      </Box>
    );
  } else {
    table = (
      <DataGrid
        rows={itemList}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 20, 100]}
      />
    );
  }
  return (
    <div className="div-dashboard">
      <PermanentDrawerLeft menuTrigger={toggle}></PermanentDrawerLeft>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            <div style={{ height: 545, width: "100%" }}>{table}</div>
            {updateccompleted && (
              <Alert
                variant="filled"
                sx={{ mt: "8px" }}
                onClose={() => {
                  setupdateccompleted(false);
                }}
                severity="success"
              >
                {updateccompletedMSG}
              </Alert>
            )}
          </Grid>
          <Grid item xs={2}>
            {" "}
            <Button
              variant="contained"
              onClick={addItem}
              style={{ marginRight: 4 }}
            >
              {" "}
              Add Tag
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{dialogInfo[1]}</DialogTitle>
        {boxContent}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {confirmButton}
        </DialogActions>
      </Dialog>
    </div>
  );
};
