import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import Journal from './Journal.jsx';
import Login from './Login.jsx';
import Habits from './Habits.jsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/journal' element={<Journal />} />
        <Route path='/' element={<Login />}/>
        <Route path='/habits' element={<Habits />} />
      </Routes>
    </>
  )
}

export default App;
