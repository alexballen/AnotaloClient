import { configureStore } from "@reduxjs/toolkit";
import allUsers from "./reducers/userSlice.js";
import allNotes from "./reducers/notesSlice.js";
import token from "./reducers/tokenSlice.js";
import decodedToken from "./reducers/tokenSlice.js";
import popUpClose from "./reducers/popUpSlice.js";

export const store = configureStore({
  reducer: {
    allUsers,
    allNotes,
    token,
    decodedToken,
    popUpClose,
  },
});
