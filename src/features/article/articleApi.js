import {apiSlice} from "../api/apiSlice";

export const articleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: () => ({
        url: `/article/getAllArticle`,
        method: "GET",
       
      }),
    }),
    getArticleDetails: builder.query({
      query: ({id, edit}) => ({
        url: `/article/getSingleArticle/${id}`,
        method: "POST",
        body: {edit},
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;

          // update article cache
          if (result?.data?.status === "success" && !arg?.edit) {
            dispatch(
              apiSlice.util.updateQueryData("getArticles", undefined, (draft) => {
                const article = draft?.article?.find((d) => d?._id === arg?.id);
                article.views = article?.views + 1;
              })
            );
            dispatch(
              apiSlice.util.updateQueryData("getLatestArticles", undefined, (draft) => {
                const article = draft?.articles?.find((d) => d?._id === arg?.id);
                article.views = article?.views + 1;
              })
            );
            dispatch(
              apiSlice.util.updateQueryData("getPopularArticles", undefined, (draft) => {
                const article = draft?.articles?.find((d) => d?._id === arg?.id);
                article.views = article?.views + 1;
              })
            );
          }
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),
    addArticle: builder.mutation({
      query: (data) => ({
        url: `/article/addArticle`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;
          const data = result?.data?.article;

          // update article cache
          if (result?.data?.status === "success") {
            dispatch(
              apiSlice.util.updateQueryData("getArticles", undefined, (draft) => {
                draft?.article?.unshift(data);
              })
            );
            dispatch(
              apiSlice.util.updateQueryData("getLatestArticles", undefined, (draft) => {
                draft?.articles?.unshift(data);
              })
            );
          }
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),
    deleteArticle: builder.mutation({
      query: (id) => ({
        url: `/article/deleteArticle/${id}`,
        method: "DELETE",
        
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;

          // update article cache
          if (result?.data?.status === "success") {
            dispatch(
              apiSlice.util.updateQueryData("getArticles", undefined, (draft) => {
                const filterDraft = draft?.article?.filter((d) => d?._id !== arg);
                return {
                  ...draft,
                  article: filterDraft,
                };
              })
            );
            dispatch(
              apiSlice.util.updateQueryData("getLatestArticles", undefined, (draft) => {
                const filterDraft = draft?.articles?.filter((d) => d?._id !== arg);
                return {
                  ...draft,
                  articles: filterDraft,
                };
              })
            );
            dispatch(
              apiSlice.util.updateQueryData("getPopularArticles", undefined, (draft) => {
                const filterDraft = draft?.articles?.filter((d) => d?._id !== arg);
                return {
                  ...draft,
                  articles: filterDraft,
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

    updateArticle: builder.mutation({
      query: ({id, data}) => ({
        url: `/article/editArticle/${id}`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;
          console.log(result);
          const updatedarticle = result?.data?.article;
          // update article cache
          if (result?.data?.status === "success") {
            dispatch(
              apiSlice.util.updateQueryData("getArticles", undefined, (draft) => {
                const article = draft?.article?.find((d) => d?._id === arg?.id);
                article.title = updatedarticle?.title;
                article.authorName = updatedarticle?.authorName;
                article.category = updatedarticle?.category;
                article.description = updatedarticle?.description;
                article.image = updatedarticle?.image;
              })
            );
            dispatch(
              apiSlice.util.updateQueryData("getLatestArticles", undefined, (draft) => {
                const article = draft?.articles?.find((d) => d?._id === arg?.id);
                article.title = updatedarticle?.title;
                article.authorName = updatedarticle?.authorName;
                article.category = updatedarticle?.category;
                article.description = updatedarticle?.description;
                article.image = updatedarticle?.image;
              })
            );
            dispatch(
              apiSlice.util.updateQueryData("getPopularArticles", undefined, (draft) => {
                const article = draft?.articles?.find((d) => d?._id === arg?.id);
                article.title = updatedarticle?.title;
                article.authorName = updatedarticle?.authorName;
                article.category = updatedarticle?.category;
                article.description = updatedarticle?.description;
                article.image = updatedarticle?.image;
              })
            );
          }
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),

    getLatestArticles: builder.query({
      query: () => ({
        url: `/article/latestArticles`,
        method: "GET",
      }),
    }),
    getPopularArticles: builder.query({
      query: () => ({
        url: `/article/popularArticles`,
        method: "GET",
      }),
    }),
  }),
});

export const {useAddArticleMutation, useGetArticlesQuery, useGetArticleDetailsQuery, useGetLatestArticlesQuery, useGetPopularArticlesQuery, useDeleteArticleMutation, useUpdateArticleMutation} = articleApi;
