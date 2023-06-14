import jwt_decode from "jwt-decode";

export const handleSubmit = (e, dispatch, action, data) => {
  e.preventDefault();
  dispatch(action(data));
};

export const handleChange = (e, setState, state) => {
  const { value, name } = e.target;
  setState({
    ...state,
    [name]: value,
  });
};

export const decodedToken = (token) => {
  if (!Object.keys(token).length) {
    return {
      message: "No hay token valido",
      token: console.log(token),
    };
  }
  const decoded = jwt_decode(token);
  localStorage.setItem("token", JSON.stringify(token));
  return decoded;
};
