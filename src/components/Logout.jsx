import { useEffect } from "react";
import Home from "./Home";

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("session");
  }, []);

  return <Home />;
};

export default Logout;
