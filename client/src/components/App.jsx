import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, Button } from '@mui/material';
import { red } from '@mui/material/colors';
import HomePage from './HomePage.jsx';
import Journal from './Journal.jsx';
import Login from './Login.jsx';
import Habits from './Habits.jsx';
import JournalEntry from './JournalEntry.jsx';
import Moods from './Moods.jsx'
import DrawerContents from './DrawerContents.jsx';

const App = () => {
  // state for drawer
  const [open, setOpen] = useState(false);
  // location from react router
  const location = useLocation();

  // toggles the drawer component open or closed
  const toggleDrawer = () => {
    setOpen((prevState) => !prevState)
  };

  return (
    <>
      {/* Dont show navigation drawer on login page */}
      { location.pathname === '/' ? <div></div> :
        <>
          <Button sx={{color: red[300]}} onClick={toggleDrawer}><MenuIcon /></Button>
          <Drawer open={open} onClose={toggleDrawer}>
            <DrawerContents />
          </Drawer>
        </>
      }
      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/' element={<Login />}/>
        <Route path='/habits' element={<Habits />} />
        <Route path='/moods' element={<Moods />} />
        <Route path='/journal/:id' element={<JournalEntry />} />
        <Route path='/journal' element={<Journal />} />
      </Routes>
    </>
  )
}

export default App;
