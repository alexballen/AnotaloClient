import { configureStore } from "@reduxjs/toolkit";
import allUsers from "./reducers/userSlice.js";
import token from "./reducers/userSlice.js";

export const store = configureStore({
  reducer: {
    allUsers,
    token,
  },
});
