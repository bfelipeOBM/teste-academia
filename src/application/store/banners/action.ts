import { SET_MESSAGE } from "@/application/store/message/types";
import BannersService from "@/services/banners/banners";
import { Dispatch } from "redux";
import {
  CLEAR_BANNERS,
  GET_BANNERS_FAIL,
  GET_BANNERS_SUCCESS,
  GET_MOBILE_BANNERS_FAIL,
  GET_MOBILE_BANNERS_SUCCESS,
} from "./types";

export const getBanners = () => (dispatch: Dispatch) => {
  return BannersService.getBanners().then(
    (data) => {
      dispatch({
        type: GET_BANNERS_SUCCESS,
        payload: { data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        error?.response?.data || error.message || error.toString();

      dispatch({
        type: GET_BANNERS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getMobileBanners = () => (dispatch: Dispatch) => {
  return BannersService.getMobileBanners().then(
    (data) => {
      dispatch({
        type: GET_MOBILE_BANNERS_SUCCESS,
        payload: { data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        error?.response?.data || error.message || error.toString();

      dispatch({
        type: GET_MOBILE_BANNERS_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const clearBanners = () => (dispatch: Dispatch) => {
  dispatch({
    type: CLEAR_BANNERS,
  });
};
