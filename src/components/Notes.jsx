import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveToken, validateToken } from "../redux/actions/users";
import {
  getDbNotes,
  createNoteDb,
  deleteNoteDb,
  editNoteDb,
} from "../redux/actions/notes";
import s from "./Notes.module.css";

const Notes = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);

  const { decoded } = useSelector((state) => state.decoded);

  const { allNotes } = useSelector((state) => state.allNotes);
  const objNotes = allNotes[0]?.notes;

  useEffect(() => {
    dispatch(saveToken());
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(token).length) {
      const objToken = {
        token,
      };
      dispatch(validateToken(objToken));
    }
  }, [token]);

  useEffect(() => {
    if (decoded.email) {
      const searchNotesUser = {
        email: decoded.email,
      };
      dispatch(getDbNotes(searchNotesUser));
    }
  }, [dispatch, decoded]);

  const objCreateNote = {
    name: "Nota nueva 1",
    description: "Nota de prueba de envio de solicitud http",
    importance: "high",
  };

  const idUser = decoded.id;

  const handleCreateNote = () => {
    dispatch(createNoteDb(idUser, objCreateNote));
  };

  const handleDeleteNote = (idNote) => {
    dispatch(deleteNoteDb(idNote));
  };

  const objEditNote = {
    name: "Nota # 4",
    description: "Nota de Cumpleaños Josuha",
    importance: "medium",
  };

  const handleEditNote = (idNote) => {
    dispatch(editNoteDb(idNote, objEditNote));
  };

  return (
    <main>
      <div className={s.container}>
        <h1>Notes</h1>
        <div>
          <button onClick={handleCreateNote}>Crear Nota Nueva</button>
        </div>
        {objNotes?.map((notes, index) => {
          return (
            <div key={index}>
              <div>
                <p>ID: {notes.id}</p>
              </div>
              <div>
                <p>NAME: {notes.name}</p>
              </div>
              <div>
                <p>DESCRIPTION: {notes.description}</p>
              </div>
              <div>
                <p>IMPORTANCE: {notes.importance}</p>
              </div>
              <button onClick={() => handleDeleteNote(notes.id)}>Delete</button>
              <button onClick={() => handleEditNote(notes.id)}>
                Editar Nota
              </button>
              <hr />
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Notes;
