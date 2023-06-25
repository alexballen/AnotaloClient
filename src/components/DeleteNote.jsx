import { useDispatch } from "react-redux";
import { deleteNoteDb } from "../redux/actions/notes";

const DeleteNote = ({ idNote }) => {
  const dispatch = useDispatch();

  const handleDeleteNote = () => {
    dispatch(deleteNoteDb(idNote));
  };

  return (
    <div>
      <button onClick={handleDeleteNote}>Elimina Nota</button>
    </div>
  );
};

export default DeleteNote;
