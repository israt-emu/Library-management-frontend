import {apiSlice} from "../api/apiSlice";
import {noticeApi} from "../notice/noticeApi";

export const bookApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => ({
        url: `/book/getAllBooks`,
        method: "GET",
        // body: data,
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
    getSingleBookById: builder.query({
      query: ({id}) => ({
        url: `/book/getSingleBookById/${id}`,
        method: "GET",
        // body: data,
      }),
    }),
    updateBook: builder.mutation({
      query: ({id, data}) => ({
        url: `/book/editBook/${id}`,
        method: "POST",
        body: data?.bookData,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const id = arg?.data?.id;
          const result = await queryFulfilled;
          const updatedBook = result?.data?.book;
          // update book cache
          if (result?.data?.status === "success") {
            dispatch(
              apiSlice.util.updateQueryData("getBooks", undefined, (draft) => {
                const book = draft?.books?.find((d) => d?._id === arg?.id);
                book.name = updatedBook?.name;
                book.category = updatedBook?.category;
                book.status = updatedBook?.status;
                book.totalViews = updatedBook?.totalViews;
              })
            );
            dispatch(
              apiSlice.util.updateQueryData("getBookDetails", id, (draft) => {
                console.log(draft);
                // book.name = updatedBook?.name;
                // book.category = updatedBook?.category;
                // book.status = updatedBook?.status;
                // book.totalViews = updatedBook?.totalViews;
              })
            );
            dispatch(
              apiSlice.util.updateQueryData("getSingleBookById", arg?.id, (draft) => {
                console.log(draft);
                // book.name = updatedBook?.name;
                // book.category = updatedBook?.category;
                // book.status = updatedBook?.status;
                // book.totalViews = updatedBook?.totalViews;
              })
            );
          }
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),

    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/book/deleteBook/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;

          // update book cache
          if (result?.data?.status === "success") {
            dispatch(
              apiSlice.util.updateQueryData("getBooks", undefined, (draft) => {
                console.log(arg);
                const filterDraft = draft?.books?.filter((d) => d?._id !== arg);
                return {
                  ...draft,
                  books: filterDraft,
                };
              })
            );
          }
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),
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
          const data = result?.data?.book;

          // update book cache
          if (result?.data?.status === "success") {
            dispatch(
              apiSlice.util.updateQueryData("getBooks", undefined, (draft) => {
                draft?.books?.unshift(data);
              })
            );
            dispatch(
              noticeApi.endpoints.addNotification.initiate({
                title: "Add Book",
                user: "all",
                message: `A book titled ${arg?.name} is added`,
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
    getRequestedBooks: builder.query({
      query: () => ({
        url: `/requestedBook/getAllRequestedBooks`,
        method: "GET",
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
    addRequestedBook: builder.mutation({
      query: (data) => ({
        url: `requestedBook/addRequestedBook`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;
          const data = result?.data?.book;

          // update requested book cache
          if (result?.data?.status === "success") {
            dispatch(
              apiSlice.util.updateQueryData("getRequestedBooks", undefined, (draft) => {
                draft?.books?.unshift(data);
              })
            );
            dispatch(
              noticeApi.endpoints.addNotification.initiate({
                title: "Request Book",
                user: "admin",
                message: `A book titled ${arg?.name} is requested`,
              })
            );
          }
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),
    deleteRequestedBook: builder.mutation({
      query: (id) => ({
        url: `/requestedBook/deleteRequestedBook/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;

          // update requested book cache
          if (result?.data?.status === "success") {
            dispatch(
              apiSlice.util.updateQueryData("getRequestedBooks", undefined, (draft) => {
                console.log(arg);
                const filterDraft = draft?.books?.filter((d) => d?._id !== arg);
                return {
                  ...draft,
                  books: filterDraft,
                };
              })
            );
          }
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),
    getRequestedBookDetails: builder.query({
      query: ({id}) => ({
        url: `/requestedBook/getSingleRequestedBook/${id}`,
        method: "GET",
        // body: data,
      }),
    }),
    updateRequestCount: builder.mutation({
      query: (data) => ({
        url: `requestedBook/requesteCount`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;
          const updatedBook = result?.data?.updatedBook;
          // update requested book cache
          if (result?.data?.status === "success") {
            dispatch(
              apiSlice.util.updateQueryData("getRequestedBooks", undefined, (draft) => {
                const book = draft?.books?.find((d) => d?._id === arg?.id);
                book.requestCount = updatedBook?.requestCount;
              })
            );
          }
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),
    updateRequestedBook: builder.mutation({
      query: ({id, data}) => ({
        url: `/requestedBook/editRequestedBook/${id}`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;
          const updatedBook = result?.data?.book;
          // update requested book cache
          if (result?.data?.status === "success") {
            dispatch(
              apiSlice.util.updateQueryData("getRequestedBooks", undefined, (draft) => {
                const book = draft?.books?.find((d) => d?._id === arg?.id);
                book.name = updatedBook?.name;
                book.category = updatedBook?.category;
                book.status = updatedBook?.status;
                book.writer = updatedBook?.writer;
              })
            );
          }
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),
    getMonthCount: builder.query({
      query: () => ({
        url: `/month/getAllMonth/`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookDetailsQuery,
  useGetRequestedBooksQuery,
  useAddBookMutation,
  useGetFilteredBooksQuery,
  useGetFilteredRequestedBooksQuery,
  useGetTopBooksQuery,
  useGetTopRequestedBooksQuery,
  useAddRequestedBookMutation,
  useUpdateRequestCountMutation,
  useGetMonthCountQuery,
  useGetSearchedBooksQuery,
  useUpdateBookMutation,
  useUpdateRequestedBookMutation,
  useDeleteBookMutation,
  useDeleteRequestedBookMutation,
  useGetRequestedBookDetailsQuery,
  useGetSingleBookByIdQuery,
} = bookApi;
