import { User, UserLogin } from "@/application/models/user";
import axios from "axios";
import Constants from "../application/common/Constants";

const API_URL = Constants.API_URL;

const register = async (userData: User) => {
  const response = await axios.post(API_URL + "users/", {
    userData,
  });
  if (response.data.access_token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (login: UserLogin) => {
  const response = await axios.post(API_URL + "auth/", login);
  if (response.data.access_token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
