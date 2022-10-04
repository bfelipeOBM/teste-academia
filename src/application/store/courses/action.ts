import { SET_MESSAGE } from "@/application/store/message/types";
import {
  CLEAR_COURSES,
  GET_COURSES_FAIL,
  GET_COURSES_SUCCESS,
  GET_COURSE_FAIL,
  GET_COURSE_SUCCESS,
  GET_MYCOURSES_FAIL,
  GET_MYCOURSES_SUCCESS,
} from "./types";

import { User } from "@/application/models/user";
import CoursesService from "@/services/courses/courses";
import { Dispatch } from "redux";

export const getCourse = (id: number) => async (dispatch: Dispatch) => {
  return CoursesService.getCourse(id).then(
    (data) => {
      dispatch({
        type: GET_COURSE_SUCCESS,
        payload: { data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        error?.response?.data?.message || error?.message || error.toString();

      dispatch({
        type: GET_COURSE_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getAllCourses = () => (dispatch: Dispatch) => {
  return CoursesService.getAllCourses().then(
    (data) => {
      dispatch({
        type: GET_COURSES_SUCCESS,
        payload: { data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        error?.response?.data?.message || error?.message || error.toString();

      dispatch({
        type: GET_COURSES_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getMyCourses = (user: User) => (dispatch: Dispatch) => {
  return CoursesService.getEnrolledCourses(user).then(
    (data) => {
      dispatch({
        type: GET_MYCOURSES_SUCCESS,
        payload: { data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        error?.response?.data?.message || error?.message || error.toString();

      dispatch({
        type: GET_MYCOURSES_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const clearCourses = () => (dispatch: Dispatch) => {
  dispatch({
    type: CLEAR_COURSES,
  });
};
