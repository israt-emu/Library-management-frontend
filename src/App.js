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
import Analytics from "./components/analytics/Analytics";
import UserDashboard from "./components/user/UserDashboard";
import BookRequest from "./components/book/BookRequest";

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
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/books",
        element: (
          <PrivateRoute>
            <Book />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/books/:id",
        element: (
          <PrivateRoute>
            <BookDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/analytics",
        element: (
          <PrivateRoute>
            {" "}
            <Analytics />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/user",
        element: (
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/bookRequest",
        element: (
          <PrivateRoute>
            <BookRequest />
          </PrivateRoute>
        ),
      },
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
