import { AccessToken } from "@/application/models/user";
import { Reducer } from "redux";
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  UserState,
} from "./types";

const accessToken: AccessToken = JSON.parse(
  localStorage.getItem("accessToken")!
);

const initialState: UserState = accessToken
  ? { isLoggedIn: true, data: accessToken }
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
        isLoggedIn: true,
        data: payload.data,
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
        data: payload.data,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };

    default:
      return state;
  }
};

export default reducer;
