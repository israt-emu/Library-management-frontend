import {apiSlice} from "../api/apiSlice";

export const noticeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotices: builder.query({
      query: () => ({
        url: `/notice/getAllNotice`,
        method: "GET",
        // body: data,
      }),
    }),
    getNotifications: builder.query({
      query: () => ({
        url: `/notification/getAllNotification`,
        method: "GET",
        // body: data,
      }),
    }),
    getNoticeDetails: builder.query({
      query: ({id}) => ({
        url: `/notice/getSingleNotice/${id}`,
        method: "GET",
        // body: data,
      }),
    }),
    updateNotificationStatus: builder.mutation({
      query: (data) => ({
        url: `/notification/changeNotificationStatus/${data}`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;
          // update book cache
          if (result?.data?.status === "success") {
            dispatch(
              apiSlice.util.updateQueryData("getNotifications", undefined, (draft) => {
                const notification = draft?.notification?.find((d) => d?._id === arg);
                notification.read = true;
              })
            );
          }
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),
    addNotice: builder.mutation({
      query: (data) => ({
        url: `/notice/addNotice`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;
          const data = result?.data?.notice;

          // update book cache
          if (result?.data?.status === "success") {
            dispatch(
              apiSlice.util.updateQueryData("getNotices", undefined, (draft) => {
                draft?.notice?.unshift(data);
              })
            );
          }
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),

    updateNotice: builder.mutation({
      query: ({id, data}) => ({
        url: `/notice/editNotice/${id}`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;
          const updatedNotice = result?.data?.notice;
          // update book cache
          if (result?.data?.status === "success") {
            dispatch(
              apiSlice.util.updateQueryData("getNotices", undefined, (draft) => {
                const notice = draft?.notice?.find((d) => d?._id === arg?.id);
                notice.title = updatedNotice?.title;
                notice.category = updatedNotice?.category;
                notice.description = updatedNotice?.description;
              })
            );
          }
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),

    addNotification: builder.mutation({
      query: (data) => ({
        url: `/notification/addNotification`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;
          const data = result?.data?.notification;

          // update book cache
          if (result?.data?.status === "success") {
            dispatch(
              apiSlice.util.updateQueryData("getNotifications", undefined, (draft) => {
                draft?.notification?.unshift(data);
              })
            );
          }
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),
    deleteNotice: builder.mutation({
      query: (data) => ({
        url: `/notice/deleteNotice/${data}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;

          // update book cache
          if (result?.data?.status === "success") {
            dispatch(
              apiSlice.util.updateQueryData("getNotices", undefined, (draft) => {
                const filterDraft = draft?.notice?.filter((d) => d?._id !== arg);
                return {
                  ...draft,
                  notice: filterDraft,
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
  }),
});

export const {useAddNoticeMutation, useGetNoticesQuery, useDeleteNoticeMutation, useGetNotificationsQuery, useUpdateNotificationStatusMutation, useAddNotificationMutation, useUpdateNoticeMutation, useGetNoticeDetailsQuery} = noticeApi;
