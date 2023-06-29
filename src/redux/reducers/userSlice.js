import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    allUsers: [],
  },
  reducers: {
    getAllDbUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    createUserInDb: (state, action) => {
      return {
        ...state,
        allUsers: [...state.allUsers, action.payload],
      };
    },
  },
});

export const { getAllDbUsers, createUserInDb } = userSlice.actions;

export default userSlice.reducer;
