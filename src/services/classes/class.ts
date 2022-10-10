import Constants from "@/application/common/Constants";
import { Course } from "@/application/models/course";
import { User } from "@/application/models/user";
import authHeader from "@/services/auth-header";
import axios, { AxiosRequestHeaders } from "axios";

const getClass = async (courseId: number, classId: number) => {
  const response = await axios.get(
    `${Constants.API_URL}courses/${courseId}/classes/${classId}`
  );
  return response.data;
};

const getCourseClasses = async ({ id }: Course) => {
  const response = await axios.get(`${Constants.API_URL}courses/${id}/classes`);
  return response.data;
};

const getEnrolledClasses = async ({ id }: User, classId: number) => {
  const response = await axios.get(
    `${Constants.API_URL}courses/${id}/classes/${classId}/enrollments`,
    {
      headers: authHeader() as AxiosRequestHeaders,
    }
  );
  return response.data;
};

const enrollOnClass = async (
  courseId: number,
  classId: number,
  { id }: User
) => {
  const response = await axios.post(
    `${Constants.API_URL}courses/${courseId}/classes/${classId}/enrollment/`,
    { user_id: id },
    {
      headers: authHeader() as AxiosRequestHeaders,
    }
  );
  return response.data;
};

export default {
  getClass,
  getCourseClasses,
  getEnrolledClasses,
  enrollOnClass,
};
