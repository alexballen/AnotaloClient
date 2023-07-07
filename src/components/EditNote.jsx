import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { saveToken, validateToken } from "../redux/actions/users";
import { patchEditNote, getDbNotes } from "../redux/actions/notes";
import DeleteNote from "./DeleteNote";
import s from "./EditNote.module.css";

const EditNote = () => {
  const dispatch = useDispatch();
  const { noteId } = useParams();

  const { token } = useSelector((state) => state.token);
  const { decodedToken } = useSelector((state) => state.decodedToken);
  const { allNotes } = useSelector((state) => state.allNotes);

  const textareaRef = useRef(null);
  const [rows, setRows] = useState(1);
  console.log(rows);
  const [initialRows, setInitialRows] = useState(1);
  console.log(initialRows);
  const [isEditing, setIsEditing] = useState(false);

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

      if (!isEditing) {
        handleTextareaInput();
      } else {
        const storedRows = localStorage.getItem("initialRows");
        if (storedRows) {
          setInitialRows(Number(storedRows));
        } else {
          setInitialRows(getNote.description.split("\n").length);
        }
      }
    }
  }, [allNotes, isEditing]);

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
    setIsEditing(false);
  };

  useEffect(() => {
    if (isDirty) {
      handleEditNote();
      setIsDirty(false);
    }
  }, [isDirty]);

  useEffect(() => {
    const textarea = textareaRef.current;
    textarea.addEventListener("input", handleTextareaInput);
    return () => {
      textarea.removeEventListener("input", handleTextareaInput);
    };
  }, []);

  const handleTextareaInput = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;

    if (!isEditing) {
      setRows(textarea.rows);
    } else {
      const currentRows = textarea.value.split("\n").length;
      setInitialRows(currentRows);
      localStorage.setItem("initialRows", currentRows);
    }
  };

  return (
    <div>
      <main>
        <div className={s.container}>
          <section>
            <form onSubmit={handleSubmit}>
              <div className={s.form_container}>
                <div className={s.title_description_importance}>
                  <div>
                    <input
                      type="text"
                      placeholder="Titulo"
                      name="title"
                      defaultValue={editNote?.title}
                      onChange={handleChange}
                      className={s.title}
                    />
                  </div>
                  <div>
                    <textarea
                      ref={textareaRef}
                      type="text"
                      placeholder="Anotalo"
                      name="description"
                      value={editNote?.description}
                      onChange={handleChange}
                      rows={isEditing ? initialRows : rows}
                      className={s.description}
                    />
                  </div>
                  <div className={s.importance_delete_container}>
                    <div className={s.importance_container}>
                      <select
                        type="text"
                        placeholder="Importancia"
                        name="importance"
                        value={editNote.importance}
                        onChange={handleChange}
                        className={s.importance}
                      >
                        <option value="">Importancia</option>
                        <option value="high">Alta</option>
                        <option value="medium">Media</option>
                        <option value="low">Baja</option>
                      </select>
                    </div>
                    <div className={s.delete_container}>
                      <DeleteNote className={s.delete} noteId={noteId} />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default EditNote;

/*  useEffect(() => {
   setRows(editNote.description.split("\n").length);
 }, [editNote.description]); */
