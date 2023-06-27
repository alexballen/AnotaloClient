import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { saveToken, validateToken } from "../redux/actions/users";
import { editNoteDb, getDbNotes } from "../redux/actions/notes";
import DeleteNote from "./DeleteNote";
import s from "./AddNote.module.css";

const EditNote = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

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

  useEffect(() => {
    if (Object.keys(allNotes).length > 0) {
      const searchNote = allNotes.find((note) => note.id === id);
      setEditedNote({
        id: searchNote.id,
        name: searchNote.name,
        description: searchNote.description,
        importance: searchNote.importance,
      });
    }
  }, [allNotes]);

  const [editedNote, setEditedNote] = useState({
    id: "",
    name: "",
    description: "",
    importance: "",
  });

  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedNote((prevNote) => ({ ...prevNote, [name]: value }));
    setIsDirty(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const idUser = editedNote?.id;

  const handleEditNote = () => {
    dispatch(editNoteDb(idUser, editedNote));
  };

  useEffect(() => {
    if (isDirty) {
      handleEditNote();
      setIsDirty(false);
    }
  }, [isDirty]);

  return (
    <div>
      <main>
        <div className={s.container}>
          <section>
            <form onSubmit={handleSubmit}>
              <div className={s.form_container}>
                <div>
                  <input
                    type="text"
                    placeholder="Titulo"
                    name="name"
                    value={editedNote.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Descripcion"
                    name="description"
                    value={editedNote.description}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Importancia"
                    name="importance"
                    value={editedNote.importance}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <DeleteNote idNote={editedNote?.id} />
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default EditNote;
