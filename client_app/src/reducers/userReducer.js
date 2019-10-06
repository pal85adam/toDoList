import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from "../actions/types";
const initialState = {
  token: localStorage.getItem("tdtoken"),
  isAuthed: null,
  loading: true,
  user: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
        // console.log(payload);
      return {
        ...state,
        user: payload.user,
        isAuthed: true,
        loading: false
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      // console.log(payload.token);
      localStorage.setItem("tdtoken", payload.token);
      return {
        ...state,
        ...payload,
        token: payload.token,
        isAuthed: true,
        loading: false
      };

    case REGISTER_FAIL:
    case LOGIN_FAIL:
      localStorage.removeItem("tdtoken");
      return { ...state, token: null, isAuthed: false, loading: false };

    default:
      return state;
  }
};
