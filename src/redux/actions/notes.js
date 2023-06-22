import axios from "axios";
import { allDbNotes } from "../reducers/notesSlice";

const baseURL = "http://localhost:3001";

export const getDbNotes = (emailUser) => async (dispatch) => {
  try {
    const getNotes = await axios.post(`${baseURL}/notes`, emailUser);
    dispatch(allDbNotes(getNotes.data));
  } catch (error) {
    console.log(error);
  }
};

export const createNoteDb = (idUser, objCreateNote) => async (dispatch) => {
  try {
    const postNote = await axios.post(
      `${baseURL}/notes/${idUser}`,
      objCreateNote
    );
    console.log(postNote);
  } catch (error) {
    console.log(error);
  }
};

export const deleteNoteDb = (idNote) => async (dispatch) => {
  try {
    const deleteNote = await axios.delete(`${baseURL}/notes/${idNote}`);
    console.log(deleteNote);
  } catch (error) {
    console.log(error);
  }
};

export const editNoteDb = (idNote, dataNewNote) => async (dispatch) => {
  try {
    const editNote = await axios.patch(
      `${baseURL}/notes/${idNote}`,
      dataNewNote
    );
    console.log(editNote);
  } catch (error) {
    console.log(error);
  }
};
