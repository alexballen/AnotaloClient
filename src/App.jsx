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
import Logout from "./components/Logout";
import AddNote from "./components/AddNote";
import EditNote from "./components/EditNote";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.token);

  useEffect(() => {
    dispatch(saveToken());
  }, [dispatch]);

  if (token.length > 0) {
    localStorage.setItem("userSession", true);
  }
  const session = localStorage.getItem("userSession");

  return (
    <>
      <NavBar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/auth/google" element={<SignInGoogle />} />
        <Route path="/signin" element={<GoogleCallback />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/addnote" element={<AddNote />} />
        <Route path="/editnote/:id" element={<EditNote />} />
        <Route
          element={
            <ProtectedRoute isAllowed={!!session} redirectTo="/signin" />
          }
        >
          <Route path="/notes" element={<Notes />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
