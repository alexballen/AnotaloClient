import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { saveToken, validateToken } from "../redux/actions/users";
import { patchEditNote, getDbNotes } from "../redux/actions/notes";
import DeleteNote from "./DeleteNote";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import s from "./EditNote.module.css";

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
        console.log(getNote);

        if (getNote) {
          setEditNote({
            id: getNote.id,
            title: getNote.title,
            description: getNote.description,
            importance: getNote.importance,
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

  const [value, setValue] = useState({});
  console.log(value);
  const today = dayjs();

  const isInCurrentMonth = (date) => date.get("month") === dayjs().get("month");

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
          <section>
            <div className={s.notification_container}>
              <div className={s.DateTimePicker}>
                <DateTimePicker
                  format="DD-MM-YYYY hh:mm a"
                  defaultValue={today}
                  shouldDisableMonth={isInCurrentMonth}
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                  views={["year", "month", "day", "hours", "minutes"]}
                  openTo="month"
                />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default EditNote;
