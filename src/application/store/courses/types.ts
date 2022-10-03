import { Course } from "@/application/models/course";

export const GET_COURSES_SUCCESS = "GET_COURSES_SUCCESS";
export const GET_COURSES_FAIL = "GET_COURSES_FAIL";
export const GET_MYCOURSES_SUCCESS = "GET_MYCOURSES_SUCCESS";
export const GET_MYCOURSES_FAIL = "GET_MYCOURSES_FAIL";
export const CLEAR_COURSES = "CLEAR_COURSES";

export interface CoursesState {
  courses: Course[];
  mycourses: Course[];
}
