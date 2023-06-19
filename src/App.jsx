import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { saveToken } from "./redux/actions/users";
import { ProtectedRoute } from "./services/ProtectR";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";
import SignInGoogle from "./components/SignInGoogle";
import GoogleCallback from "./components/GoogleCallback";
import Notes from "./components/Notes";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);

  useEffect(() => {
    dispatch(saveToken());
  }, [dispatch]);

  if (token.length > 0) {
    localStorage.setItem("session", true);
  }
  const session = localStorage.getItem("session");

  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/auth/google/callback" element={<GoogleCallback />} />
        <Route
          element={
            <ProtectedRoute
              isAllowed={!!session}
              redirectTo="/auth/google/callback"
            />
          }
        >
          <Route path="/home" element={<Home />} />
          <Route path="/notes" element={<Notes />} />
        </Route>
        <Route path="/auth/google" element={<SignInGoogle />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
