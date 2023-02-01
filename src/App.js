import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";
import { useAuthCheck } from "./hooks/useAuthCheck";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import BookMarks from "./components/bookMark/BookMarks";
import SignUp from "./pages/SignUp";
import Store from "./components/store/Store";
import Archive from "./components/archive/Archive";
import Trash from "./components/trash/Trash";
import ShowSearchedCard from "./components/common/ShowSearchedCard";
import Book from "./components/book/Book";
import BookDetails from "./components/book/BookDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <Index />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <SignUp />
      </PublicRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <Dashboard />
      // <PrivateRoute>
      //   <Dashboard />
      // </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/books",
        element: (
          <Book />
          // <PrivateRoute>
          //   <BookMarks />
          // </PrivateRoute>
        ),
       
      },
      {
        path: "/dashboard/books/:id",
        element: <BookDetails />,
      },
      // {
      //   path: "/dashboard/store",
      //   element: (
      //     <Store />
      //     // <PrivateRoute>
      //     //   <Store />
      //     // </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "/dashboard/archive",
      //   element: (
      //     <Archive />
      //     // <PrivateRoute>
      //     //   <Archive />
      //     // </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "/dashboard/trash",
      //   element: (
      //     <PrivateRoute>
      //       <Trash />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "/dashboard/search",
      //   element: (
      //     <PrivateRoute>
      //       <ShowSearchedCard />
      //     </PrivateRoute>
      //   ),
      // },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
function App() {
  const authChecked = useAuthCheck();
  return !authChecked ? (
    <div>Checking Authentication....</div>
  ) : (
    <RouterProvider router={router} />
  );
}

export default App;
