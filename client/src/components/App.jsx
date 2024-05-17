import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, Button } from '@mui/material';
import HomePage from './HomePage.jsx';
import Journal from './Journal.jsx';
import Login from './Login.jsx';
import Habits from './Habits.jsx';
import JournalEntry from './JournalEntry.jsx';
import DrawerContents from './DrawerContents.jsx';

const App = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const toggleDrawer = () => {
    setOpen((prevState) => !prevState)
  };

  return (
    <>
      { location.pathname === '/' ? <div></div> :
        <>
          <Button onClick={toggleDrawer}><MenuIcon /></Button>
          <Drawer open={open} onClose={toggleDrawer}>
            <DrawerContents />
          </Drawer>
        </>
      }
      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/' element={<Login />}/>
        <Route path='/habits' element={<Habits />} />
        <Route path='/journal/:id' element={<JournalEntry />} />
        <Route path='/journal' element={<Journal />} />
      </Routes>
    </>
  )
}

export default App;
