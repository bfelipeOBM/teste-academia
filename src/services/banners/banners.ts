import Constants from "@/application/common/Constants";
import axios from "axios";

const getBanners = async () => {
  const response = await axios.get(`${Constants.API_URL}banners/`);
  return response.data;
};

const getMobileBanners = async () => {
  const response = await axios.get(`${Constants.API_URL}banners/mobile/all`);
  return response.data;
};

export default {
  getBanners,
  getMobileBanners,
};
