import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import ProtectRoutes from "./services/ProtectRoutes";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import NavBar from "./components/NavBar";
import SignInGoogle from "./components/SignInGoogle";
import GoogleCallbak from "./components/GoogleCallbak";
import "./App.css";

function App() {
  const [isAuth, setIsAuth] = useState(true);
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
    setIsAppLoaded(true);
  }, []);

  const pathSignIn = "/signin";
  const protectedHome = ProtectRoutes(isAuth, Home, pathSignIn);

  /* useEffect(() => {
    // Verificar si la URL contiene el código de retorno de Google
    if (location.pathname === "/auth/google/callback") {
      const code = new URLSearchParams(location.search).get("code");
      console.log(code);

      // Realizar las acciones necesarias con el código de retorno de Google
      // Por ejemplo, enviarlo al servidor para obtener el token de acceso

      // Redirigir al usuario a la página de inicio después de manejar la respuesta de Google
      window.location.href = "/";
    }
  }, [location]); */

  return (
    <>
      <NavBar />
      {isAppLoaded && (
        <Routes>
          <Route exact path="/" element={protectedHome} />
          <Route path="/auth/google" element={<SignInGoogle />} />
          <Route path="/auth/google/callback" element={<GoogleCallbak />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      )}
    </>
  );
}

export default App;
