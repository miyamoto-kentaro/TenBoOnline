import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

import { useNavigate, useLocation } from "react-router-dom";
// import {  } from "react-router-dom";

// import useFirebase from "../hooks/use-firebase";
import { getDatabase, ref, onValue, set } from "firebase/database";
import firebaseApp from "../services/firebase";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import CustomAvatar from "../components/CustomAvatar";

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

  const initRoom = () => {
    const database = getDatabase(firebaseApp);
    const pathRef = ref(database, "GameFolder/Rooms/" + roomId + "/users");
    // console.log(path);

    set(pathRef, initUsers);
  };

  const leaveRoom = () => {
    // console.log(username + "," + roomId);
    // db.collection("room").add({
    //   name: roomId,
    // });

    navigate("../");
  };
  // console.log(users);

  useEffect(() => {
    //connect to app database with config settings
    const database = getDatabase(firebaseApp);

    const pathRef = ref(database, "GameFolder/Rooms/" + roomId + "/users");
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
          setUsers(newData);
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
            <CustomAvatar roomId={roomId} users={users} AvatarPosition={2} />
          </Stack>
          <Stack direction="row" spacing={24} alignItems={"center"}>
            <Stack>
              <CustomAvatar roomId={roomId} users={users} AvatarPosition={3} />
            </Stack>

            <Stack>
              <CustomAvatar roomId={roomId} users={users} AvatarPosition={1} />
            </Stack>
          </Stack>
          <Stack>
            <CustomAvatar roomId={roomId} users={users} AvatarPosition={0} />
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}
