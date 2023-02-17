import {configureStore} from "@reduxjs/toolkit";
import {apiSlice} from "../features/api/apiSlice";
import authReducer from "../features/auth/authSlice";
import themeReducer from "../features/theme/themeSlice";
import activeLinkReducer from "../features/activeLink/activeLinkSlice";
import filterReducer from "../features/filter/filterSlice";
import borrowedBookReducer from "../features/boorowedBook/borrowedBookSlice";
import paginationReducer from "../features/pagination/paginationSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    theme: themeReducer,
    active: activeLinkReducer,
    filter: filterReducer,
    borrowedBook: borrowedBookReducer,
    pagination: paginationReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(apiSlice.middleware),
});
