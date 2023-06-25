import { useState } from "react";
import { useDispatch } from "react-redux";
import { editNoteDb } from "../redux/actions/notes";
import DeleteNote from "./DeleteNote";
import s from "./AddNote.module.css";

const EditNote = ({ notes }) => {
  const dispatch = useDispatch();

  const [editedNote, setEditedNote] = useState({
    name: notes.name,
    description: notes.description,
    importance: notes.importance,
  });
  console.log(editedNote);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const idUser = notes.id;

  const handleEditNote = () => {
    dispatch(editNoteDb(idUser, editedNote));
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
                <button onClick={handleEditNote}>Guardar</button>
                <DeleteNote idNote={notes.id} />
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default EditNote;
