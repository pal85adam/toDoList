import axios from "axios";
import { setAlert } from "./alertActions";
import setAxiosConfigs from "../utils/setAxiosConfig";
import { LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED } from "./types";

export const loadUser = () => async dispatch => {
  if (localStorage.tdtoken) {
    setAxiosConfigs(localStorage.tdtoken);
    // console.log("here is loadUser", localStorage.tdtoken);
  }
  try {
    if (localStorage.tdtoken) {
      const response = await axios.get("/api/auth");
      dispatch({
        type: USER_LOADED,
        payload: response.data
      });
    }
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

export const loginUser = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  const data = JSON.stringify({ email, password });
  try {
    const response = await axios.post("/api/auth", data, config);
    dispatch({ type: LOGIN_SUCCESS, payload: response.data });
    dispatch(loadUser());
  } catch (err) {
    if (err.response.data.errors) {
      //   console.log(err.response.data);
      err.response.data.errors.forEach(error => {
        dispatch(setAlert(error.msg, "danger"));
      });
    }
    dispatch({ type: LOGIN_FAIL });
  }
};

export const doLogout = () => dispatch => {
  dispatch({ type: LOGIN_FAIL });
};
