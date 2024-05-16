import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import Journal from './Journal.jsx';
import Login from './Login.jsx';
import Moods from './Moods.jsx';



const App = () => {
  return (
    <>
      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='/journal' element={<Journal />} />
        <Route path='/moods' element={<Moods />} />
        <Route path='/' element={<Login />}/>
      </Routes>
    </>
  )
}

export default App;
