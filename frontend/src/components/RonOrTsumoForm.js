import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// import useFirebase from "../hooks/use-firebase";
import { getDatabase, ref, update } from "firebase/database";

import firebaseApp from "../services/firebase";

import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import { blue, red } from "@mui/material/colors";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { IconButton, Stack } from "@mui/material";
import PanToolAltIcon from "@mui/icons-material/PanToolAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

export default function RonOrTsumoForm(props) {
  const users = props.users;
  const roomId = props.roomId;
  const AvatarListIndex = props.AvatarListIndex;
  const AvatarPosition = props.AvatarPosition;
  // const onBlurAction = props.onBlurAction;
  const setIsActive = props.setIsActive;
  const DialogClose = props.DialogClose;

  const isMe = AvatarListIndex === AvatarPosition;

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
  const [SelectDealer, setSelectDealer] = useState(AvatarListIndex);
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
      "GameFolder/Rooms/" + roomId + "/users/" + AvatarPosition
    );
    const winnerPostData = {
      score: users[AvatarPosition].score + RonScore,
    };

    update(winnerPathRef, winnerPostData)
      .then(() => {
        const lowserPathRef = ref(
          database,
          "GameFolder/Rooms/" + roomId + "/users/" + AvatarListIndex
        );

        const lowserPostData = {
          score: users[AvatarListIndex].score - RonScore,
        };

        update(lowserPathRef, lowserPostData)
          .then(() => {})
          .catch((error) => {
            // console.log(error);
            // The write failed...
          });
      })
      .catch((error) => {
        // console.log(error);
        // The write failed...
      });

    // console.log(isMe);
    // console.log(AvatarListIndex);
    setIsActive(false);
    DialogClose();
  };

  const toThumo = () => {
    const nowUsers = users;
    if (AvatarPosition === SelectDealer) {
      for (let index = 0; index < 4; index++) {
        if (index === AvatarPosition) {
        } else {
          nowUsers[index].score -= DealerThumoScore;
          nowUsers[AvatarPosition].score += DealerThumoScore;
        }
      }
    } else {
      for (let index = 0; index < 4; index++) {
        if (index === AvatarPosition) {
        } else if (index === SelectDealer) {
          nowUsers[index].score -= ThumoScoreFromDealer;
          nowUsers[AvatarPosition].score += ThumoScoreFromDealer;
        } else {
          nowUsers[index].score -= ThumoScore;
          nowUsers[AvatarPosition].score += ThumoScore;
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

    // console.log(PostData);

    update(PathRef, PostData);

    // console.log(isMe);
    // console.log(compass);
    setIsActive(false);
    DialogClose();
  };
  if (isMe) {
    return (
      // <FormControl variant="standard">
      <>
        {SelectDealer === AvatarListIndex ? (
          <Stack direction="row" spacing={0}>
            <Avatar
              sx={{
                bgcolor: AvatarColor(isMe)[100],
                color: AvatarColor(isMe)[600],
              }}
            >
              {users[AvatarListIndex].username.substring(0, 2)}
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
                    type="number"
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
              {users[AvatarListIndex].username.substring(0, 2)}
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
                    type="number"
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
                    type="number"
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
    );
  } else {
    return (
      <>
        <Stack direction="row" spacing={0}>
          <Avatar
            sx={{
              bgcolor: AvatarColor(isMe)[100],
              color: AvatarColor(isMe)[600],
            }}
          >
            {users[AvatarListIndex].username.substring(0, 2)}
          </Avatar>

          <Stack direction="row" spacing={0}>
            <FormControl>
              <Input
                type="number"
                value={String(RonScore)}
                onChange={handleChangeRonScore}
              />
            </FormControl>
          </Stack>

          <IconButton aria-label="toggle password visibility" onClick={toRon}>
            <PanToolAltIcon />
          </IconButton>
        </Stack>
      </>
    );
  }
}
