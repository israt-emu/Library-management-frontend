import { io } from "socket.io-client";
import { apiSlice } from "../api/apiSlice";

export const socket = io("http://localhost:8000/", {
  reconnectionDelay: 1000,
  reconnection: true,
  reconnectionAttempts: 10,
  transports: ["websocket"],
  agent: false,
  upgrade: false,
  rejectUnauthorized: false,
});

export const noticeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotices: builder.query({
      query: () => ({
        url: `/notice/getAllNotice`,
        method: "GET",
        // body: data,
      }),
    }),

    getNoticeDetails: builder.query({
      query: ({ id }) => ({
        url: `/notice/getSingleNotice/${id}`,
        method: "GET",
        // body: data,
      }),
    }),

    addNotice: builder.mutation({
      query: (data) => ({
        url: `/notice/addNotice`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const data = result?.data?.notice;

          // update notice cache
          if (result?.data?.status === "success") {
            dispatch(
              apiSlice.util.updateQueryData(
                "getNotices",
                undefined,
                (draft) => {
                  draft?.notice?.unshift(data);
                }
              )
            );
          }
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),

    updateNotice: builder.mutation({
      query: ({ id, data }) => ({
        url: `/notice/editNotice/${id}`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const updatedNotice = result?.data?.notice;
          // update notice cache
          if (result?.data?.status === "success") {
            dispatch(
              apiSlice.util.updateQueryData(
                "getNotices",
                undefined,
                (draft) => {
                  const notice = draft?.notice?.find((d) => d?._id === arg?.id);
                  notice.title = updatedNotice?.title;
                  notice.category = updatedNotice?.category;
                  notice.description = updatedNotice?.description;
                }
              )
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
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          // update notice cache
          if (result?.data?.status === "success") {
            dispatch(
              apiSlice.util.updateQueryData(
                "getNotices",
                undefined,
                (draft) => {
                  const filterDraft = draft?.notice?.filter(
                    (d) => d?._id !== arg
                  );
                  return {
                    ...draft,
                    notice: filterDraft,
                  };
                }
              )
            );
          }
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),
    getNotifications: builder.query({
      query: () => ({
        url: `/notification/getAllNotification`,
        method: "GET",
        // body: data,
      }),
      async onQueryStarted() {
        try {
          socket.on("getNotification", (data) => {
            console.log(data);
          });
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
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {

        socket.emit("newNotification", {
          message: "Tushar Imran is connected",
          data: arg,
        });

        try {
          const result = await queryFulfilled;
          const data = result?.data?.notification;

          // update notification cache
          if (result?.data?.status === "success") {
            dispatch(
              apiSlice.util.updateQueryData(
                "getNotifications",
                undefined,
                (draft) => {
                  draft?.notification?.unshift(data);
                }
              )
            );
          }
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),
    updateNotificationStatus: builder.mutation({
      query: (data) => ({
        url: `/notification/changeNotificationStatus/${data}`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          // update notification cache
          if (result?.data?.status === "success") {
            dispatch(
              apiSlice.util.updateQueryData(
                "getNotifications",
                undefined,
                (draft) => {
                  const notification = draft?.notification?.find(
                    (d) => d?._id === arg
                  );
                  notification.read = true;
                }
              )
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

export const {
  useAddNoticeMutation,
  useGetNoticesQuery,
  useDeleteNoticeMutation,
  useGetNotificationsQuery,
  useUpdateNotificationStatusMutation,
  useAddNotificationMutation,
  useUpdateNoticeMutation,
  useGetNoticeDetailsQuery,
} = noticeApi;
