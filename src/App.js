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
import UserDashboard from "./components/user/UserDashboard";
import BookRequest from "./components/book/BookRequest";
import Articles from "./components/articles/Articles";
import ArticleDetails from "./components/articles/ArticleDetails";
import Notice from "./components/notice/Notice";
import TopBooks from "./components/topBooks/TopBooks";
import AdminDashboard from "./components/user/AdminDashboard";

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

      {
        path: "/dashboard/user",
        element: (
          <PrivateRoute>
            <UserDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/admin",
        element: (
          <PrivateRoute>
            <AdminDashboard />
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
      {
        path: "/dashboard/articles",
        element: (
          <PrivateRoute>
            <Articles />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/articles/:id",
        element: (
          <PrivateRoute>
            <ArticleDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/notice",
        element: (
          <PrivateRoute>
            <Notice />
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
  return !authChecked ? <div>Checking Authentication....</div> : <RouterProvider router={router} />;
}

export default App;
