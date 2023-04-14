import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// import useFirebase from "../hooks/use-firebase";
import {
  getDatabase,
  ref,
  onValue,
  push,
  get,
  update,
  set,
} from "firebase/database";

import firebaseApp from "../services/firebase";

import { useLocation } from "react-router-dom";

import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import PersonIcon from "@mui/icons-material/Person";
import AddIcon from "@mui/icons-material/Add";
import Badge from "@mui/material/Badge";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import { blue } from "@mui/material/colors";

import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Stack } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import ListAvatar from "./ListAvatar";

function SimpleDialog(props) {
  //   const { onClose, open } = props;
  const onClose = props.onClose;
  const open = props.open;
  const compass = props.compass;
  const users = props.users;
  const roomId = props.roomId;
  // console.log(roomId);

  const [isRename, setIsRename] = useState(false);
  const [isRescore, setIsRescore] = useState(false);
  // const [isRescore, setIsRescore] = useState(false);

  const [newName, setNewName] = useState("");
  const handleChangeUsername = (event) => {
    setNewName(event.target.value);
  };

  const [newScore, setNewScore] = useState(0);
  const handleChangeRoomId = (event) => {
    const onlyInt = event.target.value.replace(/\D/g, "");
    setNewScore(parseInt(Number(onlyInt)));
  };

  const closeAllInput = () => {
    setNewName("");
    setNewScore(0);
    setIsRename(false);
    setIsRescore(false);
  };

  // console.log(newName);
  const handleNameClick = () => {
    // console.log("click name");
    // console.log(users);
    setNewName("");
    setNewScore(0);
    setIsRescore(false);
    setIsRename(true);
  };

  const handleScoreClick = () => {
    setNewName("");
    setNewScore(0);
    setIsRename(false);
    setIsRescore(true);
  };

  const blurNameField = () => {
    setIsRename(false);
  };

  const blurScoreField = () => {
    setIsRescore(false);
  };
  const handleListItemClick = (value) => {
    onClose();
  };

  const DialogOnClose = () => {
    onClose();
  };

  const Rename = () => {
    // console.log("GameFolder/Rooms/" + roomId + "/users/" + compass);
    const database = getDatabase(firebaseApp);
    const postData = {
      username: newName,
    };
    const pathRef = ref(
      database,
      "GameFolder/Rooms/" + roomId + "/users/" + compass
    );

    // get(pathRef)
    //   .then((snapshot) => {
    //     if (snapshot.exists()) {
    //       console.log(snapshot.val());
    //     } else {
    //       console.log("No data available");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });

    update(pathRef, postData)
      .then(() => {
        // Data saved successfully!
        // console.log("succese");
      })
      .catch((error) => {
        // console.log(error);
        // The write failed...
      });
    setIsRename(false);
  };

  const Rescore = () => {
    // console.log("GameFolder/Rooms/" + roomId + "/users/" + compass);
    const database = getDatabase(firebaseApp);
    const postData = {
      score: newScore,
    };
    const pathRef = ref(
      database,
      "GameFolder/Rooms/" + roomId + "/users/" + compass
    );

    update(pathRef, postData)
      .then(() => {
        // Data saved successfully!
        // console.log("succese");
      })
      .catch((error) => {
        // console.log(error);
        // The write failed...
      });
    setIsRescore(false);
  };

  // useEffect(() => {
  //   setNewName(users[compass].username);
  //   setNewScore(users[compass].score);
  // });

  return (
    <Dialog fullWidth={true} onClose={DialogOnClose} open={open}>
      {isRename ? (
        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <Input
            autoFocus={true}
            value={newName}
            onChange={handleChangeUsername}
            // defaultValue={users[compass].username}
            // onBlur={blurNameField}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={Rename}
                >
                  {/* {true ? <VisibilityOff /> : <Visibility />}
                   */}
                  <RestartAltIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      ) : (
        <DialogTitle onClick={handleNameClick}>
          {users[compass].username}
        </DialogTitle>
      )}
      {isRescore ? (
        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <Input
            autoFocus={true}
            value={String(newScore)}
            onChange={handleChangeRoomId}
            // defaultValue={users[compass].score}
            // onBlur={blurScoreField}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={Rescore}
                >
                  {/* {true ? <VisibilityOff /> : <Visibility />}
                   */}
                  <RestartAltIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      ) : (
        <DialogTitle onClick={handleScoreClick}>
          {users[compass].score}
        </DialogTitle>
      )}
      <List sx={{ pt: 0 }}>
        <ListAvatar
          parentCompass={compass}
          roomId={roomId}
          isMe={compass == 0}
          compass={0}
          users={users}
          closeAllInput={closeAllInput}
        ></ListAvatar>
        <ListAvatar
          parentCompass={compass}
          roomId={roomId}
          isMe={compass == 1}
          compass={1}
          users={users}
          closeAllInput={closeAllInput}
        ></ListAvatar>
        <ListAvatar
          parentCompass={compass}
          roomId={roomId}
          isMe={compass == 2}
          compass={2}
          users={users}
          closeAllInput={closeAllInput}
        ></ListAvatar>
        <ListAvatar
          parentCompass={compass}
          roomId={roomId}
          isMe={compass == 3}
          compass={3}
          users={users}
          closeAllInput={closeAllInput}
        ></ListAvatar>

        <ListItem disableGutters>
          <ListItemButton onClick={() => handleListItemClick("addAccount")}>
            <ListItemAvatar>
              <Avatar>{compass}</Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

export default function CustomAvatar(props) {
  const users = props.users;
  const compass = props.compass;

  const roomId = props.roomId;
  //   const compass = props.compass
  const [open, setOpen] = useState(false);
  //   const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack>
      <Button onClick={handleClickOpen}>
        <Badge
          badgeContent={users[compass].score}
          max={1000000}
          color="primary"
        >
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {users[compass].username.substring(0, 2)}
            {/* miyayay */}
          </Avatar>
        </Badge>
      </Button>

      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open simple dialog
      </Button> */}

      <SimpleDialog
        open={open}
        onClose={handleClose}
        compass={compass}
        users={users}
        roomId={roomId}
      />
    </Stack>
  );
}
