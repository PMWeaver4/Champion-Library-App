import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
// My Library
import ViewAll_LibraryBooks from "./Routes/LibraryViewAllLinks/ViewAll_LibraryBooks";
import ViewAll_LibraryGames from "./Routes/LibraryViewAllLinks/ViewAll_LibraryGames";
import ViewAll_LibraryItems from "./Routes/LibraryViewAllLinks/ViewAll_LibraryItems";
import ViewAll_BorrowedBooks from "./Routes/LibraryViewAllLinks/ViewAll_BorrowedBooks";
import ViewAll_BorrowedItems from "./Routes/LibraryViewAllLinks/ViewAll_BorrowedItems";
import ViewAll_BorrowedGames from "./Routes/LibraryViewAllLinks/ViewAll_BorrowedGames";
import ViewAll_LentBooks from "./Routes/LibraryViewAllLinks/ViewAll_LentBooks";
import ViewAll_LentGames from "./Routes/LibraryViewAllLinks/ViewAll_LentGames";
import ViewAll_Lent_Items from "./Routes/LibraryViewAllLinks/ViewAll_Lent_Items";

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

  
  // View all books in My Library
  {
  path:"/Books-MyLibrary",
  element: <ViewAll_LibraryBooks/>,
  },

  // View all Games in My Library
  {
  path:"/Games-MyLibrary",
  element: <ViewAll_LibraryGames/>
  },

  // View all Items
  {
    path: "/Items-MyLibrary",
    element: <ViewAll_LibraryItems/>
  },

  // View all borrowed books in borrowed tab
    {
    path:"/BorrowedBooks-MyLibrary",
    element: <ViewAll_BorrowedBooks/>,
    },
  
    // View all  borrowed Games in borrowed tab
    {
    path:"/BorrowedGames-MyLibrary",
    element: <ViewAll_BorrowedGames/>
    },
  
    // View all borrowed Items in borrowed tab
    {
      path: "/BorrowedItems-MyLibrary",
      element: <ViewAll_BorrowedItems/>
    },

    // View all Lent books in lent tab
    {
      path:"/LentBooks-MyLibrary",
      element: <ViewAll_LentBooks/>
    },

    // View all Lent Games in lent tab
    {
      path:"/LentGames-MyLibrary",
      element: <ViewAll_LentGames/>
    },
    // View all Lent Items in the lent tab
    {
      path:"/LentItems-MyLibrary",
      element: <ViewAll_Lent_Items/>
    },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
