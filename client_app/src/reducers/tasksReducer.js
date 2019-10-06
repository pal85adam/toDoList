import {
  ONETASK_ADDED,
  ONETASK_UPDATED,
  ONETASK_LOADED,
  ONETASK_DELETED,
  TASKS_LOADED
} from "../actions/types";
const initialState = {
  dayTasks: null,
  taskUpdate: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case TASKS_LOADED:
      return {
        ...state,
        dayTasks: payload
      };
    case ONETASK_LOADED:
      return {
        ...state,
        taskUpdate: payload
      };
    case ONETASK_ADDED:
    case ONETASK_UPDATED:
    case ONETASK_DELETED:
      return { ...state };
    default:
      return state;
  }
};
