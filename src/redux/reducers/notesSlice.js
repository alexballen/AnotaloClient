import { createSlice } from "@reduxjs/toolkit";

export const notesSlice = createSlice({
  name: "notes",
  initialState: {
    allNotes: [],
  },
  reducers: {
    allDbNotes: (state, action) => {
      state.allNotes = action.payload;
    },
  },
});

export const { allDbNotes } = notesSlice.actions;

export default notesSlice.reducer;
