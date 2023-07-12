import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateToken } from "../redux/actions/users";
import { postCreateNote, getDbNotes } from "../redux/actions/notes";
import { AiOutlineCheckCircle, AiOutlineClear } from "react-icons/ai";
import Swal from "sweetalert2";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import s from "./AddNote.module.css";

const AddNote = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.token);
  const { decodedToken } = useSelector((state) => state.decodedToken);

  const textareaRef = useRef(null);
  const [rows, setRows] = useState(1);

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

  const [note, setNote] = useState({
    title: "",
    description: "",
    importance: "",
    reminder: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "title" || name === "description") && !note.importance) {
      setNote((prevNote) => ({
        ...prevNote,
        [name]: value,
        importance: "medium",
      }));
    } else {
      setNote((prevNote) => ({ ...prevNote, [name]: value }));
    }
  };

  useEffect(() => {
    const handleLinkClick = (event) => {
      event.preventDefault();

      if (note.title.length > 0 || note.description.length > 0) {
        handleCreateNote();
      }

      const path = event.target.getAttribute("href");
      navigate(path);
    };

    const links = document.querySelectorAll("a");

    links.forEach((link) => {
      link.addEventListener("click", handleLinkClick);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleLinkClick);
      });
    };
  }, [navigate, note]);

  const handleCreateNote = () => {
    if (note.title.length || note.description.length) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Tu nota ha sido creada",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        if (note.title || note.description) {
          let updatedNote = { ...note };
          if (updatedNote.reminder) {
            updatedNote.reminder = updatedNote.reminder.toISOString();
          }

          if (!note.title && note.description) {
            const getPartOfText = note.description.split(" ");
            const getAndBindText = getPartOfText.slice(0, 4).join(" ");
            updatedNote.title = getAndBindText;
          }

          dispatch(postCreateNote(decodedToken.id, updatedNote));

          setNote({
            title: "",
            description: "",
            importance: "",
          });
        }
      }, 1500);
      navigate("/notes");
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Nota no puede estar vacia",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    const handlePopstate = () => {
      if (note.title.length > 0 || note.description.length > 0) {
        handleCreateNote();
      }
    };
    window.addEventListener("popstate", handlePopstate);
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [note]);

  const handleClean = (event) => {
    event.preventDefault();
    if (note.title.length || note.description.length) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Desea limpiar el contenido",
          text: "¡No podrás revertir esto!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "¡Sí, bórralo!",
          cancelButtonText: "¡No, cancela!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            setNote({
              title: "",
              description: "",
              importance: "",
            });

            const textarea = textareaRef.current;
            textarea.style.height = "auto";
            textarea.rows = 1;
            swalWithBootstrapButtons.fire(
              "¡Eliminado!",
              "El contenido de la nota ha sido eliminado.",
              "success"
            );
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
              "Cancelado",
              "Su informacion esta a salvo¡",
              "error"
            );
          }
        });
    } else {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Nota esta vacia, no hay nada que limpiar",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

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

  const today = dayjs();

  const handleDateTimeChange = (selectedDate) => {
    setNote((prevNote) => ({
      ...prevNote,
      reminder: selectedDate,
    }));
  };

  const isInCurrentMonth = (date) => date.get("month") === dayjs().get("month");

  return (
    <div>
      <main>
        <div className={s.container}>
          <section>
            <form>
              <div className={s.form_container}>
                <div className={s.title_description_container}>
                  <div>
                    <input
                      type="text"
                      placeholder="Titulo"
                      name="title"
                      value={note.title}
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
                      value={note.description}
                      onChange={handleChange}
                      rows={rows}
                      className={s.description}
                    />
                  </div>
                </div>
                <div className={s.importance_clean_add_note_container}>
                  <div className={s.importance_container}>
                    <select
                      type="text"
                      placeholder="Importancia"
                      name="importance"
                      value={note.importance}
                      onChange={handleChange}
                      className={s.importance}
                    >
                      <option value="">Importancia</option>
                      <option value="high">Alta</option>
                      <option value="medium">Media</option>
                      <option value="low">Baja</option>
                    </select>
                    <section>
                      <div className={s.clean_container}>
                        <AiOutlineClear
                          onClick={handleClean}
                          className={s.clean}
                        />
                      </div>
                    </section>
                  </div>
                  <div className={s.add_note_container}>
                    <AiOutlineCheckCircle
                      onClick={handleCreateNote}
                      className={s.add_note}
                    />
                  </div>
                </div>
              </div>
              <section>
                <div className={s.notification_container}>
                  <div className={s.DateTimePicker}>
                    <DateTimePicker
                      format="DD-MM-YYYY hh:mm a"
                      defaultValue={today}
                      shouldDisableMonth={isInCurrentMonth}
                      value={note.reminder}
                      onChange={handleDateTimeChange}
                      views={["year", "month", "day", "hours", "minutes"]}
                      openTo="month"
                    />
                  </div>
                </div>
              </section>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AddNote;
