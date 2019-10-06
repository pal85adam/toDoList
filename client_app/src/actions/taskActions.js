import axios from "axios";
import { setAlert } from "./alertActions";
import {
  ONETASK_ADDED,
  ONETASK_UPDATED,
  ONETASK_DELETED,
  ONETASK_LOADED,
  TASKS_LOADED
} from "./types";

export const getTodayUserTasks = (year, month, day) => async dispatch => {
  try {
    const response = await axios.get(
      `/api/tasks/?year=${year}&month=${month}&day=${day}`
    );
    console.log(
      `/api/tasks/?year=${year}&month=${month}&day=${day}`,
      response.data
    );
    dispatch({
      type: TASKS_LOADED,
      payload: response.data
    });
  } catch (error) {
    dispatch(setAlert("Sorry, Something went wrong!", "danger"));
  }
};

export const getOneTask = id => async dispatch => {
  try {
    const response = await axios.get(`/api/tasks/${id}`);
    dispatch({
      type: ONETASK_LOADED,
      payload: response.data
    });
  } catch (error) {
    dispatch(setAlert("Sorry, Something went wrong!", "danger"));
  }
};

export const updateOrAddTask = (
  title,
  text,
  date,
  id = null
) => async dispatch => {
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  };
  const data = JSON.stringify({ title, text, date });
  try {
    let response = null;
    if (!id) {
      response = await axios.post("/api/tasks", data, config);
      dispatch({ type: ONETASK_ADDED, payload: response.data });
      dispatch(setAlert("Your new task was created!", "success"));
    } else {
      response = await axios.put(`/api/tasks/${id}`, data, config);
      dispatch({ type: ONETASK_UPDATED });
      dispatch(setAlert("Your task was updated!", "success"));
    }
  } catch (err) {
    if (err.response.data.errors) {
      err.response.data.errors.forEach(error => {
        dispatch(setAlert(error.msg, "danger"));
      });
    }
    dispatch(setAlert("Sorry, Something went wrong!", "danger"));
  }
};

export const deleteOneTask = id => async dispatch => {
  try {
    const response = await axios.delete(`api/tasks/${id}`);
    dispatch({ type: ONETASK_DELETED });

    dispatch(setAlert(response.data.msg, "success"));
  } catch (err) {
    if (err.response.data.errors) {
      err.response.data.errors.forEach(error => {
        dispatch(setAlert(error.msg, "danger"));
      });
    }
    console.log(err.message);
    dispatch(setAlert("Sorry, Something went wrong!", "danger"));
  }
};
