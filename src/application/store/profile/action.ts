import { SET_MESSAGE } from "@/application/store/message/types";
import {
  CLEAR_PROFILE,
  GET_PROFILE_FAIL,
  GET_PROFILE_SUCCESS,
  SET_PROFILE_PAGE,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_IMAGE_FAIL,
  UPDATE_PROFILE_IMAGE_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
} from "./types";

import { User } from "@/application/models/user";
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
        error?.response?.data || error.message || error.toString();

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

export const updateProfile = (data: User) => (dispatch: Dispatch) => {
  return UserService.updateInfo(data).then(
    (data) => {
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: { data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        error?.response?.data || error.message || error.toString();

      dispatch({
        type: UPDATE_PROFILE_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const updatePhoto =
  (image: string, user: User) => (dispatch: Dispatch) => {
    return UserService.updatePhoto(image, user).then(
      (data) => {
        dispatch({
          type: UPDATE_PROFILE_IMAGE_SUCCESS,
          payload: { data },
        });

        return Promise.resolve();
      },
      (error) => {
        const message =
          error?.response?.data || error.message || error.toString();

        dispatch({
          type: UPDATE_PROFILE_IMAGE_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
    );
  };

export const setProfilePage = (page: string) => (dispatch: Dispatch) => {
  dispatch({
    type: SET_PROFILE_PAGE,
    payload: { page },
  });
};

export const clearProfile = () => (dispatch: Dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
};
