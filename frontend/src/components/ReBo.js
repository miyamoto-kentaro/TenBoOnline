import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

import { getDatabase, ref, onValue, set, update } from "firebase/database";
import firebaseApp from "../services/firebase";

import Dialog from "@mui/material/Dialog";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";

export default function ReBo(props) {
  const reBo = props.reBo;
  const users = props.users;
  const roomId = props.roomId;
  const isSanma = props.isSanma;

  const [isDialogOpen, setisDialogOpen] = useState(false);

  const handleReBoClick = () => {
    setisDialogOpen(true);
  };

  const closeDialog = () => {
    setisDialogOpen(false);
  };
  //   const [reBo, setReBo] = useState(0);

  const handleClick = (ListAvatarIndex) => {
    const database = getDatabase(firebaseApp);
    const pathRef = ref(database, "GameFolder/Rooms/" + roomId);
    const newData = {
      reBo: reBo + 1000,
    };
    update(pathRef, newData).then(() => {
      const pathRef = ref(
        database,
        "GameFolder/Rooms/" + roomId + "/users/" + ListAvatarIndex
      );
      const newData = {
        score: users[ListAvatarIndex].score - 1000,
      };
      update(pathRef, newData);
    });
  };

  const AvatarColor = (AvatarPosition) => {
    const color_list = ["lightBlue", "lightGreen", "orange", "pink"];
    return color_list[AvatarPosition];
  };
  return (
    <>
      <Chip
        color="error"
        label={"リーチ棒:" + reBo}
        onClick={handleReBoClick}
        clickable
      />

      <Dialog fullWidth={true} onClose={closeDialog} open={isDialogOpen}>
        <List sx={{ pt: 0 }}>
          <ListItem disableGutters>
            <ListItemButton
              onClick={() => {
                handleClick(0);
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: AvatarColor(0),
                    color: "black",
                  }}
                >
                  {users[0].username.substring(0, 2)}
                </Avatar>
              </ListItemAvatar>
            </ListItemButton>
          </ListItem>
          <ListItem disableGutters>
            <ListItemButton
              onClick={() => {
                handleClick(1);
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: AvatarColor(1),
                    color: "black",
                  }}
                >
                  {users[1].username.substring(0, 2)}
                </Avatar>
              </ListItemAvatar>
            </ListItemButton>
          </ListItem>
          <ListItem disableGutters>
            <ListItemButton
              onClick={() => {
                handleClick(2);
              }}
            >
              <ListItemAvatar>
                <Avatar
                  sx={{
                    bgcolor: AvatarColor(2),
                    color: "black",
                  }}
                >
                  {users[2].username.substring(0, 2)}
                </Avatar>
              </ListItemAvatar>
            </ListItemButton>
          </ListItem>
          {isSanma === false ? (
            <ListItem disableGutters>
              <ListItemButton
                onClick={() => {
                  handleClick(3);
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: AvatarColor(3),
                      color: "black",
                    }}
                  >
                    {users[3].username.substring(0, 2)}
                  </Avatar>
                </ListItemAvatar>
              </ListItemButton>
            </ListItem>
          ) : (
            <></>
          )}
        </List>
      </Dialog>
    </>
  );
}
