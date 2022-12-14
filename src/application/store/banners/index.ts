import { Banner } from "@/application/models/banner";
import { Reducer } from "redux";
import {
  BannersState,
  CLEAR_BANNERS,
  GET_BANNERS_FAIL,
  GET_BANNERS_SUCCESS,
  GET_MOBILE_BANNERS_FAIL,
  GET_MOBILE_BANNERS_SUCCESS,
} from "./types";

const initialState: BannersState = {
  banners: [] as Banner[],
  mobilebanners: [] as Banner[],
};

const reducer: Reducer<BannersState> = (
  state: BannersState = initialState,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case GET_BANNERS_SUCCESS:
      return {
        ...state,
        banners: payload.data,
      };
    case GET_BANNERS_FAIL:
      return {
        ...state,
        banners: [],
      };
    case GET_MOBILE_BANNERS_SUCCESS:
      return {
        ...state,
        mobilebanners: payload.data,
      };
    case GET_MOBILE_BANNERS_FAIL:
      return {
        ...state,
        mobilebanners: [],
      };
    case CLEAR_BANNERS:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
