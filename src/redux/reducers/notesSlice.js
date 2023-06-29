import { createSlice } from "@reduxjs/toolkit";

export const notesSlice = createSlice({
  name: "notes",
  initialState: {
    allNotes: [],
  },
  reducers: {
    getAllDbNotes: (state, action) => {
      state.allNotes = action.payload;
    },
    createNoteInDb: (state, action) => {
      return {
        ...state,
        allNotes: [...state.allNotes, action.payload],
      };
    },
    deleteNoteInDb: (state, action) => {
      const noteId = action.payload;
      state.allNotes = state.allNotes.filter((note) => note.id !== noteId);
    },
    editNoteInDb: (state, action) => {
      const updatedNote = action.payload;
      state.allNotes = state.allNotes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      );
    },
  },
});

export const { getAllDbNotes, createNoteInDb, deleteNoteInDb, editNoteInDb } =
  notesSlice.actions;

export default notesSlice.reducer;
