import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.jsx';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import HomePage from './components/HomePage.jsx'
import Journal from './components/Journal.jsx';
import Mood from './components/Mood.jsx';
import Habits from './components/Habits.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
        <HomePage />
      ),
  },
  // {
  //   path: "Journal",
  //   element: (
  //     <Journal />
  //   )
  // },
  // {
  //   path: "Mood",
  //   element: (
  //     <Mood />
  //   )
  // },
  // {
  //   path: "Habits",
  //   element: (
  //     <Habits />
  //   )
  // },
]);
const container = document.getElementById('root');

const root = createRoot(container);
root.render(<RouterProvider router={router} />);
