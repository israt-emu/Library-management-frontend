import React from "react";
import "./App.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Index from "./pages/Index";
import {useAuthCheck} from "./hooks/useAuthCheck";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";
// import ShowSearchedCard from "./components/common/ShowSearchedCard";
import Book from "./components/book/Book";
import BookDetails from "./components/book/BookDetails";
import Analytics from "./components/analytics/Analytics";
import TopBooks from "./components/topBooks/TopBooks";

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
        path: "/dashboard/topBooks",
        element: (
          <PrivateRoute>
            <TopBooks />
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
            <Analytics />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
function App() {
  const authChecked = useAuthCheck();
  return !authChecked ? <div>Checking Authentication....</div> : <RouterProvider router={router} />;
}

export default App;
