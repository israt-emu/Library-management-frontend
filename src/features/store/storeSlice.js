import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  storeData: {
    stores: [],
    isLoading: false,
    isError: false,
    error: "",
  },
  store: {},
};
export const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    setStoreInRedux: (state, action) => {
      state.store = action?.payload;
    },
    loadingStores: (state) => {
      state.storeData.isLoading = true;
      state.storeData.isError = false;
      state.storeData.error = "";
    },
    settingStores: (state, action) => {
      state.storeData.stores = action.payload;
      state.storeData.isLoading = false;
      state.storeData.isError = false;
      state.storeData.error = "";
    },
    settingStoreError: (state, action) => {
      state.storeData.stores = [];
      state.storeData.isLoading = false;
      state.storeData.isError = true;
      state.storeData.error = action.payload;
    },
  },
});

export const {setStoreInRedux,settingStoreError,settingStores,loadingStores} = storeSlice.actions;

export default storeSlice.reducer;
