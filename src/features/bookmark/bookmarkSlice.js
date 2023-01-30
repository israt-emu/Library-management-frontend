import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  bookmarkData: {
    bookmarks: [],
    isLoading: false,
    isError: false,
    error: "",
  },
  bookmarkView: "grid",
  editedBookmark: {},
};
export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    bookmarkViewChange: (state, action) => {
      state.bookmarkView = action?.payload;
    },
    editedData: (state, action) => {
      state.editedBookmark = action?.payload;
    },
    clearEditedData: (state) => {
      state.editedBookmark = {};
    },
    loadingBookmarks: (state) => {
      state.bookmarkData.isLoading = true;
      state.bookmarkData.isError = false;
      state.bookmarkData.error = "";
    },
    settingBookmarks: (state, action) => {
      state.bookmarkData.bookmarks = action.payload;
      state.bookmarkData.isLoading = false;
      state.bookmarkData.isError = false;
      state.bookmarkData.error = "";
    },
    settingError: (state, action) => {
      state.bookmarkData.bookmarks = [];
      state.bookmarkData.isLoading = false;
      state.bookmarkData.isError = true;
      state.bookmarkData.error = action.payload;
    },
  },
});

export const {bookmarkViewChange, editedData, clearEditedData, settingBookmarks, settingError, loadingBookmarks} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
