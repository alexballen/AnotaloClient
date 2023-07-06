import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateToken } from "../redux/actions/users";
import { postCreateNote, getDbNotes } from "../redux/actions/notes";
import { AiOutlineCheckCircle, AiOutlineClear } from "react-icons/ai";
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

  const handleClean = (event) => {
    event.preventDefault();

    setNote({
      title: "",
      description: "",
      importance: "",
    });

    setTimeout(() => {
      alert("Se limpió la pantalla");
    }, 100);
  };

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
                      id="myTextarea"
                      type="text"
                      placeholder="Anotalo"
                      name="description"
                      value={note.description}
                      onChange={handleChange}
                      rows={note.description.split("\n").length}
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
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AddNote;
