import { useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { getSignInGoogle } from "../redux/actions/users";
import s from "./SignInGoogle.module.css";

const SignInGoogle = () => {
  const dispatch = useDispatch();

  const handleAuthGoogle = () => {
    dispatch(getSignInGoogle());
  };

  return (
    <div>
      <section>
        <div className={s.signin_google_container}>
          <button className={s.signin_button} onClick={handleAuthGoogle}>
            <FcGoogle />
            Inicia sesión con Google
          </button>
        </div>
      </section>
    </div>
  );
};

export default SignInGoogle;
