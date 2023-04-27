import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import { blue, red } from "@mui/material/colors";
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import RonOrTsumoForm from "./RonOrTsumoForm";

export default function ListAvatar(props) {
  const users = props.users;
  const AvatarPosition = props.AvatarPosition;
  const AvatarListIndex = props.AvatarListIndex;
  const closeAllInput = props.closeAllInput;
  const roomId = props.roomId;
  const isActiveListAvatar = props.isActiveListAvatar;
  const activateListAvatar = props.activateListAvatar;
  const isSanma = props.isSanma;

  // const isMe = AvatarListIndex === AvatarPosition;
  // console.log(isMe);

  //   const compass = props.compass
  // const [isActive, setIsActive] = useState(isActiveListAvatar[AvatarListIndex]);
  //   const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClick = () => {
    // setIsActive(true);
    activateListAvatar(AvatarListIndex);
    closeAllInput();
  };

  // const AvatarColor = (isMe) => {
  //   if (isMe) {
  //     return red;
  //   } else {
  //     return blue;
  //   }
  // };

  const AvatarColor = () => {
    const color_list = ["lightBlue", "lightGreen", "orange", "pink"];
    return color_list[AvatarListIndex];
  };

  // const blurListItem = ()=>{
  //   setIsActive(false)
  // }
  return (
    <div>
      {isActiveListAvatar[AvatarListIndex] ? (
        <ListItem disableGutters>
          <ListItemButton>
            <RonOrTsumoForm
              isSanma={isSanma}
              roomId={roomId}
              users={users}
              AvatarPosition={AvatarPosition}
              AvatarListIndex={AvatarListIndex}
              activateListAvatar={activateListAvatar}
            />
          </ListItemButton>
        </ListItem>
      ) : (
        <ListItem disableGutters>
          <ListItemButton onClick={handleClick}>
            <ListItemAvatar>
              <Avatar
                sx={{
                  bgcolor: AvatarColor,
                  color: "black",
                }}
              >
                {users[AvatarListIndex].username.substring(0, 2)}
              </Avatar>
            </ListItemAvatar>
          </ListItemButton>
        </ListItem>
      )}
    </div>
  );
}
