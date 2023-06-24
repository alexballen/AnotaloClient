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
    addNote: (state, action) => {
      return {
        ...state,
        allNotes: [...state.allNotes, action.payload],
      };
    },
    deleteNote: (state, action) => {
      const noteId = action.payload;
      state.allNotes = state.allNotes.filter((note) => note.id !== noteId);
    },
    patchNote: (state, action) => {
      const updatedNote = action.payload;
      console.log(updatedNote);
      state.allNotes = state.allNotes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      );
    },
  },
});

export const { allDbNotes, addNote, deleteNote, patchNote } =
  notesSlice.actions;

export default notesSlice.reducer;
