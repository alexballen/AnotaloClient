import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { saveToken, validateToken } from "../redux/actions/users";
import { patchEditNote, getDbNotes } from "../redux/actions/notes";
import DeleteNote from "./DeleteNote";
import s from "./AddNote.module.css";

const EditNote = () => {
  const dispatch = useDispatch();
  const { noteId } = useParams();

  const { token } = useSelector((state) => state.token);
  const { decodedToken } = useSelector((state) => state.decodedToken);
  const { allNotes } = useSelector((state) => state.allNotes);

  useEffect(() => {
    dispatch(saveToken());
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(token).length) {
      const tokenData = {
        token,
      };
      dispatch(validateToken(tokenData));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (decodedToken.email) {
      const userEmail = {
        email: decodedToken.email,
      };
      dispatch(getDbNotes(userEmail));
    }
  }, [dispatch, decodedToken]);

  useEffect(() => {
    if (Object.keys(allNotes).length > 0) {
      const getNote = allNotes.find((note) => note.id === noteId);
      setEditNote({
        id: getNote.id,
        title: getNote.title,
        description: getNote.description,
        importance: getNote.importance,
      });
    }
  }, [allNotes]);

  const [editNote, setEditNote] = useState({
    id: "",
    title: "",
    description: "",
    importance: "",
  });

  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditNote((prevNote) => ({ ...prevNote, [name]: value }));
    setIsDirty(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const userId = editNote?.id;

  const handleEditNote = () => {
    dispatch(patchEditNote(userId, editNote));
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
                    name="title"
                    value={editNote?.title}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Descripcion"
                    name="description"
                    value={editNote?.description}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Importancia"
                    name="importance"
                    value={editNote?.importance}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <DeleteNote noteId={editNote?.id} />
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default EditNote;
