import { SET_MESSAGE } from "@/application/store/message/types";
import {
  CLEAR_CLASSES,
  GET_CLASSES_FAIL,
  GET_CLASSES_SUCCESS,
  GET_CLASS_FAIL,
  GET_CLASS_SUCCESS,
  GET_MYCLASSES_FAIL,
  GET_MYCLASSES_SUCCESS,
  SET_ENROLL_CLASS_FAIL,
  SET_ENROLL_CLASS_SUCCESS,
} from "./types";

import { Course } from "@/application/models/course";
import { User } from "@/application/models/user";
import ClassesService from "@/services/classes/class";
import { Dispatch } from "redux";

export const getClass =
  (courseId: number, classId: number) => async (dispatch: Dispatch) => {
    return ClassesService.getClass(courseId, classId).then(
      (data) => {
        dispatch({
          type: GET_CLASS_SUCCESS,
          payload: { data },
        });

        return Promise.resolve();
      },
      (error) => {
        const message =
          error?.response?.data || error.message || error.toString();

        dispatch({
          type: GET_CLASS_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
    );
  };

export const getCourseClasses = (course: Course) => (dispatch: Dispatch) => {
  return ClassesService.getCourseClasses(course).then(
    (data) => {
      dispatch({
        type: GET_CLASSES_SUCCESS,
        payload: { data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        error?.response?.data || error.message || error.toString();

      dispatch({
        type: GET_CLASSES_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const getEnrolledClasses =
  (user: User, classId: number) => (dispatch: Dispatch) => {
    return ClassesService.getEnrolledClasses(user, classId).then(
      (data) => {
        dispatch({
          type: GET_MYCLASSES_SUCCESS,
          payload: { data },
        });

        return Promise.resolve();
      },
      (error) => {
        const message =
          error?.response?.data || error.message || error.toString();

        dispatch({
          type: GET_MYCLASSES_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
    );
  };

export const enrollOnClass =
  (courseId: number, classId: number, userId: User) =>
  async (dispatch: Dispatch) => {
    return ClassesService.enrollOnClass(courseId, classId, userId).then(
      (data) => {
        dispatch({
          type: SET_ENROLL_CLASS_SUCCESS,
          payload: { data },
        });

        return Promise.resolve();
      },
      (error) => {
        const message =
          error?.response?.data || error.message || error.toString();

        dispatch({
          type: SET_ENROLL_CLASS_FAIL,
        });

        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });

        return Promise.reject();
      }
    );
  };

export const clearClasses = () => (dispatch: Dispatch) => {
  dispatch({
    type: CLEAR_CLASSES,
  });
};
