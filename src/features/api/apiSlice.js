import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
//https://library-management-rhsk.onrender.com/api/v1
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://localhost:8000/api/v1`,
  }),
  endpoints: (builder) => ({}),
});
