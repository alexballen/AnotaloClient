import { createSlice } from "@reduxjs/toolkit";

export const popUpSlice = createSlice({
  name: "popup",
  initialState: {
    popUpClose: false,
  },
  reducers: {
    popUpClose: (state, action) => {
      state.popUpClose = action.payload;
    },
  },
});

export const { popUpClose } = popUpSlice.actions;

export default popUpSlice.reducer;
