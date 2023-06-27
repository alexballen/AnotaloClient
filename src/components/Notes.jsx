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
  const { decoded } = useSelector((state) => state.decoded);
  const { allNotes } = useSelector((state) => state.allNotes);

  useEffect(() => {
    dispatch(saveToken());
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(token).length) {
      const objToken = {
        token,
      };
      dispatch(validateToken(objToken));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (decoded.email) {
      const searchNotesUser = {
        email: decoded.email,
      };
      dispatch(getDbNotes(searchNotesUser));
    }
  }, [dispatch, decoded]);

  return (
    <main>
      <div className={s.container}>
        <section>
          <div>
            <main>
              <div className={s.container}>
                <section>
                  <Link to="/addnote">Add Note</Link>
                </section>
              </div>
            </main>
          </div>
        </section>
        {allNotes?.map((notes, index) => {
          const utcDateTime = notes.updatedAt;
          const date = new Date(utcDateTime);
          const colombiaDateTime = date.toLocaleString("en-US", {
            timeZone: "America/Bogota",
          });

          return (
            <div key={index}>
              <Link to={"/editnote/" + notes.id}>
                <div>
                  <p>NAME: {notes.name}</p>
                </div>
                <div>
                  <p>{colombiaDateTime}</p>
                </div>
              </Link>
              <div>
                <DeleteNote idNote={notes.id} />
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Notes;
