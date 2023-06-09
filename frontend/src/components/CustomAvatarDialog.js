import { useState } from "react";
// import { Link } from "react-router-dom";

// import useFirebase from "../hooks/use-firebase";
import { getDatabase, ref, update } from "firebase/database";
import firebaseApp from "../services/firebase";

import List from "@mui/material/List";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Badge from "@mui/material/Badge";

import ListItem from "@mui/material/ListItem";
import Chip from "@mui/material/Chip";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

import ListAvatar from "./ListAvatar";
import { Button } from "@mui/material";
import ReBo from "./ReBo";

export default function CustomAvatarDialog(props) {
  //   const { closeDialog, open } = props;
  const closeDialog = props.closeDialog;
  const isDialogOpen = props.isDialogOpen;
  const AvatarPosition = props.AvatarPosition;
  const users = props.users;
  const roomId = props.roomId;

  const isSanma = props.isSanma;
  // console.log(roomId);

  const [isActiveListAvatar, setIsActiveListAvatar] = useState([
    false,
    false,
    false,
    false,
  ]);

  const activateListAvatar = (AvatarListIndex) => {
    const newActive = [false, false, false, false];
    if (AvatarListIndex != null) {
      newActive[AvatarListIndex] = true;
    }
    setIsActiveListAvatar(newActive);
  };

  const [isRenaming, setIsRenaming] = useState(false);
  const [isRescoring, setIsRescoring] = useState(false);
  // const [isRescoring, setIsRescoring] = useState(false);

  const [newName, setNewName] = useState("");
  const handleChangeUsername = (event) => {
    setNewName(event.target.value);
  };

  const [newScore, setNewScore] = useState(0);
  const handleChangeRoomId = (event) => {
    const text = event.target.value;
    const onlyInt = parseInt(text.replace(/[^\d]/g, ""));
    // const onlyInt = text.includes("-")
    //   ? "-" + toString(parseInt(text.replace(/[^\d]/g, "")))
    //   : toString(parseInt(text.replace(/[^\d]/g, "")));
    setNewScore(onlyInt);
  };

  const closeAllInput = () => {
    setNewName("");
    setNewScore(0);
    setIsRenaming(false);
    setIsRescoring(false);
  };

  // console.log(newName);
  const handleNameClick = () => {
    setNewName("");
    setNewScore(0);
    setIsRescoring(false);
    setIsRenaming(true);
  };

  const handleScoreClick = () => {
    setNewName("");
    setNewScore(0);
    setIsRenaming(false);
    setIsRescoring(true);
  };

  const Rename = () => {
    const database = getDatabase(firebaseApp);
    const postData = {
      username: newName,
    };
    const pathRef = ref(
      database,
      "GameFolder/Rooms/" + roomId + "/users/" + AvatarPosition
    );

    update(pathRef, postData);
    setIsRenaming(false);
  };

  const Rescore = () => {
    const database = getDatabase(firebaseApp);
    const postData = {
      score: parseInt(newScore),
    };
    const pathRef = ref(
      database,
      "GameFolder/Rooms/" + roomId + "/users/" + AvatarPosition
    );

    update(pathRef, postData);
    setIsRescoring(false);
  };

  const reBo = props.reBo;

  const getReBo = () => {
    const database = getDatabase(firebaseApp);
    const pathRef = ref(database, "GameFolder/Rooms/" + roomId);
    const newData = {
      reBo: 0,
    };
    update(pathRef, newData).then(() => {
      const pathRef = ref(
        database,
        "GameFolder/Rooms/" + roomId + "/users/" + AvatarPosition
      );
      const newData = {
        score: users[AvatarPosition].score + reBo,
      };
      update(pathRef, newData);
    });
  };

  return (
    <Dialog fullWidth={true} onClose={closeDialog} open={isDialogOpen}>
      {isRenaming ? (
        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <Input
            // fullWidth
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
          {users[AvatarPosition].username}
        </DialogTitle>
      )}
      {isRescoring ? (
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
        <Stack direction={"row"}>
          <DialogTitle onClick={handleScoreClick}>
            {users[AvatarPosition].score}
          </DialogTitle>
        </Stack>
      )}
      <List sx={{ pt: 0 }}>
        <ListAvatar
          isSanma={isSanma}
          DialogClose={closeDialog}
          isActiveListAvatar={isActiveListAvatar}
          activateListAvatar={activateListAvatar}
          AvatarPosition={AvatarPosition}
          roomId={roomId}
          AvatarListIndex={0}
          users={users}
          closeAllInput={closeAllInput}
        ></ListAvatar>
        <ListAvatar
          isSanma={isSanma}
          DialogClose={closeDialog}
          isActiveListAvatar={isActiveListAvatar}
          activateListAvatar={activateListAvatar}
          AvatarPosition={AvatarPosition}
          roomId={roomId}
          AvatarListIndex={1}
          users={users}
          closeAllInput={closeAllInput}
        ></ListAvatar>
        <ListAvatar
          isSanma={isSanma}
          DialogClose={closeDialog}
          isActiveListAvatar={isActiveListAvatar}
          activateListAvatar={activateListAvatar}
          AvatarPosition={AvatarPosition}
          roomId={roomId}
          AvatarListIndex={2}
          users={users}
          closeAllInput={closeAllInput}
        ></ListAvatar>

        {isSanma === false ? (
          <ListAvatar
            isSanma={isSanma}
            DialogClose={closeDialog}
            isActiveListAvatar={isActiveListAvatar}
            activateListAvatar={activateListAvatar}
            AvatarPosition={AvatarPosition}
            roomId={roomId}
            AvatarListIndex={3}
            users={users}
            closeAllInput={closeAllInput}
          ></ListAvatar>
        ) : (
          <></>
        )}
        <ListItem>
          <Chip
            label="リーチ棒を拾う"
            color="error"
            clickable
            onClick={getReBo}
          />
        </ListItem>
      </List>
    </Dialog>
  );
}
