import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteNote } from "../redux/actions/notes";
import { FaRegTrashCan } from "react-icons/fa6";
import s from "./DeleteNote.module.css";

const DeleteNote = ({ noteId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteNote = () => {
    navigate("/notes");
    dispatch(deleteNote(noteId));
  };

  return (
    <div className={s.container}>
      <button className={s.button_container} onClick={handleDeleteNote}>
        <FaRegTrashCan />
      </button>
    </div>
  );
};

export default DeleteNote;
