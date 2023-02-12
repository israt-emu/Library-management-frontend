import {apiSlice} from "../api/apiSlice";

export const borrowedBookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBorrwedBooks: builder.query({
      query: () => ({
        url: `/borrowedBook/getAllBorrowedBooks`,
        method: "GET",
        // body: data,
      }),
    }),
    getBorrowedBookDetails: builder.query({
      query: ({id}) => ({
        url: `/borrowedBook/getSingleBorrowedBook/${id}`,
        method: "GET",
        // body: data,
      }),
    }),
    addBorrowedBook: builder.mutation({
      query: (data) => ({
        url: `/borrowedBook/addBorrowedBook`,
        method: "POST",
        body: data,
      }),
    }),

    returnBorrowedBook: builder.mutation({
      query: (data) => ({
        url: `/borrowedBook/returnBook`,
        method: "POST",
        body: data,
      }),
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
    }),
    findBorrowedBookByUserId: builder.query({
      query: (id) => ({
        url: `borrowedBook/getBorrowedBooksByUserId/${id}`,
        method: "GET",
      }),
    }),
    getTopBorrowedBooks: builder.query({
      query: () => ({
        url: `borrowedBook/getTopBorrowedBooks`,
        method: "GET",
      }),
    }),
    getFilteredBorrowedBooks: builder.query({
      query: (data) => ({
        url: `borrowedBook/filteredBorrowedBook`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {useGetBorrowedBookDetailsQuery, useGetBorrwedBooksQuery, useReturnBorrowedBookMutation, useAddBorrowedBookMutation, useFindBorrowedBookByUserIdQuery, useGetTopBorrowedBooksQuery, useGetFilteredBorrowedBooksQuery} = borrowedBookApi;
