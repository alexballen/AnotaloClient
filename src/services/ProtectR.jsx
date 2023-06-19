import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

export const ProtectedRoute = ({ isAllowed, children, redirectTo = "/" }) => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} />;
  }
  return children ? children : <Outlet />;
};

ProtectedRoute.propTypes = {
  isAllowed: PropTypes.bool.isRequired,
  children: PropTypes.node,
  redirectTo: PropTypes.string,
};

export const ProtectedRouteRole = ({
  isAllowed,
  children,
  role,
  redirectTo = "/",
}) => {
  if (!isAllowed && role !== true) {
    alert("Sin acceso");
    return <Navigate to={redirectTo} />;
  }
  return children ? children : <Outlet />;
};

ProtectedRouteRole.propTypes = {
  isAllowed: PropTypes.bool.isRequired,
  children: PropTypes.node,
  role: PropTypes.bool.isRequired,
  redirectTo: PropTypes.string,
};
