import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    allUsers: [],
    token: {},
    decoded: {},
  },
  reducers: {
    allDbUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    addDbUser: (state, action) => {
      return {
        ...state,
        allUsers: [...state.allUsers, action.payload],
      };
    },
    authToken: (state, action) => {
      state.token = action.payload;
    },
    decodedToken: (state, action) => {
      state.decoded = action.payload;
    },
  },
});

export const { allDbUsers, addDbUser, authToken, decodedToken } =
  userSlice.actions;

export default userSlice.reducer;
