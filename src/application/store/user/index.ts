import { Reducer } from "redux";
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  UserState,
} from "./types";

const user: UserState = JSON.parse(localStorage.getItem("user")!);
console.log(user);

const initialState: UserState = user
  ? { isLoggedIn: true, data: user.data }
  : { isLoggedIn: false, data: null };

const reducer: Reducer<UserState> = (
  state: UserState = initialState,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };

    default:
      return state;
  }
};

export default reducer;
