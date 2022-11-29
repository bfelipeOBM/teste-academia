import { Reducer } from "redux";
import {
  CLEAR_FILTER,
  GlobalFilterState,
  SET_FILTER_FAIL,
  SET_FILTER_SUCCESS,
} from "./types";

const initialState: GlobalFilterState = {
  globalfilter: "",
};

const reducer: Reducer<GlobalFilterState> = (
  state: GlobalFilterState = initialState,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case SET_FILTER_SUCCESS:
      return {
        ...state,
        globalfilter: payload.data,
      };
    case SET_FILTER_FAIL:
      return {
        ...state,
        globalfilter: "",
      };
    case CLEAR_FILTER:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
