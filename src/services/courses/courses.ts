import Constants from "@/application/common/Constants";
import { User } from "@/application/models/user";
import authHeader from "@/services/auth-header";
import axios, { AxiosRequestHeaders } from "axios";

const getCourses = async () => {
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
  getCourses,
  getEnrolledCourses,
};
