import { Dispatch } from "redux";
import { CLEAR_FILTER, SET_FILTER_FAIL, SET_FILTER_SUCCESS } from "./types";

export const setGlobalFilter = (keyword: string) => (dispatch: Dispatch) => {
  if (keyword) {
    dispatch({
      type: SET_FILTER_SUCCESS,
      payload: { data: keyword },
    });
  } else {
    dispatch({
      type: SET_FILTER_FAIL,
    });
  }
};

export const clearGlobalFilter = () => (dispatch: Dispatch) => {
  dispatch({
    type: CLEAR_FILTER,
  });
};
