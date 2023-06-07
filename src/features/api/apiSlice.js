import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
//
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://library-management-rhsk.onrender.com/api/v1`,
  }),
  endpoints: (builder) => ({}),
});
