import Constants from "@/application/common/Constants";
import { User } from "@/application/models/user";
import authHeader from "@/services/auth-header";
import axios, { AxiosRequestHeaders } from "axios";

const getCourse = async (id: number) => {
  const response = await axios.get(Constants.API_URL + `courses/${id}`);
  return response.data;
};

const getAllCourses = async () => {
  const response = await axios.get(Constants.API_URL + "courses/");
  return response.data;
};

const getEnrolledCourses = async ({ id }: User) => {
  const response = await axios.get(
    Constants.API_URL + `/users/${id}/enrollments/`,
    {
      headers: authHeader() as AxiosRequestHeaders,
    }
  );
  return response.data;
};

export default {
  getCourse,
  getAllCourses,
  getEnrolledCourses,
};