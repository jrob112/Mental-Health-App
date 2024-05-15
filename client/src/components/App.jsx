import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import Journal from './Journal.jsx';
import Login from './Login.jsx';
import JournalEntry from './JournalEntry.jsx';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/' element={<Login />}/>
        <Route path='/journal/:id' element={<JournalEntry />} />
        <Route path='/journal' element={<Journal />} />
      </Routes>
    </>
  )
}

export default App;
