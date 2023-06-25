import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createNoteDb } from "../redux/actions/notes";
import { closingPopUp } from "../redux/actions/popUp";
import s from "./AddNote.module.css";

const AddNote = ({ idUser }) => {
  const dispatch = useDispatch();

  const { popUpClose } = useSelector((state) => state.popUpClose);

  const [note, setNote] = useState({
    name: "",
    description: "",
    importance: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const handleCreateNote = () => {
    dispatch(createNoteDb(idUser, note));
    setNote({
      name: "",
      description: "",
      importance: "",
    });
    dispatch(closingPopUp(true));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
                <button onClick={handleCreateNote}>Crear Nota Nueva</button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AddNote;
