import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { saveToken, validateToken } from "../redux/actions/users";
import { getDbNotes } from "../redux/actions/notes";
import DeleteNote from "./DeleteNote";
import s from "./Notes.module.css";

const Notes = () => {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.token);
  const { decodedToken } = useSelector((state) => state.decodedToken);
  const { allNotes } = useSelector((state) => state.allNotes);

  useEffect(() => {
    dispatch(saveToken());
  }, [dispatch]);

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

  return (
    <main>
      <div className={s.container}>
        <section>
          <div>
            <main>
              <div className={s.container}>
                <section>
                  <Link to="/addnote">Crear Nota</Link>
                </section>
              </div>
            </main>
          </div>
        </section>
        {allNotes?.map((note, index) => {
          const utcDateTime = note.updatedAt;
          const date = new Date(utcDateTime);
          const colombiaDateTime = date.toLocaleString("en-US", {
            timeZone: "America/Bogota",
          });

          return (
            <div key={index}>
              <Link to={"/editnote/" + note.id}>
                <div>
                  <p>Titulo: {note.title}</p>
                </div>
                <div>
                  <p>{colombiaDateTime}</p>
                </div>
              </Link>
              <div>
                <DeleteNote noteId={note.id} />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Notes;
