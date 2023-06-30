import jwt_decode from "jwt-decode";

export const handleSubmit = (event, dispatch, action, data) => {
  event.preventDefault();
  dispatch(action(data));
};

export const handleChange = (event, setState, state) => {
  const { value, name } = event.target;
  setState({
    ...state,
    [name]: value,
  });
};

export const decodedToken = (token) => {
  if (!Object.keys(token).length) {
    return {
      message: "No hay token valido",
    };
  }
  const decoded = jwt_decode(token);
  localStorage.setItem("token", JSON.stringify(decoded));
  return decoded;
};

export const handleHover = (setState) => {
  setState(true);
};

export const handleMouseLeave = (setState) => {
  setState(false);
};
