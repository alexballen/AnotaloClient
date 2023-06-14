import { Navigate } from "react-router-dom";

const ProtectRoutes = (state, Component, path) => {
  return state ? <Component /> : <Navigate to={`${path}`} replace />;
};

export default ProtectRoutes;
