import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { saveToken, validateToken } from "../redux/actions/users";
import { getDbNotes } from "../redux/actions/notes";
import PopUp from "./PopUp";
import AddNote from "./AddNote";
import EditNote from "./EditNote";
import DeleteNote from "./DeleteNote";
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

  return (
    <main>
      <div className={s.container}>
        <section>
          <div>
            <h1>AddNote</h1>
            <main>
              <div className={s.container}>
                <section>
                  {/* <PopUp
                    value={{ idUser }}
                    Component={AddNote}
                    title={"Crear Nota"}
                  /> */}
                  <Link to="/addnote">Add Note</Link>
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
              <section>
                <div>
                  <DeleteNote idNote={notes.id} />
                </div>
              </section>
              <section>
                {/* <PopUp
                  value={{ notes }}
                  Component={EditNote}
                  title={"Editar Nota"}
                /> */}
                <Link to={"/editnote/" + notes.id}>Edit Note</Link>
              </section>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Notes;
