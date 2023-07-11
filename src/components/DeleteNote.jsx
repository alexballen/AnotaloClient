import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteNote } from "../redux/actions/notes";
import { FaRegTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import s from "./DeleteNote.module.css";

const DeleteNote = ({ noteId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteNote = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Desea eliminar la nota",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "¡Sí, Eliminala!",
        cancelButtonText: "¡No, cancela!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          /* navigate("/notes"); */
          dispatch(deleteNote(noteId));
          swalWithBootstrapButtons
            .fire("¡Eliminada!", "La nota ha sido eliminada.", "success")
            .then(() => {
              navigate("/notes");
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Cancelado",
            "Su nota esta a salvo¡",
            "error"
          );
        }
      });
  };

  return (
    <div className={s.container}>
      <FaRegTrashCan className={s.delete} onClick={handleDeleteNote} />
    </div>
  );
};

export default DeleteNote;
