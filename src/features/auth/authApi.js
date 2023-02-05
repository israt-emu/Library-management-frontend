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
          console.log(result);
        } catch (err) {
          //nothing to do
          console.log(err);
        }
      },
    }),
    update: builder.mutation({
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
  }),
});

export const {useSignUpMutation, useLoginMutation, useUpdateMutation, useGetAllUsersQuery} = authApi;
