import axios from "axios";
import {
  allDbUsers,
  addDbUser,
  authToken,
  decodedToken,
} from "../reducers/userSlice.js";

const baseURL = "http://localhost:3001";

export const getDbUsers = () => async (dispatch) => {
  try {
    const getUsers = await axios.get(`${baseURL}/user`);
    dispatch(allDbUsers(getUsers.data));
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.error);
    } else {
      console.log(error.message);
    }
  }
};

export const postSignUp = (dataUser) => async (dispatch) => {
  try {
    const addUser = await axios.post(`${baseURL}/signup`, dataUser);
    dispatch(addDbUser(addUser.data.createUser));

    if (addUser.data.message === "Registro exitoso") {
      alert("Registro exitoso");
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.error);
    } else {
      console.log(error.message);
    }
  }
};

export const postSignIn = (dataUser) => async (dispatch) => {
  try {
    const userAuth = await axios.post(`${baseURL}/signin`, dataUser);

    localStorage.setItem("token", userAuth.data.token);

    localStorage.setItem("session", true);

    dispatch(authToken(userAuth.data.token));

    /*  if (userAuth.data.message === "Inicio de sesion exitoso") {
      alert("Inicio de sesion exitoso");
    } */
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.error);
    } else {
      console.log(error.message);
    }
  }
};

export const getSignInGoogle = () => async () => {
  try {
    const userAuthGoogle = await axios.get(`${baseURL}/auth/google`);

    window.location.href = userAuthGoogle.data;
  } catch (error) {
    console.log(error);
  }
};

export const postSignInGoogle =
  (googleAuthorizationCode) => async (dispatch) => {
    try {
      const googleAuthorizationToken = await axios.post(
        `${baseURL}/signin`,
        googleAuthorizationCode
      );
      localStorage.setItem("token", googleAuthorizationToken.data);

      localStorage.setItem("session", true);

      dispatch(authToken(googleAuthorizationToken.data));
    } catch (error) {
      console.log(error);
    }
  };

export const saveToken = () => (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(authToken(token));
    }
  } catch (error) {
    console.log(error);
  }
};

export const validateToken = (dataToken) => async (dispatch) => {
  try {
    const decodeToken = await axios.post(`${baseURL}/verification`, dataToken);
    dispatch(decodedToken(decodeToken.data));
  } catch (error) {
    console.log(error);
  }
};
