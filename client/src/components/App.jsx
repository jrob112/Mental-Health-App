import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import Journal from './Journal.jsx';
import Login from './Login.jsx';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/journal' element={<Journal />} />
      <Route path='/login' element={<Login />}/>
    </Routes>
  )
}

export default App;
