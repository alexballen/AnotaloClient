import axios from "axios";
import { allDbUsers, addDbUser, authToken } from "../reducers/userSlice.js";

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
    console.log(addUser.data.message);
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
    dispatch(authToken(userAuth.data.token));
    console.log(userAuth.data.message);
    if (userAuth.data.message === "Inicio de sesion exitoso") {
      alert("Inicio de sesion exitoso");
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.error);
    } else {
      console.log(error.message);
    }
  }
};

export const postSignInGoogle = () => async () => {
  try {
    const userAuthGoogle = await axios.get(`${baseURL}/auth/google`);
    console.log(userAuthGoogle.data);
    const authorizationUrl = userAuthGoogle.data;
    window.location.href = authorizationUrl;

    /* const getToken = await axios.get(`${baseURL}/auth/google/callback`);
    console.log(getToken); */
  } catch (error) {
    console.log(error);
  }
};

export const postGoogle = (urlData) => async () => {
  console.log(urlData);
  try {
    const portCodeGogle = await axios.post(
      `${baseURL}/auth/google/callback`,
      urlData
    );
    console.log(portCodeGogle.data);
  } catch (error) {
    console.log(error);
  }
};
