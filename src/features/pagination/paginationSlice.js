import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  //   tablePagination: {
  //     limit: 2,
  //     currentPage: 1,
  //     totalPage: 0,
  //     buttonNum: 0,
  //   },
};
export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    // setTotalPage: (state, action) => {
    //   state.tablePagination.totalPage = action.payload;
    //   if (action.payload > 5) {
    //     state.tablePagination.buttonNum = 5;
    //   } else {
    //     state.tablePagination.buttonNum = action.payload;
    //   }
    // },
    // setCurrentPage: (state, action) => {
    //   state.tablePagination.currentPage = action.payload;
    // },
  },
});

export const {} = paginationSlice.actions;
export default paginationSlice.reducer;
