import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { saveToken, validateToken } from "../redux/actions/users";
import { patchEditNote, getDbNotes } from "../redux/actions/notes";
import DeleteNote from "./DeleteNote";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import s from "./EditNote.module.css";

dayjs.extend(localizedFormat);

const EditNote = () => {
  const dispatch = useDispatch();
  const { noteId } = useParams();

  const { token } = useSelector((state) => state.token);
  const { decodedToken } = useSelector((state) => state.decodedToken);
  const { allNotes } = useSelector((state) => state.allNotes);

  const textareaRef = useRef(null);
  const textTitleRef = useRef(null);

  const [rows, setRows] = useState(1);

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
    if (noteId) {
      if (Object.keys(allNotes).length > 0) {
        const getNote = allNotes.find((note) => note.id === noteId);

        if (getNote) {
          const fecha = new Date(getNote.reminder);

          setEditNote((prevNote) => ({
            ...prevNote,
            reminder: fecha,
          }));

          setEditNote({
            id: getNote.id,
            title: getNote.title,
            description: getNote.description,
            importance: getNote.importance,
            reminder: getNote.reminder
              ? new Date(getNote.reminder)
              : new Date(getNote.reminder),
          });
        }
      }
    }
  }, [allNotes, noteId]);

  const [editNote, setEditNote] = useState({
    id: "",
    title: "",
    description: "",
    importance: "",
    reminder: null,
  });

  const initialReminder = editNote.reminder || new Date();

  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (name, value) => {
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

  useEffect(() => {
    if (editNote.reminder !== initialReminder) {
      setIsDirty(true);
    }
  }, [editNote.reminder, initialReminder]);

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
    setRows(textarea.rows);
  };

  useEffect(() => {
    const textarea = textareaRef.current;
    const textTitle = textTitleRef.current;
    textarea.addEventListener("focus", handleTextareaInput);
    textTitle.addEventListener("focus", handleTextareaInput);
    return () => {
      textarea.removeEventListener("focus", handleTextareaInput);
      textTitle.addEventListener("focus", handleTextareaInput);
    };
  }, []);

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
                      ref={textTitleRef}
                      type="text"
                      placeholder="Titulo"
                      name="title"
                      defaultValue={editNote?.title}
                      onChange={(e) => handleChange("title", e.target.value)}
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
                      onChange={(e) =>
                        handleChange("description", e.target.value)
                      }
                      rows={rows}
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
                        onChange={(e) =>
                          handleChange("importance", e.target.value)
                        }
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
          <section>
            <div className={s.notification_container}>
              <div className={s.DateTimePicker}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    name="reminder"
                    onChange={(newValue) => handleChange("reminder", newValue)}
                    value={editNote.reminder}
                    views={["year", "month", "day", "hours", "minutes"]}
                    openTo="month"
                  />
                </LocalizationProvider>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default EditNote;
