import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postSignInGoogle, saveToken } from "../redux/actions/users.js";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleCallback = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { token } = useSelector((state) => state.token);
  console.log(token);

  const params = new URLSearchParams(location.search);
  const googleAuthorizationCode = params.get("code");
  console.log(googleAuthorizationCode);

  useEffect(() => {
    if (googleAuthorizationCode) {
      dispatch(postSignInGoogle(googleAuthorizationCode));
      /* navigate("/home"); */
    }
  }, [dispatch, googleAuthorizationCode, navigate]);

  useEffect(() => {
    dispatch(saveToken());
  }, [dispatch]);

  return null;
};

export default GoogleCallback;
