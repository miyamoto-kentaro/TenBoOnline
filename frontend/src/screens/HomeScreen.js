import { useState } from "react";
// import { Link } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
export default function HomeScreen() {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState(0);
  const handleSubmit = (args) => {
    console.log(args);
    // alert(args);
  };
  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleChangeRoomId = (event) => {
    const onlyInt = event.target.value.replace(/\D/g, "");
    setRoomId(parseInt(Number(onlyInt)));
  };
  const joinRoom = () => {
    console.log(username + "," + roomId);
  };
  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <TableRestaurantIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ゲームに参加
          </Typography>
          <Box onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="ユーザー名"
              autoFocus
              value={username}
              onChange={handleChangeUsername}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="部屋番号"
              id="roomId"
              type="number"
              value={String(roomId)}
              onChange={handleChangeRoomId}
            />
            <Button
              //   type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={joinRoom}
            >
              入室
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
