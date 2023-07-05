import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateToken } from "../redux/actions/users";
import { postCreateNote, getDbNotes } from "../redux/actions/notes";
import s from "./AddNote.module.css";

const AddNote = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.token);
  const { decodedToken } = useSelector((state) => state.decodedToken);

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
  });
  console.log(note);

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
    if (note.title || note.description) {
      let updatedNote = { ...note };

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

      navigate("/notes");
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

  const textareaRef = useRef(null);

  const handleTextareaChange = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    handleTextareaChange();
  }, []);

  return (
    <div>
      <main>
        <div className={s.container}>
          <section>
            <form>
              <div className={s.form_container}>
                <div className={s.title_container}>
                  <input
                    type="text"
                    placeholder="Titulo"
                    name="title"
                    value={note.title}
                    onChange={handleChange}
                  />
                </div>
                <div className={s.description_container}>
                  <textarea
                    ref={textareaRef}
                    id="myTextarea"
                    type="text"
                    placeholder="Descripcion"
                    name="description"
                    value={note.description}
                    onChange={handleChange}
                    onInput={handleTextareaChange}
                  />
                </div>
                <div className={s.importance_container}>
                  <select
                    type="text"
                    placeholder="Importancia"
                    name="importance"
                    value={note.importance}
                    onChange={handleChange}
                  >
                    <option value="high">Alta</option>
                    <option value="medium">Media</option>
                    <option value="low">Baja</option>
                  </select>
                </div>
              </div>
              <div className={s.button_container}>
                <button type="button" onClick={handleCreateNote}>
                  Crear Nota
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AddNote;
