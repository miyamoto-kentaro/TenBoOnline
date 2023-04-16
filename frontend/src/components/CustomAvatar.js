import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";

import { IconButton, Stack } from "@mui/material";
import CustomAvatarDialog from "./CustomAvatarDialog";

export default function CustomAvatar(props) {
  const users = props.users;
  const roomId = props.roomId;
  const AvatarPosition = props.AvatarPosition;
  const activateListAvatar = props.activateListAvatar;

  const [isDialogOpen, setisDialogOpen] = useState(false);

  const AvatarColor = () => {
    const color_list = ["lightBlue", "lightGreen", "orange", "pink"];
    return color_list[AvatarPosition];
  };
  const handleAvatarClick = () => {
    setisDialogOpen(true);
  };

  const closeDialog = () => {
    setisDialogOpen(false);
  };
  // const handleDialogClose = () => {
  //   setisDialogOpen(false);
  // };

  return (
    <Stack>
      <IconButton onClick={handleAvatarClick}>
        <Badge
          badgeContent={users[AvatarPosition].score}
          max={1000000}
          color="primary"
        >
          <Avatar
            sx={{
              height: "70px",
              width: "70px",
              bgcolor: AvatarColor(),
              color: "black",
            }}
          >
            {users[AvatarPosition].username.substring(0, 2)}
            {/* miyayay */}
          </Avatar>
        </Badge>
      </IconButton>

      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open simple dialog
      </Button> */}

      <CustomAvatarDialog
        isDialogOpen={isDialogOpen}
        closeDialog={closeDialog}
        AvatarPosition={AvatarPosition}
        users={users}
        roomId={roomId}
      />
    </Stack>
  );
}
