import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import Journal from './Journal.jsx';
import Login from './Login.jsx';
import Habits from './Habits.jsx';
import JournalEntry from './JournalEntry.jsx';
import NavBar from './NavBar.jsx';

const App = () => {
  const location = useLocation();
  return (
    <>
      { location.pathname === '/' ? <div></div> : <NavBar />}
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
