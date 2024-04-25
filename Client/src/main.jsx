import "./style.scss";
import ReactDOM from "react-dom/client";
import React from "react";
import { Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";

import LoginSignup from "./Routes/LoginSignup/LoginSignup";
import Home from "./Routes/Home/Home";
import Inbox from "./Routes/Inbox/Inbox";
import MyLibrary from "./Routes/MyLibrary/MyLibrary";
import Users from "./Routes/Users/Users";
import MyAccount from "./Routes/MyProfile/MyProfile";
import Admin from "./Routes/Admin/Admin";
import AllBooks from "./Routes/ViewAllItems/AllBooks";
import AllGames from "./Routes/ViewAllItems/AllGames";
import AllOthers from "./Routes/ViewAllItems/AllOthers";
import MyLoaned from "./Routes/MyLoaned/MyLoaned";
import MyBorrowed from "./Routes/MyBorrowed/MyBorrowed";
import BookProfileCardPage from "./Routes/BookProfileCardPage/BookProfileCardPage";
import UsersViewLibraryPage from "./Components/UsersLibraryPage/UsersViewLibraryPage";


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
    // BookProfileCardPage
    path: "/book-profile/:bookId",
    element: <BookProfileCardPage />,
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
    // admin
    path: "/admin",
    element: <Admin />,
  },
  {
    // my acount or my profile
    path: "/account",
    element: <MyAccount />,
  },
  {
    // view all books
    path: "/books",
    element: <AllBooks />,
  },
  {
    // view all games
    path: "/games",
    element: <AllGames />,
  },
  {
    // view all other
    path: "/others",
    element: <AllOthers />,
  },
  {
    path: "/my-library/borrowed",
    element: <MyBorrowed/>,
  },
  {
    path: "/my-library/loaned",
    element: <MyLoaned/>,
  },
  {
    path: "/UsersViewLibrary/:userId",
    element: <UsersViewLibraryPage/>,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  }
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
