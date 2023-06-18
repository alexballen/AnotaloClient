import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { saveToken } from "./redux/actions/users";
import ProtectRoutes from "./services/ProtectRoutes";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import NavBar from "./components/NavBar";
import SignInGoogle from "./components/SignInGoogle";
import GoogleCallback from "./components/GoogleCallback";
import Notes from "./components/Notes";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(false);
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  const { token } = useSelector((state) => state.token);
  console.log(token);

  useEffect(() => {
    dispatch(saveToken());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      setIsAuth(true);
    }
    setIsAppLoaded(true);
  }, [token]);

  const protectedHome = ProtectRoutes(isAuth, Home, "/signin");

  return (
    <>
      <NavBar />
      {isAppLoaded && (
        <Routes>
          <Route path="/auth/google/callback" element={<GoogleCallback />} />
          <Route path="/home" element={protectedHome} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/auth/google" element={<SignInGoogle />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      )}
    </>
  );
}

export default App;
