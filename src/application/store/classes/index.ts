import { Class } from "@/application/models/class";
import { Reducer } from "redux";
import {
  ClassState,
  CLEAR_CLASSES,
  GET_CLASSES_FAIL,
  GET_CLASSES_SUCCESS,
  GET_CLASS_FAIL,
  GET_CLASS_SUCCESS,
  GET_MYCLASSES_FAIL,
  GET_MYCLASSES_SUCCESS,
} from "./types";

const initialState: ClassState = {
  classes: [] as Class[],
  myclasses: [] as Class[],
  class: {} as Class,
};

const reducer: Reducer<ClassState> = (
  state: ClassState = initialState,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CLASS_SUCCESS:
      return {
        ...state,
        class: payload.data,
      };
    case GET_CLASS_FAIL:
      return {
        ...state,
        class: null,
      };
    case GET_CLASSES_SUCCESS:
      return {
        ...state,
        classes: payload.data,
      };
    case GET_CLASSES_FAIL:
      return {
        ...state,
        classes: [],
      };
    case GET_MYCLASSES_SUCCESS:
      return {
        ...state,
        myclasses: payload.data,
      };
    case GET_MYCLASSES_FAIL:
      return {
        ...state,
        myclasses: [],
      };
    case CLEAR_CLASSES:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
