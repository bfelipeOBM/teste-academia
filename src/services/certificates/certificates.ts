import Constants from "@/application/common/Constants";
import authHeader from "@/services/auth-header";
import axios, { AxiosRequestHeaders } from "axios";

const getCertificates = async (userId: number) => {
  const response = await axios.get(
    `${Constants.API_URL}users/${userId}/certificates/`,
    {
      headers: authHeader() as AxiosRequestHeaders,
    }
  );
  return response.data;
};

export default {
  getCertificates,
};
