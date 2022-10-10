import { SET_MESSAGE } from "@/application/store/message/types";
import {
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "./types";

import { User, UserLogin } from "@/application/models/user";
import AuthService from "@/services/auth";
import { Dispatch } from "redux";

export const register = (user: User) => (dispatch: Dispatch) => {
  return AuthService.register(user).then(
    (data) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: { data },
      });

      dispatch({
        type: SET_MESSAGE,
        payload: { data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        error?.response?.data || error.message || error.toString();

      dispatch({
        type: REGISTER_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const login = (user: UserLogin) => (dispatch: Dispatch) => {
  return AuthService.login(user).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        error?.response?.data || error.message || error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch: Dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};
