import {apiSlice} from "../api/apiSlice";

export const bookmarkApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookmarks: builder.query({
      query: (data) => ({
        url: `/bookmark/bookmarks`,
        method: "POST",
        body: data,
      }),
    }),

    deleteBookmark: builder.mutation({
      query: ({id, userId}) => ({
        url: `/bookmark/deletebookmark/${id}`,
        method: "POST",
      }),
      async onQueryStarted({id, userId}, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;

          // update bookmark cache
          if (result?.data?.status === "success") {
            dispatch(
              apiSlice.util.updateQueryData("getBookmarks", {userId: userId}, (draft) => {
                const filterDraft = draft?.bookmarks?.filter((d) => d._id !== id);
                return {
                  ...draft,
                  bookmarks: filterDraft,
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
    addBookmark: builder.mutation({
      query: (data) => ({
        url: `bookmark/addBookmark`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;
          console.log(result);
          const data = result?.data?.bookmark;

          // update bookmark cache
          if (result?.data?.status === "success") {
            //updating groups
            dispatch(
              apiSlice.util.updateQueryData("getGroups", {state: "normal", userId: arg?.userId}, (draft) => {
                if (!draft?.groups?.includes(arg?.group)) {
                  draft?.groups?.push(arg?.group);
                }
              })
            );
            //updating bookmarks
            dispatch(
              apiSlice.util.updateQueryData("getBookmarks", {userId: arg?.userId}, (draft) => {
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
    updateBookmark: builder.mutation({
      query: ({id, data}) => ({
        url: `bookmark/updateBookmark/${id}`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted({id, data}, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;
          const updatedBookmark = result?.data?.bookmark;
          const {title, group, url} = updatedBookmark;

          // update bookmark cache
          if (result?.data?.status === "success") {
            dispatch(
              apiSlice.util.updateQueryData("getBookmarks", {userId: data?.userId}, (draft) => {
                const bookmark = draft?.bookmarks?.find((d) => d._id === id);
                const updatedDate = new Date().toISOString();
                bookmark.title = title;
                bookmark.url = url;
                bookmark.group = group;
                bookmark.updatedAt = updatedDate;
              })
            );
          }
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),
    updateBookmarkByState: builder.mutation({
      query: ({id, data, state}) => ({
        url: `bookmark/updateBookmark/${id}`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted({id, data, state}, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;
          const updatedBookmark = result?.data?.bookmark;
          // update bookmark cache
          if (result?.data?.status === "success") {
            //updating groups
            dispatch(
              apiSlice.util.updateQueryData("getGroups", {state: data?.state, userId: data?.userId}, (draft) => {
                if (!draft?.groups?.includes(data?.group)) {
                  draft?.groups?.push(data?.group);
                }
              })
            );

            // dispatch(
            //   apiSlice.util.updateQueryData("getGroups", {state: state, userId: data?.userId}, (draft) => {
            //     console.log(JSON.stringify(draft?.groups));
            //     dispatch(
            //       apiSlice.util.updateQueryData("getBookmarks", {userId: data?.userId}, (bookmarkDraft) => {
            //         const filterDraft = bookmarkDraft?.bookmarks?.filter((b) => b?.state === state && b?.group === data?.group);
            //         if (filterDraft?.length === 1) {
            //           // g?.group?.toLowerCase() !== data?.group?.toLowerCase()
            //           const filterGroup = draft?.groups?.filter((g) => g !== data?.group);
            //           return {
            //             ...draft,
            //             groups: filterGroup,
            //           };
            //         }
            //       })
            //     );
            //   })
            // );
            //updating draft data after state change
            dispatch(
              apiSlice.util.updateQueryData("getBookmarks", {userId: data?.userId}, (draft) => {
                // eslint-disable-next-line eqeqeq
                const bookmark = draft?.bookmarks?.find((b) => b._id === id);
                bookmark.state = data?.state;
              })
            );
          }
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),
    getGroups: builder.query({
      query: ({state, userId}) => ({
        url: `/bookmark/getBookmarksGroup?state=${state}&userId=${userId}`,
        method: "POST",
      }),
    }),
  }),
});

export const {useGetBookmarksQuery, useDeleteBookmarkMutation, useAddBookmarkMutation, useUpdateBookmarkMutation, useUpdateBookmarkByStateMutation, useGetGroupsQuery} = bookmarkApi;
