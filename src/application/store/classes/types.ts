import { Class } from "@/application/models/class";

export const GET_CLASS_SUCCESS = "GET_CLASS_SUCCESS";
export const GET_CLASS_FAIL = "GET_CLASS_FAIL";
export const GET_CLASSES_SUCCESS = "GET_CLASSES_SUCCESS";
export const GET_CLASSES_FAIL = "GET_CLASSES_FAIL";
export const GET_MYCLASSES_SUCCESS = "GET_MYCLASSES_SUCCESS";
export const GET_MYCLASSES_FAIL = "GET_MYCLASSES_FAIL";
export const SET_ENROLL_CLASS_SUCCESS = "SET_ENROLL_CLASS_SUCCESS";
export const SET_ENROLL_CLASS_FAIL = "SET_ENROLL_CLASS_FAIL";
export const CLEAR_CLASSES = "CLEAR_CLASSES";

export interface ClassState {
  classes: Class[];
  myclasses: Class[];
  class: Class;
}
