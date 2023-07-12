import axios from "axios";
import {
  getAllDbNotes,
  createNoteInDb,
  deleteNoteInDb,
  editNoteInDb,
} from "../reducers/notesSlice";

const baseURL = "http://localhost:3001";

export const getDbNotes = (userEmail) => async (dispatch) => {
  try {
    const getNotes = await axios.post(`${baseURL}/notes`, userEmail);
    dispatch(getAllDbNotes(getNotes.data));
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.error);
    } else {
      console.log(error.message);
    }
  }
};

export const postCreateNote = (userId, dataNewNote) => async (dispatch) => {
  console.log(dataNewNote);
  try {
    const createNote = await axios.post(
      `${baseURL}/notes/${userId}`,
      dataNewNote
    );
    dispatch(createNoteInDb(createNote.data));
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.error);
    } else {
      console.log(error.message);
    }
  }
};

export const deleteNote = (noteId) => async (dispatch) => {
  try {
    await axios.delete(`${baseURL}/notes/${noteId}`);
    dispatch(deleteNoteInDb(noteId));
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.error);
    } else {
      console.log(error.message);
    }
  }
};

export const patchEditNote = (noteId, dataNewNote) => async (dispatch) => {
  try {
    if (Object.keys(dataNewNote.id).length) {
      const editNote = await axios.patch(
        `${baseURL}/notes/${noteId}`,
        dataNewNote
      );
      dispatch(editNoteInDb(editNote.data.data));
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.error);
    } else {
      console.log(error.message);
    }
  }
};
