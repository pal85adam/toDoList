import {
  ONETASK_ADDED,
  ONETASK_UPDATED,
  ONETASK_LOADED,
  ONETASK_DELETED,
  TASKS_LOADED
} from "../actions/types";
const initialState = {
  dayTasks: [],
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
      return {
        ...state,
        dayTasks: [...state.dayTasks, payload]
      };
    case ONETASK_UPDATED:
      return { ...state };
    case ONETASK_DELETED:
      return {
        ...state,
        dayTasks: state.dayTasks.filter(task => task._id !== payload)
      };
    default:
      return state;
  }
};
