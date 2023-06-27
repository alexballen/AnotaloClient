import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteNoteDb } from "../redux/actions/notes";

const DeleteNote = ({ idNote }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteNote = () => {
    navigate("/notes");
    dispatch(deleteNoteDb(idNote));
  };

  return (
    <div>
      <button onClick={handleDeleteNote}>Elimina Nota</button>
    </div>
  );
};

export default DeleteNote;
