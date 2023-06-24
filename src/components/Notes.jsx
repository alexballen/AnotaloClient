import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveToken, validateToken } from "../redux/actions/users";
import { getDbNotes, deleteNoteDb } from "../redux/actions/notes";
import PopUp from "./PopUp";
import PopUpEdit from "./PopUpEdit";
import s from "./Notes.module.css";

const Notes = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.token);
  const { decoded } = useSelector((state) => state.decoded);
  const { allNotes } = useSelector((state) => state.allNotes);

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
  }, [dispatch, token]);

  useEffect(() => {
    if (decoded.email) {
      const searchNotesUser = {
        email: decoded.email,
      };
      dispatch(getDbNotes(searchNotesUser));
    }
  }, [dispatch, decoded]);

  const idUser = decoded.id;

  const handleDeleteNote = (idNote) => {
    dispatch(deleteNoteDb(idNote));
  };

  return (
    <main>
      <div className={s.container}>
        <section>
          <div>
            <h1>AddNote</h1>
            <main>
              <div className={s.container}>
                <section>
                  <PopUp idUser={idUser} />
                </section>
              </div>
            </main>
          </div>
        </section>
        {allNotes?.map((notes, index) => {
          return (
            <div key={index}>
              <div>
                <p>ID: {notes.id}</p>
              </div>
              <div>
                <p>NAME: {notes.name}</p>
              </div>
              <div className={s.description_container}>
                <p>DESCRIPTION: {notes.description}</p>
              </div>
              <div>
                <p>IMPORTANCE: {notes.importance}</p>
              </div>
              <button onClick={() => handleDeleteNote(notes.id)}>Delete</button>
              <section>
                <PopUpEdit note={notes} />
              </section>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Notes;
