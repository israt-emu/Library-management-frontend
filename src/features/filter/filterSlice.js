import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  searchText: "",
  path: "/dashboard/bookmarks",
};
export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    searched: (state, action) => {
      state.searchText = action.payload;
    },

    pathChange: (state, action) => {
      state.path = action.payload;
    },
    resetSearch: (state) => {
      state.searchText = "";
    },
  },
});

export const {searched, pathChange, resetSearch} = filterSlice.actions;
export default filterSlice.reducer;
