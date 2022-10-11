import { Course, CourseLocation } from "@/application/models/course";

export const GET_COURSE_SUCCESS = "GET_COURSE_SUCCESS";
export const GET_COURSE_FAIL = "GET_COURSE_FAIL";
export const GET_COURSES_SUCCESS = "GET_COURSES_SUCCESS";
export const GET_COURSES_FAIL = "GET_COURSES_FAIL";
export const GET_MYCOURSES_SUCCESS = "GET_MYCOURSES_SUCCESS";
export const GET_MYCOURSES_FAIL = "GET_MYCOURSES_FAIL";
export const GET_COURSE_MATERIAL_SUCCESS = "GET_COURSE_MATERIAL_SUCCESS";
export const GET_COURSE_MATERIAL_FAIL = "GET_COURSE_MATERIAL_FAIL";
export const GET_COURSES_LOCATIONS_SUCCESS = "GET_COURSES_LOCATIONS_SUCCESS";
export const GET_COURSES_LOCATIONS_FAIL = "GET_COURSES_LOCATIONS_FAIL";
export const CLEAR_COURSES = "CLEAR_COURSES";

export interface CoursesState {
  courses: Course[];
  mycourses: Course[];
  course: Course;
  courses_locations: CourseLocation[];
}
