import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import NavBar from "./components/NavBar";

import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  );
}

export default App;
