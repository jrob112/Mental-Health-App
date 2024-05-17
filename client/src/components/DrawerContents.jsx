import React from "react";
import { Box, Button, List, ListItem, Divider } from "@mui/material";
import { NavLink } from "react-router-dom";
import BookIcon from '@mui/icons-material/Book';
import ChecklistIcon from '@mui/icons-material/Checklist';
import HomeIcon from '@mui/icons-material/Home';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const DrawerContents = () => {
  return (
    <Box
      sx={{ flexDirection: 'column' }}
    >
      <List>
        <ListItem>
          <NavLink to='/home'><Button><HomeIcon sx={{marginRight: 1}}/> Home</Button></NavLink>
        </ListItem>
        <Divider />
        <ListItem>
          <NavLink to='/habits'><Button><ChecklistIcon sx={{marginRight: 1}}/> Habits</Button></NavLink>
        </ListItem>
        <ListItem>
          <NavLink to='/journal'><Button><BookIcon sx={{marginRight: 1}}/> Journal</Button></NavLink>
        </ListItem>
        <ListItem>
          <NavLink to='/moods'><Button><EmojiEmotionsIcon sx={{marginRight: 1}}/> Moods</Button></NavLink>
        </ListItem>
      </List>
    </Box>
  )
}

export default DrawerContents;