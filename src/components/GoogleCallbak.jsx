/* import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postSignInGoogle } from "../redux/actions/users.js";
import { decodedToken } from "../services/services.js";
import Home from "./Home.jsx";
import SignIn from "./SignIn.jsx";

const GoogleCallback = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);

  decodedToken(token);

  const [currentURL, setCurrentURL] = useState("");

  useEffect(() => {
    setCurrentURL(window.location.href);
  }, []); */

/* useEffect(() => {
    const handleGoogleSignIn = async () => {
      if (currentURL.length) {
        const url = new URL(currentURL);
        const params = new URLSearchParams(url.search);
        const googleAuthorizationCode = params.get("code");

        await dispatch(postSignInGoogle(googleAuthorizationCode));

        if (Object.keys(token).length) {
          window.location.href = "/";
        } else {
          window.location.href = "/signin";
        }
      }
    };

    handleGoogleSignIn();
  }, [currentURL, dispatch, token]); */

/* useEffect(() => {
    if (currentURL.length) {
      const url = new URL(currentURL);
      const params = new URLSearchParams(url.search);
      const googleAuthorizationCode = params.get("code");

      if (googleAuthorizationCode && !Object.keys(token).length) {
        dispatch(postSignInGoogle(googleAuthorizationCode));
      }
    }
  }, [currentURL, dispatch, token]);

  useEffect(() => {
    if (Object.keys(token).length) {
      window.location.href = "/";
    } else {
      window.location.href = "/signin";
    }
  }, [token]);

  return <>{Object.keys(token).length ? <Home /> : <SignIn />}</>;
};

export default GoogleCallback; */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postSignInGoogle } from "../redux/actions/users.js";
import { decodedToken } from "../services/services.js";
import { useLocation, useNavigate } from "react-router-dom";

/* import Home from "./Home.jsx";
import SignIn from "./SignIn.jsx"; */

const GoogleCallback = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);

  decodedToken(token);

  const location = useLocation();
  const navigate = useNavigate();
  const [currentURL, setCurrentURL] = useState("");

  useEffect(() => {
    setCurrentURL(location.search);
  }, [location]);

  useEffect(() => {
    if (currentURL.length) {
      const params = new URLSearchParams(currentURL);
      const googleAuthorizationCode = params.get("code");

      dispatch(postSignInGoogle(googleAuthorizationCode));
    }
  }, [currentURL, dispatch]);

  /*  useEffect(() => {
    if (Object.keys(token).length) {
      return navigate("/");
    }
  }, [token, navigate]); */
  return Object.keys(token).length ? navigate("/") : null;
};

export default GoogleCallback;
