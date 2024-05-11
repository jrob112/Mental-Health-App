import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.jsx';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Hello World</h1>
        <App />
        <Link to="about">About Us</Link>
      </div>
    ),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);
const container = document.getElementById('root');

const root = createRoot(container);
root.render(<RouterProvider router={router} />);
