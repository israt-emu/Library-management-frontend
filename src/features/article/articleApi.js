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
    deleteArticle: builder.mutation({
      query: (id) => ({
        url: `/article/deleteArticle/${id}`,
        method: "DELETE",
        // body: data,
      }),
    }),

    updateArticle: builder.mutation({
      query: ({id, data}) => ({
        url: `/article/editArticle/${id}`,
        method: "POST",
        body: data,
      }),
    }),

    getLatestArticles: builder.query({
      query: (data) => ({
        url: `/article/latestArticles`,
        method: "GET",
        // body: data,
      }),
    }),
    getPopularArticles: builder.query({
      query: (data) => ({
        url: `/article/popularArticles`,
        method: "GET",
        // body: data,
      }),
    }),
  }),
});

export const {useAddArticleMutation, useGetArticlesQuery, useGetArticleDetailsQuery, useGetLatestArticlesQuery, useGetPopularArticlesQuery, useDeleteArticleMutation, useUpdateArticleMutation} = articleApi;
