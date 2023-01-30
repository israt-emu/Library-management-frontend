import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  themeMode: "light",
};
export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    themeChange: (state, action) => {
      state.themeMode = action.payload;
    },
  },
});

export const {themeChange} = themeSlice.actions;
export default themeSlice.reducer;
