import React from "react";
import ReactDOM from "react-dom/client";
import { Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginSignup from "./Routes/LoginSignup/LoginSignup";
import Home from "./Routes/Home/Home";
import Inbox from "./Routes/Inbox/Inbox";
import MyLibrary from "./Routes/MyLibrary/MyLibrary";
import Users from "./Routes/Users/Users";
import MyProfile from "./Routes/MyProfile/MyProfile";
import "./style.scss";
import AllBooks from "./Routes/ViewAllItems/AllBooks";
import AllGames from "./Routes/ViewAllItems/AllGames";
import AllOthers from "./Routes/ViewAllItems/AllOthers";

const router = createBrowserRouter([
  {
    // login & signup
    path: "/",
    element: <LoginSignup addStuffHere="value" />,
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
    // my profile
    path: "/my-profile",
    element: <MyProfile />,
  },
  {
    // view all books
    path: "/books",
    element: <AllBooks />,
  },
  {
    // view all games
    path: "/games",
    element: <AllGames/>,
  },
  {
    // view all other
    path: "/others",
    element: <AllOthers/>,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
