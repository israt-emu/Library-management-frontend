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
    getArticleDetails: builder.query({
      query: ({id}) => ({
        url: `/article/getSingleArticle/${id}`,
        method: "GET",
        // body: data,
      }),
    }),
    addArticle: builder.mutation({
      query: (data) => ({
        url: `/article/addArticle`,
        method: "POST",
        body: data,
      }),
    }),

  }),
});

export const {useAddArticleMutation,useGetArticlesQuery,useGetArticleDetailsQuery} = articleApi;
