import { useState } from "react";
import { useDispatch } from "react-redux";
import { postSignUp } from "../redux/actions/users.js";
import { handleSubmit, handleChange } from "../services/services.js";
import SignInGoogle from "./SignInGoogle.jsx";
import s from "./SignUp.module.css";

const SignUp = () => {
  const dispatch = useDispatch();

  const [signUpUser, setSignUpUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <main>
      <div className={s.container}>
        <header>
          <p className={s.title}>Registrarse</p>
        </header>
        <section>
          <form
            onSubmit={(e) => handleSubmit(e, dispatch, postSignUp, signUpUser)}
          >
            <div className={s.form_container}>
              <div className={s.input_container}>
                <input
                  name="name"
                  placeholder="Nombre *"
                  type="text"
                  value={signUpUser.name}
                  onChange={(e) => handleChange(e, setSignUpUser, signUpUser)}
                />
              </div>
              <div className={s.input_container}>
                <input
                  name="email"
                  placeholder="Correo *"
                  type="text"
                  value={signUpUser.email}
                  onChange={(e) => handleChange(e, setSignUpUser, signUpUser)}
                />
              </div>
              <div className={s.input_container}>
                <input
                  name="password"
                  placeholder="Contraseña *"
                  type="password"
                  value={signUpUser.password}
                  onChange={(e) => handleChange(e, setSignUpUser, signUpUser)}
                />
              </div>
              <button>Enviar</button>
            </div>
          </form>
        </section>
        <section>
          <SignInGoogle />
        </section>
      </div>
    </main>
  );
};

export default SignUp;
