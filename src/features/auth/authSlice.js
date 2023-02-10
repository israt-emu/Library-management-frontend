import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  accessToken: undefined,
  user: undefined,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
    },
    getUpdatedUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const {userLoggedIn, userLoggedOut, getUpdatedUser} = authSlice.actions;
export default authSlice.reducer;
