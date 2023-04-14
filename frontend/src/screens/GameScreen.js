import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// import useFirebase from "../hooks/use-firebase";
import {
  getDatabase,
  ref,
  onValue,
  push,
  update,
  set,
  get,
} from "firebase/database";

import { useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import firebaseApp from "../services/firebase";

import CustomAvatar from "../components/CustomAvatar";

export default function GameScreen() {
  const location = useLocation();
  const roomId = location.state.roomId;

  // console.log(roomId);

  // const [data, setData] = useState();
  const [users, setUsers] = useState({
    users: {
      0: {
        username: "名無し",
        score: 25000,
      },
      1: {
        username: "名無し",
        score: 25000,
      },
      2: {
        username: "名無し",
        score: 25000,
      },
      3: {
        username: "名無し",
        score: 25000,
      },
    },
  });

  // console.log(users);

  const [errors, setErrors] = useState();

  const initRoom = () => {
    const database = getDatabase(firebaseApp);
    const pathRef = ref(database, "GameFolder/Rooms/" + roomId);
    // console.log(path);
    const initUsers = {
      users: {
        0: {
          username: "名無し",
          score: 25000,
        },
        1: {
          username: "名無し",
          score: 25000,
        },
        2: {
          username: "名無し",
          score: 25000,
        },
        3: {
          username: "名無し",
          score: 25000,
        },
      },
    };
    set(pathRef, initUsers);
  };

  useEffect(() => {
    //connect to app database with config settings
    const database = getDatabase(firebaseApp);

    //define what area of the database you want to access
    const pathRef = ref(database, "GameFolder/Rooms/" + roomId);
    // get(pathRef)
    //   .then((snapshot) => {
    //     if (snapshot.exists()) {
    //       setUsers(snapshot.val());
    //     } else {
    //       console.log("No data available");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    // console.log(path);
    onValue(
      pathRef,
      (snapshot) => {
        //send new data to react with setData every time information changed on realtime db
        const newData = snapshot.val();
        console.log("newData:" + newData);
        if (newData === null) {
          initRoom();
        } else {
          // setData(newData);
          setUsers(newData);
        }
      },
      (error) => {
        setErrors(error);
      }
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
        <Stack spacing={8} alignItems={"center"}>
          <Stack>
            <CustomAvatar roomId={roomId} users={users.users} compass={2} />
          </Stack>
          <Stack direction="row" spacing={24} alignItems={"center"}>
            <Stack>
              <CustomAvatar roomId={roomId} users={users.users} compass={3} />
            </Stack>

            <Stack>
              <CustomAvatar roomId={roomId} users={users.users} compass={1} />
            </Stack>
          </Stack>
          <Stack>
            <CustomAvatar roomId={roomId} users={users.users} compass={0} />
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}
