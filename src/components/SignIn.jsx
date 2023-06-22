import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postSignIn } from "../redux/actions/users.js";
import { handleSubmit, handleChange } from "../services/services.js";
import { useNavigate } from "react-router-dom";
import s from "./SignIn.module.css";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.token);

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (token.length) {
      navigate("/notes");
    }
  }, [token, navigate]);

  return (
    <main>
      <div className={s.container}>
        <header>
          <p className={s.title}>Registrarse</p>
        </header>
        <section>
          <form
            onSubmit={(e) => handleSubmit(e, dispatch, postSignIn, signInData)}
          >
            <div className={s.form_container}>
              <div className={s.input_container}>
                <input
                  name="email"
                  placeholder="Correo *"
                  type="text"
                  value={signInData.email}
                  onChange={(e) => handleChange(e, setSignInData, signInData)}
                />
              </div>
              <div className={s.input_container}>
                <input
                  name="password"
                  placeholder="Contraseña *"
                  type="password"
                  value={signInData.password}
                  onChange={(e) => handleChange(e, setSignInData, signInData)}
                />
              </div>
              <button>Enviar</button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
};

export default SignIn;
