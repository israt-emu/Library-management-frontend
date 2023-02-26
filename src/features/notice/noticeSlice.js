
import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  newNotification: false,
};
export const noticeSlice = createSlice({
  name: "notice",
  initialState,
  reducers: {
    newNotification: (state, action) => {
      state.newNotification = action.payload;
    },
  },
});
export const { newNotification } = noticeSlice.actions;

export default noticeSlice.reducer;
