import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveToken, validateToken } from "../redux/actions/users";
import { getDbNotes } from "../redux/actions/notes";
import s from "./Notes.module.css";

const Notes = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);
  console.log(token);

  const { decoded } = useSelector((state) => state.decoded);
  console.log(decoded);

  const { allNotes } = useSelector((state) => state.allNotes);
  console.log(allNotes);

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
  }, [token]);

  useEffect(() => {
    dispatch(getDbNotes());
  }, [dispatch]);

  return (
    <main>
      <div className={s.container}>
        <h1>Notes</h1>
      </div>
    </main>
  );
};

export default Notes;
