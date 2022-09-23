import Constants from "@/application/common/Constants";
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

export default {
  userInfo,
};
