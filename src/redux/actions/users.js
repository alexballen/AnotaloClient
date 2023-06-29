import axios from "axios";
import { getAllDbUsers, createUserInDb } from "../reducers/userSlice.js";
import { getAuthToken, setDecodedToken } from "../reducers/tokenSlice.js";

const baseURL = "http://localhost:3001";

export const getDbUsers = () => async (dispatch) => {
  try {
    const getUsers = await axios.get(`${baseURL}/user`);
    dispatch(getAllDbUsers(getUsers.data));
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.error);
    } else {
      console.log(error.message);
    }
  }
};

export const postSignUp = (userData) => async (dispatch) => {
  try {
    const createUser = await axios.post(`${baseURL}/signup`, userData);
    dispatch(createUserInDb(createUser.data.createUser));
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.error);
    } else {
      console.log(error.message);
    }
  }
};

export const postSignIn = (userData) => async (dispatch) => {
  try {
    const userAuth = await axios.post(`${baseURL}/signin`, userData);

    localStorage.setItem("token", userAuth.data.token);
    localStorage.setItem("userSession", true);

    dispatch(getAuthToken(userAuth.data.token));
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
    const googleUserAuth = await axios.get(`${baseURL}/auth/google`);

    window.location.href = googleUserAuth.data;
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.error);
    } else {
      console.log(error.message);
    }
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
      localStorage.setItem("userSession", true);

      dispatch(getAuthToken(googleAuthorizationToken.data));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.error);
      } else {
        console.log(error.message);
      }
    }
  };

export const saveToken = () => (dispatch) => {
  try {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(getAuthToken(token));
    }
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.error);
    } else {
      console.log(error.message);
    }
  }
};

export const validateToken = (tokenData) => async (dispatch) => {
  try {
    const tokenDecoded = await axios.post(`${baseURL}/verification`, tokenData);
    dispatch(setDecodedToken(tokenDecoded.data));
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.error);
    } else {
      console.log(error.message);
    }
  }
};
