import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.jsx';
import { BrowserRouter } from "react-router-dom";
// import font to be used throughout project
import './fonts/fonts.css';

const container = document.getElementById('root');

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
