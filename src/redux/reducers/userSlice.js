import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    allUsers: [],
    token: {},
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
  },
});

export const { allDbUsers, addDbUser, authToken } = userSlice.actions;

export default userSlice.reducer;
