import {apiSlice} from "../api/apiSlice";

export const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: `/book/getAllBooks`,
        method: "GET",
        // body: data,
      }),
    }),
    getRequestedBooks: builder.query({
      query: () => ({
        url: `/requestedBook/getAllRequestedBooks`,
        method: "GET",
        // body: data,
      }),
    }),
    getFilteredRequestedBooks: builder.query({
      query: (data) => ({
        url: `/requestedBook/filteredRequestedBook`,
        method: "POST",
        body: data,
      }),
    }),
    getTopRequestedBooks: builder.query({
      query: () => ({
        url: `/requestedBook/topRequestedBooks`,
        method: "GET",
      }),
    }),
    getTopBooks: builder.query({
      query: () => ({
        url: `/book/topBooks`,
        method: "GET",
      }),
    }),
    getBookDetails: builder.query({
      query: ({id}) => ({
        url: `/book/getSingleBook/${id}`,
        method: "GET",
        // body: data,
      }),
    }),

    // deleteBookmark: builder.mutation({
    //   query: ({id, userId}) => ({
    //     url: `/bookmark/deletebookmark/${id}`,
    //     method: "POST",
    //   }),
    //   async onQueryStarted({id, userId}, {queryFulfilled, dispatch}) {
    //     try {
    //       const result = await queryFulfilled;

    //       // update bookmark cache
    //       if (result?.data?.status === "success") {
    //         dispatch(
    //           apiSlice.util.updateQueryData("getBookmarks", {userId: userId}, (draft) => {
    //             const filterDraft = draft?.bookmarks?.filter((d) => d._id !== id);
    //             return {
    //               ...draft,
    //               bookmarks: filterDraft,
    //             };
    //           })
    //         );
    //       }
    //     } catch (err) {
    //       //nothing to do
    //       console.log(err);
    //     }
    //   },
    // }),
    addBook: builder.mutation({
      query: (data) => ({
        url: `book/addBook`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;
          console.log(result);
          const data = result?.data;

          // update bookmark cache
          if (result?.data?.status === "success") {
            //updating groups
            dispatch(
              apiSlice.util.updateQueryData("getBooks", null, (draft) => {
                if (!draft?.groups?.includes(arg?.group)) {
                  draft?.groups?.push(arg?.group);
                }
              })
            );
            //updating bookmarks
            dispatch(
              apiSlice.util.updateQueryData("getBooks", {userId: arg?.userId}, (draft) => {
                draft?.bookmarks?.push(data);
              })
            );
          }
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),
    getFilteredBooks: builder.query({
      query: (data) => ({
        url: `book/filteredBooks`,
        method: "POST",
        body: data,
      }),
    }),
    getSearchedBooks: builder.query({
      query: (data) => ({
        url: `book/searchedBooks`,
        method: "POST",
        body: data,
      }),
    }),
    addRequestedBook: builder.mutation({
      query: (data) => ({
        url: `requestedBook/addRequestedBook`,
        method: "POST",
        body: data,
      }),
    }),
    updateRequestCount: builder.mutation({
      query: (data) => ({
        url: `requestedBook/requesteCount`,
        method: "POST",
        body: data,
      }),
    }),
    getMonthCount: builder.query({
      query: () => ({
        url: `/month/getAllMonth/`,
        method: "GET",
      }),
    }),
  }),
});

export const {useGetBooksQuery, useGetBookDetailsQuery, useGetRequestedBooksQuery, useAddBookMutation, useGetFilteredBooksQuery, useGetFilteredRequestedBooksQuery, useGetTopBooksQuery, useGetTopRequestedBooksQuery, useAddRequestedBookMutation, useUpdateRequestCountMutation, useGetMonthCountQuery, useGetSearchedBooksQuery} = bookApi;
