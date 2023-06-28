import { useEffect } from "react";
import Home from "./Home";

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userSession");
  }, []);

  return <Home />;
};

export default Logout;
