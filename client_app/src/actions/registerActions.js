import axios from "axios";
import { setAlert } from "./alertActions";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "./types";

export const registerUser = (name, email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  const data = JSON.stringify({ name, email, password });
  try {
    const response = await axios.post("/api/user", data, config);
    dispatch({ type: REGISTER_SUCCESS, payload: response });
  } catch (err) {
      if(err.response.data.errors){
        err.response.data.errors.forEach(error => {
            dispatch(setAlert(error.msg,"danger"));
        });
      }
    dispatch({ type: REGISTER_FAIL });
  }
};
