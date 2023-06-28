import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteNote } from "../redux/actions/notes";

const DeleteNote = ({ noteId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteNote = () => {
    navigate("/notes");
    dispatch(deleteNote(noteId));
  };

  return (
    <div>
      <button onClick={handleDeleteNote}>Eliminar Nota</button>
    </div>
  );
};

export default DeleteNote;
