import {apiSlice} from "../api/apiSlice";
import {noticeApi} from "../notice/noticeApi";

export const borrowedBookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBorrwedBooks: builder.query({
      query: () => ({
        url: `/borrowedBook/getAllBorrowedBooks`,
        method: "GET",
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
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;
          const data = result?.data?.borrowedBook;

          // update book cache
          if (result?.data?.status === "success") {
            dispatch(
              apiSlice.util.updateQueryData("getBorrwedBooks", undefined, (draft) => {
                draft?.borrowedBooks?.unshift(data);
              })
            );
            dispatch(
              apiSlice.util.updateQueryData("findBorrowedBookByUserId", arg?.borrowerId, (draft) => {
                draft?.borrowedBooks?.unshift(data);
              })
            );
            dispatch(
              noticeApi.endpoints.addNotification.initiate({
                title: "Borrow Book",
                user: "admin",
                message: `${arg?.borrowerName} borrowed a book`,
              })
            );
          }
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),

    returnBorrowedBook: builder.mutation({
      query: (data) => ({
        url: `/borrowedBook/returnBook`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;

          // update book cache
          if (result?.data?.status === "success") {
            dispatch(
              apiSlice.util.updateQueryData("getBorrwedBooks", undefined, (draft) => {
                const borrowedBook = draft?.borrowedBooks?.find((d) => d?._id === arg?.id);
                borrowedBook.status = "returned";
                borrowedBook.returnDate = new Date();
              })
            );
            dispatch(
              apiSlice.util.updateQueryData("findBorrowedBookByUserId", arg?.borrowerId, (draft) => {
                const borrowedBook = draft?.borrowedBooks?.find((d) => d?._id === arg?.id);
                borrowedBook.status = "returned";
                borrowedBook.returnDate = new Date();
              })
            );
          }
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
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
