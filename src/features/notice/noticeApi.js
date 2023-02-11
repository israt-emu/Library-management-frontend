import { apiSlice } from "../api/apiSlice";

export const noticeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotices: builder.query({
      query: () => ({
        url: `/notice/getAllNotice`,
        method: "GET",
        // body: data,
      }),
    }),
    // getDetails: builder.query({
    //   query: ({id}) => ({
    //     url: `/borrowedBook/getSingleBorrowedBook/${id}`,
    //     method: "GET",
    //     // body: data,
    //   }),
    // }),
    addNotice: builder.mutation({
      query: (data) => ({
        url: `/notice/addNotice`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddNoticeMutation, useGetNoticesQuery } = noticeApi;
