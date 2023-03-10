import {apiSlice} from "../api/apiSlice";
import {getUpdatedUser, userLoggedIn} from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/user/authenticateUser",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;
          localStorage.setItem(
            "auth",
            JSON.stringify({
              accessToken: result.data.token,
              user: result.data.user,
            })
          );
          dispatch(
            userLoggedIn({
              accessToken: result.data.token,
              user: result.data.user,
            })
          );
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),
    signUp: builder.mutation({
      query: (data) => ({
        url: "/user/addUser",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;
          const data = result?.data?.user;
          if (result?.data?.status === "success") {
            dispatch(
              apiSlice.util.updateQueryData("getAllUsers", undefined, (draft) => {
                draft?.users?.unshift(data);
              })
            );
          }
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),
    updateUser: builder.mutation({
      query: ({email, data}) => ({
        url: `/user/updateUser/${email}`,
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;
          console.log(result);
          const auth = JSON.parse(localStorage.getItem("auth"));
          if (result?.data?.status == "success") {
            localStorage.setItem(
              "auth",
              JSON.stringify({
                ...auth,
                user: result?.data?.user,
              })
            );
            dispatch(dispatch(getUpdatedUser(result?.data?.user)));
          }
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),
    getAllUsers: builder.query({
      query: () => ({
        url: "/user/allUsers",
        method: "GET",
      }),
    }),
    getFilteredUsers: builder.query({
      query: (data) => ({
        url: "/user/filteredUsers",
        method: "POST",
        body: data,
      }),
    }),
    updateStatus: builder.mutation({
      query: (data) => ({
        url: "/user/statusUpdate",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;
          // update user cache
          if (result?.data?.status === "success") {
            dispatch(
              apiSlice.util.updateQueryData("getAllUsers", undefined, (draft) => {
                const user = draft?.users?.find((d) => d?.email === arg?.email);
                if (arg?.status === "active") {
                  user.status = "block";
                } else {
                  user.status = "active";
                }
              })
            );
          }
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),
    deleteUser: builder.mutation({
      query: (email) => ({
        url: `/user/deleteUser/${email}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;

          // update user cache
          if (result?.data?.status === "success") {
            dispatch(
              apiSlice.util.updateQueryData("getAllUsers", undefined, (draft) => {
                const filterDraft = draft?.users?.filter((d) => d?.email !== arg);
                return {
                  ...draft,
                  users: filterDraft,
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
    changeAdmin: builder.mutation({
      query: (data) => ({
        url: "/user/changeAdmin",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, {queryFulfilled, dispatch}) {
        try {
          const result = await queryFulfilled;
          // update user cache
          if (result?.data?.status === "success") {
            dispatch(
              apiSlice.util.updateQueryData("getAllUsers", undefined, (draft) => {
                const user = draft?.users?.find((d) => d?.email === arg?.email);
                if (arg?.admin) {
                  user.admin = false;
                } else {
                  user.admin = true;
                }
              })
            );
          }
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),
    getSingleUser: builder.query({
      query: (email) => ({
        url: `/user/getSingleUser/${email}`,
        method: "GET",
      }),
    }),
  }),
});

export const {useSignUpMutation, useLoginMutation, useGetAllUsersQuery, useDeleteUserMutation, useUpdateStatusMutation, useChangeAdminMutation, useGetFilteredUsersQuery, useUpdateUserMutation, useGetSingleUserQuery} = authApi;
