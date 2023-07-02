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
          <div className={s.container_all_new_note}>
            <div className={s.container_new_note}>
              <Link to="/addnote">+</Link>
            </div>
            <div className={s.note_line1}></div>
            <div className={s.note_line2}></div>
          </div>
        </section>
        <section>
          <div className={s.container_all_notes_array}>
            {allNotes?.map((note, index) => {
              const utcDateTime = note.updatedAt;
              const date = new Date(utcDateTime);
              const colombiaDateTime = date.toLocaleString("en-US", {
                timeZone: "America/Bogota",
              });

              return (
                <div key={index} className={s.container_filter}>
                  <Link to={"/editnote/" + note.id}>
                    <div className={s.container_all_notes}>
                      <div className={s.title_container}>
                        <p> {note.title}</p>
                      </div>
                      <div className={s.container_date_importance}>
                        <div className={s.date_container}>
                          <p>{colombiaDateTime}</p>
                        </div>
                        <div>
                          {note.importance === "high" ? (
                            <button className={s.high}></button>
                          ) : null}
                          {note.importance === "medium" ? (
                            <button className={s.medium}></button>
                          ) : null}
                          {note.importance === "low" ? (
                            <button className={s.low}></button>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className={s.delete_container}>
                    <DeleteNote noteId={note.id} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Notes;
