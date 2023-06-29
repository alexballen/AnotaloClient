import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: {},
    decodedToken: {},
  },
  reducers: {
    getAuthToken: (state, action) => {
      state.token = action.payload;
    },
    setDecodedToken: (state, action) => {
      state.decodedToken = action.payload;
    },
  },
});

export const { getAuthToken, setDecodedToken } = tokenSlice.actions;
export default tokenSlice.reducer;
