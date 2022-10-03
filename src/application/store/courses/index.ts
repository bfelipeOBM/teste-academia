import { Course } from "@/application/models/course";
import { Reducer } from "redux";
import {
  CLEAR_COURSES,
  CoursesState,
  GET_COURSES_FAIL,
  GET_COURSES_SUCCESS,
  GET_MYCOURSES_FAIL,
  GET_MYCOURSES_SUCCESS,
} from "./types";

const initialState: CoursesState = {
  courses: [] as Course[],
  mycourses: [] as Course[],
};

const reducer: Reducer<CoursesState> = (
  state: CoursesState = initialState,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case GET_COURSES_SUCCESS:
      return {
        ...state,
        courses: payload.data,
      };
    case GET_COURSES_FAIL:
      return {
        ...state,
        courses: [],
      };

    case GET_MYCOURSES_SUCCESS:
      return {
        ...state,
        mycourses: payload.data,
      };
    case GET_MYCOURSES_FAIL:
      return {
        ...state,
        mycourses: [],
      };
    case CLEAR_COURSES:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
