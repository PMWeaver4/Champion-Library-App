import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginSignup from './Routes/LoginSignup/LoginSignup';
import Home from './Routes/Home/Home';
import Inbox from './Routes/Inbox/Inbox';
import MyLibrary from './Routes/MyLibrary/MyLibrary';
import Users from './Routes/Users/Users';
import Settings from './Routes/Settings/Settings';
import './style.scss'

const router = createBrowserRouter([
  {
    // login & signup
    path: "/",
    element: <LoginSignup />,
  },
  {
    // dashboard
    path: "/home",
    element: <Home />,
  },
  {
    // inbox
    path: "/inbox",
    element: <Inbox />,
  },
  {
    // my library
    path: "/my-library",
    element: <MyLibrary />,
  },
  {
    // users
    path: "/users",
    element: <Users />,
  },
  {
    // settings
    path: "/settings",
    element: <Settings />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
