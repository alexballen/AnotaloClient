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
    dispatch(addDbUser(addUser.data));
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
    dispatch(authToken(userAuth.data));
  } catch (error) {
    if (error.response) {
      console.log(error.response.data.error);
    } else {
      console.log(error.message);
    }
  }
};
