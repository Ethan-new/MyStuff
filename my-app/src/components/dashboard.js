import { auth, db } from "../config/firebase";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";

import { Link, useNavigate } from "react-router-dom";
import { getDocs, collection, addDoc } from "firebase/firestore";

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

import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [itemList, setitemList] = useState([]);
  const [dialogInfo, setdialogInfo] = useState([]);
  const [openDialog, setopenDialog] = useState(false);
  const [isASave, setisASave] = useState(false);

  //DialogBox Inputs
  const [dialogInfoName, setdialogInfoName] = useState("");
  const [dialogInfoQuantity, setdialogInfoQuantity] = useState("");
  const [dialogInfoTag, setdialogInfoTag] = useState("");
  const [dialogInfoNote, setdialogInfoNote] = useState("");

  //Completed Update MSG
  const [updateccompleted, setupdateccompleted] = useState(false);

  const itemsCollecionRef = collection(
    db,
    "Users",
    auth.currentUser.uid,
    "Items"
  );

  useEffect(() => {
    const getItemList = async () => {
      try {
        const data = await getDocs(itemsCollecionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        //console.log(filteredData);
        setitemList(filteredData);
      } catch (e) {
        console.log(e);
      }
    };

    getItemList();
  }, []);

  const handleEditClick = (id) => () => {
    setisASave(true);
    console.log(id);
    for (let i = 0; i < itemList.length; i++) {
      //console.log(itemList[i].name);
      if (itemList[i].id == id) {
        let tempArray = [];
        tempArray.push(id);
        tempArray.push(itemList[i].Name);
        tempArray.push(itemList[i].Quantity);
        tempArray.push(itemList[i].Tag);
        tempArray.push(itemList[i].Note);
        tempArray.push("Edit Item");
        setdialogInfo(tempArray);
        //console.log(dialogInfo);
        i = itemList.length;
      }
    }

    setopenDialog(true);
  };

  const handleDeleteClick = (id) => () => {};

  const columns = [
    { field: "Name", headerName: "Name", width: 130 },
    { field: "Quantity", headerName: "Quantity", width: 130 },
    { field: "Tag", headerName: "Tag", width: 130 },

    {
      field: "Note",
      headerName: "Note",
      width: 250,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",

      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const handleClose = () => {
    setopenDialog(false);
  };

  const addItem = async () => {
    setisASave(false);
    let tempArray = [];
    tempArray.push("");
    tempArray.push("Name");
    tempArray.push("Quantity");
    tempArray.push("Tag");
    tempArray.push("Note");
    tempArray.push("Add Item");
    setdialogInfo(tempArray);
    setopenDialog(true);
  };
  const addItemToDatabase = async () => {
    try {
      await addDoc(itemsCollecionRef, {
        Name: dialogInfoName,
        Description: "",
        Tag: dialogInfoTag,
        Quantity: dialogInfoQuantity,
        Note: dialogInfoNote,
      });
      setopenDialog(false);
      setupdateccompleted(true);
    } catch (e) {
      console.log(e);
    }
  };
  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/login", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };
  //Dialog Box Button. One for editing, One for adding new item
  let confirmButton;
  if (isASave) {
    confirmButton = <Button onClick={handleClose}>Save</Button>;
  } else {
    confirmButton = <Button onClick={addItemToDatabase}>Add Item</Button>;
  }
  return (
    <div>
      Hello
      <Button onClick={logout}>Logout</Button>
      <Button onClick={addItem}> ADD TETET</Button>
      <Box sx={{ width: "100%" }}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={2}></Grid>
          <Grid item xs={8}>
            {updateccompleted && (
              <Alert severity="success">
                Item successfully updated in the database
              </Alert>
            )}
            <div></div>
            <div style={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={itemList}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
              />
            </div>
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </Box>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>{dialogInfo[5]}</DialogTitle>
        <DialogContent>
          <DialogContentText>ItemID: {dialogInfo[0]}</DialogContentText>

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            margin={2}
          >
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label={dialogInfo[1]}
                variant="outlined"
                placeholder="Name"
                onChange={(e) => setdialogInfoName(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label={dialogInfo[2]}
                variant="outlined"
                placeholder="Quantity"
                onChange={(e) => setdialogInfoQuantity(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label={dialogInfo[3]}
                variant="outlined"
                placeholder="Tag"
                onChange={(e) => setdialogInfoTag(e.target.value)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="outlined-basic"
                label={dialogInfo[4]}
                variant="outlined"
                placeholder="Note"
                onChange={(e) => setdialogInfoNote(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {confirmButton}
        </DialogActions>
      </Dialog>
    </div>
  );
};
