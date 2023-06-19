import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postSignInGoogle } from "../redux/actions/users.js";
import { useLocation } from "react-router-dom";
import SignIn from "./SignIn.jsx";
import Home from "./Home.jsx";

const GoogleCallback = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { token } = useSelector((state) => state.token);

  const [redirectToHome, setRedirectToHome] = useState(false);

  const params = new URLSearchParams(location.search);
  const googleAuthorizationCode = params.get("code");
  const googleVerificationCode = {
    googleAuthorizationCode,
  };

  useEffect(() => {
    if (googleAuthorizationCode) {
      dispatch(postSignInGoogle(googleVerificationCode));
      setRedirectToHome(true);
    }
  }, []);

  useEffect(() => {
    if (googleAuthorizationCode) {
      const timer = setTimeout(() => {}, 1000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (redirectToHome && Object.keys(token).length) {
    return <Home />;
  } else if (googleAuthorizationCode) {
    return <div>Cargando...</div>;
  } else {
    return <SignIn />;
  }
};

export default GoogleCallback;
