import {apiSlice} from "../api/apiSlice";

export const articleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: (data) => ({
        url: `/article/getAllArticle`,
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
    addArticle: builder.mutation({
      query: (data) => ({
        url: `/article/addArticle`,
        method: "POST",
        body: data,
      }),
    }),

  }),
});

export const {useAddArticleMutation,useGetArticlesQuery} = articleApi;
