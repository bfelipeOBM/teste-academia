import Constants from "@/application/common/Constants";
import { User } from "@/application/models/user";
import authHeader from "@/services/auth-header";
import axios, { AxiosRequestHeaders } from "axios";

const userInfo = async () => {
  const response = await axios.post(
    Constants.API_URL + "auth/token",
    {},
    {
      headers: authHeader() as AxiosRequestHeaders,
    }
  );
  return response.data;
};

const updateInfo = async (data: User) => {
  const response = await axios.patch(
    Constants.API_URL + "users/" + data.id,
    data,
    {
      headers: authHeader() as AxiosRequestHeaders,
    }
  );
  return response.data[0];
};

const updatePhoto = async (image: string, { id }: User) => {
  const response = await axios.post(
    Constants.API_URL + `users/${id}/profile_image`,
    { image },
    {
      headers: {
        ...(authHeader() as AxiosRequestHeaders),
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
  return response.data;
};

export default {
  userInfo,
  updateInfo,
  updatePhoto,
};
