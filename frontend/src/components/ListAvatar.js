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
import InputLabel from "@mui/material/InputLabel";
import { blue, red } from "@mui/material/colors";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Stack } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function RonOrTsumoForm(props) {
  const isMe = props.isMe;
  const users = props.users;
  const compass = props.compass;
  const roomId = props.roomId;
  const parentCompass = props.parentCompass;
  // const onBlurAction = props.onBlurAction;
  const setIsActive = props.setIsActive;

  const [RonScore, setRonScore] = useState(0);
  const handleChangeRonScore = (event) => {
    const onlyInt = event.target.value.replace(/\D/g, "");
    setRonScore(parseInt(Number(onlyInt)));
  };

  const [ThumoScoreFromDealer, setThumoScoreFromDealer] = useState(0);
  const handleChangeThumoScoreFromDealer = (event) => {
    const onlyInt = event.target.value.replace(/\D/g, "");
    setThumoScoreFromDealer(parseInt(Number(onlyInt)));
  };

  const [ThumoScore, setThumoScore] = useState(0);
  const handleChangeThumoScore = (event) => {
    const onlyInt = event.target.value.replace(/\D/g, "");
    setThumoScore(parseInt(Number(onlyInt)));
  };

  const [DealerThumoScore, setDealerThumoScore] = useState(0);
  const handleChangeDealerThumoScore = (event) => {
    const onlyInt = event.target.value.replace(/\D/g, "");
    setDealerThumoScore(parseInt(Number(onlyInt)));
  };

  // const [ThumoScore, setThumoScore] = useState()
  const [SelectDealer, setSelectDealer] = useState(compass);
  const handleChangeDealer = (event) => {
    setSelectDealer(event.target.value);
  };
  const AvatarColor = (isMe) => {
    if (isMe) {
      return red;
    } else {
      return blue;
    }
  };
  const toRon = () => {
    const database = getDatabase(firebaseApp);
    const winnerPathRef = ref(
      database,
      "GameFolder/Rooms/" + roomId + "/users/" + parentCompass
    );
    // console.log("GameFolder/Rooms/" + roomId + "/users/" + parentCompass);
    // console.log(users[parentCompass].score + RonScore);
    const winnerPostData = {
      score: users[parentCompass].score + RonScore,
    };

    update(winnerPathRef, winnerPostData)
      .then(() => {
        const lowserPathRef = ref(
          database,
          "GameFolder/Rooms/" + roomId + "/users/" + compass
        );

        const lowserPostData = {
          score: users[compass].score - RonScore,
        };

        update(lowserPathRef, lowserPostData)
          .then(() => {})
          .catch((error) => {
            console.log(error);
            // The write failed...
          });
      })
      .catch((error) => {
        console.log(error);
        // The write failed...
      });

    // console.log(isMe);
    // console.log(compass);
    setIsActive(false);
  };
  const toThumo = () => {
    const nowUsers = users;
    if (parentCompass == SelectDealer) {
      for (let index = 0; index < 4; index++) {
        if (index == parentCompass) {
        } else {
          nowUsers[index].score -= DealerThumoScore;
          nowUsers[parentCompass].score += DealerThumoScore;
        }
      }
    } else {
      for (let index = 0; index < 4; index++) {
        if (index == parentCompass) {
        } else if (index == SelectDealer) {
          nowUsers[index].score -= ThumoScoreFromDealer;
          nowUsers[parentCompass].score += ThumoScoreFromDealer;
        } else {
          nowUsers[index].score -= ThumoScore;
          nowUsers[parentCompass].score += ThumoScore;
        }
      }
    }
    const database = getDatabase(firebaseApp);
    const PathRef = ref(database, "GameFolder/Rooms/" + roomId);
    // console.log("GameFolder/Rooms/" + roomId + "/users/" + parentCompass);
    // console.log(users[parentCompass].score + RonScore);
    const PostData = {
      users: nowUsers,
    };

    console.log(PostData);

    update(PathRef, PostData);

    // console.log(isMe);
    // console.log(compass);
    setIsActive(false);
    setIsActive(false);
  };
  if (isMe) {
    return (
      // <FormControl variant="standard">
      <>
        {SelectDealer == compass ? (
          <Stack direction="row" spacing={0}>
            <Avatar
              sx={{
                bgcolor: AvatarColor(isMe)[100],
                color: AvatarColor(isMe)[600],
              }}
            >
              {users[compass].username.substring(0, 2)}
            </Avatar>

            <Stack spacing={0}>
              <FormControl variant="standard">
                <Select
                  value={SelectDealer}
                  onChange={handleChangeDealer}
                  // label="Age"
                >
                  <MenuItem value={0}>
                    {users[0].username.substring(0, 2)}
                  </MenuItem>
                  <MenuItem value={1}>
                    {users[1].username.substring(0, 2)}
                  </MenuItem>
                  <MenuItem value={2}>
                    {users[2].username.substring(0, 2)}
                  </MenuItem>
                  <MenuItem value={3}>
                    {users[3].username.substring(0, 2)}
                  </MenuItem>
                </Select>
              </FormControl>

              <Stack direction="row" spacing={0}>
                <FormControl>
                  <Input
                    value={String(DealerThumoScore)}
                    onChange={handleChangeDealerThumoScore}
                    // onBlur={onBlurAction}

                    endAdornment={
                      <InputAdornment position="end">
                        <div>all</div>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Stack>
            </Stack>

            <IconButton
              aria-label="toggle password visibility"
              onClick={toThumo}
            >
              <ThumbUpIcon />
            </IconButton>
          </Stack>
        ) : (
          <Stack direction="row" spacing={0}>
            <Avatar
              sx={{
                bgcolor: AvatarColor(isMe)[100],
                color: AvatarColor(isMe)[600],
              }}
            >
              {users[compass].username.substring(0, 2)}
            </Avatar>
            <Stack spacing={0}>
              <FormControl variant="standard">
                <Select
                  value={SelectDealer}
                  onChange={handleChangeDealer}
                  // label="Age"
                >
                  <MenuItem value={0}>
                    {users[0].username.substring(0, 2)}
                  </MenuItem>
                  <MenuItem value={1}>
                    {users[1].username.substring(0, 2)}
                  </MenuItem>
                  <MenuItem value={2}>
                    {users[2].username.substring(0, 2)}
                  </MenuItem>
                  <MenuItem value={3}>
                    {users[3].username.substring(0, 2)}
                  </MenuItem>
                </Select>
              </FormControl>

              <Stack direction="row" spacing={0}>
                <FormControl>
                  <Input
                    value={String(ThumoScore)}
                    onChange={handleChangeThumoScore}
                    autoFocus={true}
                    placeholder="子"
                    endAdornment={
                      <InputAdornment position="end">/</InputAdornment>
                    }
                  />
                </FormControl>

                <FormControl>
                  <Input
                    value={String(ThumoScoreFromDealer)}
                    onChange={handleChangeThumoScoreFromDealer}
                    placeholder="親"
                    // endAdornment={
                    //   <InputAdornment position="end"></InputAdornment>
                    // }
                  />
                </FormControl>
              </Stack>
            </Stack>

            <IconButton onClick={toThumo}>
              <ThumbUpIcon />
            </IconButton>
          </Stack>
        )}
      </>
      // </FormControl>
    );
  } else {
    return (
      <FormControl variant="standard">
        <Input
          id="input-with-icon-adornment"
          // onBlur={onBlurAction}

          value={String(RonScore)}
          onChange={handleChangeRonScore}
          autoFocus={true}
          startAdornment={
            <InputAdornment position="start">
              <Avatar
                sx={{
                  bgcolor: AvatarColor(isMe)[100],
                  color: AvatarColor(isMe)[600],
                }}
              >
                {users[compass].username.substring(0, 2)}
              </Avatar>
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={toRon}
              >
                {/* {true ? <VisibilityOff /> : <Visibility />}
                 */}
                <PanToolAltIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    );
  }
}

export default function ListAvatar(props) {
  const users = props.users;
  const isMe = props.isMe;
  const compass = props.compass;
  const closeAllInput = props.closeAllInput;
  const parentCompass = props.parentCompass;
  const roomId = props.roomId;
  //   const compass = props.compass
  const [isActive, setIsActive] = useState(false);
  //   const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClick = () => {
    setIsActive(true);
    closeAllInput();
  };

  const onBlurAction = () => {
    setIsActive(false);
  };

  const AvatarColor = (isMe) => {
    if (isMe) {
      return red;
    } else {
      return blue;
    }
  };
  return (
    <div>
      {isActive ? (
        <ListItem disableGutters>
          <ListItemButton>
            <RonOrTsumoForm
              roomId={roomId}
              parentCompass={parentCompass}
              isMe={isMe}
              users={users}
              compass={compass}
              onBlurAction={onBlurAction}
              setIsActive={setIsActive}
            />
          </ListItemButton>
        </ListItem>
      ) : (
        <ListItem disableGutters>
          <ListItemButton onClick={handleClick}>
            <ListItemAvatar>
              <Avatar
                sx={{
                  bgcolor: AvatarColor(isMe)[100],
                  color: AvatarColor(isMe)[600],
                }}
              >
                {users[compass].username.substring(0, 2)}
              </Avatar>
            </ListItemAvatar>
          </ListItemButton>
        </ListItem>
      )}
    </div>
  );
}
