import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateToken } from "../redux/actions/users";
import { createNoteDb } from "../redux/actions/notes";
import s from "./AddNote.module.css";

const AddNote = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.token);
  const { decoded } = useSelector((state) => state.decoded);

  useEffect(() => {
    if (Object.keys(token).length) {
      const objToken = {
        token,
      };
      dispatch(validateToken(objToken));
    }
  }, [dispatch, token]);

  const [note, setNote] = useState({
    name: "",
    description: "",
    importance: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "name" || name === "description") && !note.importance) {
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

      if (note.name.length > 0 || note.description.length > 0) {
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
    if (note.name || note.description) {
      dispatch(createNoteDb(decoded.id, note));
    }
    setNote({
      name: "",
      description: "",
      importance: "",
    });
  };

  useEffect(() => {
    const handlePopstate = () => {
      if (note.name.length > 0 || note.description.length > 0) {
        handleCreateNote();
      }
    };
    window.addEventListener("popstate", handlePopstate);
    return () => {
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [note]);

  return (
    <div>
      <main>
        <div className={s.container}>
          <section>
            <form>
              <div className={s.form_container}>
                <div>
                  <input
                    type="text"
                    placeholder="Titulo"
                    name="name"
                    value={note.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Descripcion"
                    name="description"
                    value={note.description}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Importancia"
                    name="importance"
                    value={note.importance}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <button type="button" onClick={handleCreateNote}>
                  Crear Nota Nueva
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
