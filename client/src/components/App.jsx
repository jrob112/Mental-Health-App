import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import Journal from './Journal.jsx';
import Login from './Login.jsx';
import Habits from './Habits.jsx';
import JournalEntry from './JournalEntry.jsx';
import NavBar from './NavBar.jsx';
import Moods from './Moods.jsx'

const App = () => {
  return (
    <>
      <NavBar />
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
