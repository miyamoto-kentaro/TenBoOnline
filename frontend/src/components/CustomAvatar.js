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
} from "firebase/database";

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
import { blue } from "@mui/material/colors";

import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Stack } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

function SimpleDialog(props) {
  //   const { onClose, open } = props;
  const onClose = props.onClose;
  const open = props.open;
  const compass = props.compass;
  const users = props.users;

  const [isRename, setIsRename] = useState(false);
  const [isRescore, setIsRescore] = useState(false);

  const handleNameClick = () => {
    setIsRescore(false);
    setIsRename(true);
  };

  const handleScoreClick = () => {
    setIsRename(false);
    setIsRescore(true);
  };

  const blurNameField = () => {
    setIsRename(false);
  };

  const blurScoreField = () => {
    setIsRescore(false);
  };
  const handleListItemClick = (value) => {
    onClose();
  };

  const DialogOnClose = () => {
    onClose();
    setIsRename(false);
    setIsRescore(false);
  };

  const Rename = () => {
    setIsRename(false);
  };

  return (
    <Dialog fullWidth={true} onClose={DialogOnClose} open={open}>
      {isRename ? (
        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <Input
            autoFocus={true}
            defaultValue={users[compass].username}
            onBlur={blurNameField}
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
          {users[compass].username}
        </DialogTitle>
      )}
      {isRescore ? (
        <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
          <Input
            autoFocus={true}
            defaultValue={users[compass].score}
            onBlur={blurScoreField}
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
        <DialogTitle onClick={handleScoreClick}>
          {users[compass].score}
        </DialogTitle>
      )}
      <List sx={{ pt: 0 }}>
        <ListItem disableGutters>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText />
          </ListItemButton>
        </ListItem>
        <ListItem disableGutters>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText />
          </ListItemButton>
        </ListItem>
        <ListItem disableGutters>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText />
          </ListItemButton>
        </ListItem>
        <ListItem disableGutters>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText />
          </ListItemButton>
        </ListItem>
        <ListItem disableGutters>
          <ListItemButton onClick={() => handleListItemClick("addAccount")}>
            <ListItemAvatar>
              <Avatar>{compass}</Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem>
      </List>
    </Dialog>
  );
}

export default function CusTomAvatar(props) {
  const users = props.users;
  const compass = props.compass;
  //   const compass = props.compass
  const [open, setOpen] = useState(false);
  //   const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack>
      <Button onClick={handleClickOpen}>
        <Badge
          badgeContent={users[compass].score}
          max={1000000}
          color="primary"
        >
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            {users[compass].username.substring(0, 2)}
            {/* miyayay */}
          </Avatar>
        </Badge>
      </Button>

      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open simple dialog
      </Button> */}

      <SimpleDialog
        open={open}
        onClose={handleClose}
        compass={compass}
        users={users}
      />
    </Stack>
  );
}
