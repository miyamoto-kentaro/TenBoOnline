import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

import { useNavigate, useLocation } from "react-router-dom";
// import {  } from "react-router-dom";

// import useFirebase from "../hooks/use-firebase";
import { getDatabase, ref, onValue, set, update } from "firebase/database";
import firebaseApp from "../services/firebase";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Avatar from "@mui/material/Avatar";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CancelIcon from "@mui/icons-material/Cancel";

import CustomAvatar from "../components/CustomAvatar";
import ReBo from "../components/ReBo";

export default function GameScreen() {
  const navigate = useNavigate();

  const location = useLocation();
  const roomId = location.state.roomId;

  // console.log(roomId);
  const initUsers = [...Array(4)].map(() => ({
    username: "名無し",
    score: 25000,
  }));
  // const [data, setData] = useState();
  const [users, setUsers] = useState(initUsers);
  const [reBo, setReBo] = useState(0);

  const [isSanma, setIsSanma] = useState(false);

  const handleChangeIsSanma = () => {
    const database = getDatabase(firebaseApp);
    const pathRef = ref(database, "GameFolder/Rooms/" + roomId);
    const newData = {
      isSanma: !isSanma,
    };
    update(pathRef, newData);
    setIsSanma(!isSanma);
  };

  const initRoom = () => {
    const database = getDatabase(firebaseApp);
    const pathRef = ref(database, "GameFolder/Rooms/" + roomId);
    // console.log(path);

    const initData = {
      users: initUsers,
      reBo: 0,
      isSanma: false,
    };

    set(pathRef, initData);
  };

  const leaveRoom = () => {
    // console.log(username + "," + roomId);
    // db.collection("room").add({
    //   name: roomId,
    // });
    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      // dev code
      navigate("/");
    } else {
      // production code
      navigate("../TenBoOnline/");
    }
  };
  // console.log(users);

  useEffect(() => {
    //connect to app database with config settings
    const database = getDatabase(firebaseApp);

    const pathRef = ref(database, "GameFolder/Rooms/" + roomId);
    onValue(
      pathRef,
      (snapshot) => {
        //send new data to react with setData every time information changed on realtime db
        const newData = snapshot.val();
        // console.log("newData:" + newData);
        if (newData === null) {
          initRoom();
        } else {
          // setData(newData);
          // console.log(newData.users);
          setUsers(newData.users);
          setReBo(newData.reBo);
          setIsSanma(newData.isSanma);
        }
      },
      (error) => {}
    );
  }, []);

  return (
    <Container component="main">
      <AppBar>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={leaveRoom}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ルームID : {roomId}
          </Typography>

          <FormControlLabel
            control={
              <Switch
                checked={isSanma}
                onChange={handleChangeIsSanma}
                defaultChecked
                color="secondary"
              />
            }
            label="三人麻雀"
          />
          {/* <Button color="inherit">ルームID:{roomId}</Button> */}
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* AvatarPositionはCustomAvatarの場所 */}

        <Stack spacing={8} alignItems={"center"}>
          <Stack>
            <CustomAvatar
              reBo={reBo}
              roomId={roomId}
              users={users}
              AvatarPosition={2}
              isSanma={isSanma}
            />
          </Stack>
          <Stack direction="row" spacing={5} alignItems={"center"}>
            <Stack>
              {isSanma ? (
                <Avatar
                  sx={{
                    height: "70px",
                    width: "70px",
                    color: "black",
                  }}
                >
                  <CancelIcon />
                </Avatar>
              ) : (
                <CustomAvatar
                  reBo={reBo}
                  roomId={roomId}
                  users={users}
                  AvatarPosition={3}
                  isSanma={isSanma}
                />
              )}
            </Stack>

            <ReBo isSanma={isSanma} roomId={roomId} users={users} reBo={reBo} />

            <Stack>
              <CustomAvatar
                reBo={reBo}
                roomId={roomId}
                users={users}
                AvatarPosition={1}
                isSanma={isSanma}
              />
            </Stack>
          </Stack>
          <Stack>
            <CustomAvatar
              reBo={reBo}
              roomId={roomId}
              users={users}
              AvatarPosition={0}
              isSanma={isSanma}
            />
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}
