import { SET_MESSAGE } from "@/application/store/message/types";
import { CLEAR_PROFILE, GET_PROFILE_FAIL, GET_PROFILE_SUCCESS } from "./types";

import UserService from "@/services/user/user";
import { Dispatch } from "redux";

export const userProfile = () => (dispatch: Dispatch) => {
  return UserService.userInfo().then(
    (data) => {
      dispatch({
        type: GET_PROFILE_SUCCESS,
        payload: { data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: GET_PROFILE_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const clearProfile = () => (dispatch: Dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
};