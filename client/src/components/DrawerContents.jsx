import React from "react";
import { Box, Button, List, ListItem, Divider } from "@mui/material";
import { NavLink } from "react-router-dom";
import BookIcon from '@mui/icons-material/Book';
import ChecklistIcon from '@mui/icons-material/Checklist';
import HomeIcon from '@mui/icons-material/Home';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { styleRedButton } from "./styles";
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';

const DrawerContents = () => {

  const handleLogout = () => {
    axios.post('/auth/logout')
      .catch((err) => {
        console.error('Could not logout: ', err)
      })
  }

  return (
    <Box
      sx={{ flexDirection: 'column', minWidth: 150, height: 400 }}
    >
      <List>
        <ListItem>
          <NavLink to='/home'><Button sx={{ ...styleRedButton, color: 'white', width: 125 }} variant="contained"><HomeIcon sx={{marginRight: 1, color: 'white'}}/>Home</Button></NavLink>
        </ListItem>
        <Divider />
        <ListItem>
          <NavLink to='/habits'><Button sx={{ ...styleRedButton, color: 'white', width: 125 }} variant="contained"><ChecklistIcon sx={{marginRight: 1, color: 'white'}}/>Habits</Button></NavLink>
        </ListItem>
        <ListItem>
          <NavLink to='/journal'><Button sx={{ ...styleRedButton, color: 'white', width: 125 }} variant="contained"><BookIcon sx={{marginRight: 1, color: 'white'}}/>Journal</Button></NavLink>
        </ListItem>
        <ListItem>
          <NavLink to='/moods'><Button sx={{ ...styleRedButton, color: 'white', width: 125 }} variant="contained"><EmojiEmotionsIcon sx={{marginRight: 1, color: 'white'}}/>Moods</Button></NavLink>
        </ListItem>
          <Divider />
        <ListItem>
            <NavLink to='/'><Button onClick={handleLogout} sx={{ ...styleRedButton, color: 'white', width: 125 }} variant="contained"><LogoutIcon sx={{marginRight: 1, color: 'white'}}/>Logout</Button></NavLink>
        </ListItem>
      </List>
    </Box>
  )
}

export default DrawerContents;