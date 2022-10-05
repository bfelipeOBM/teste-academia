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
    { data },
    {
      headers: authHeader() as AxiosRequestHeaders,
    }
  );
  return response.data;
};

const updatePhoto = async (image: string, { id }: User) => {
  const response = await axios.post(
    Constants.API_URL + `users/${id}/profile_image`,
    { image },
    {
      headers: {
        ...(authHeader() as AxiosRequestHeaders),
      },
    }
  );
  return response.data;
};

// const updatePhoto = async (image: string, { id }: User) => {
//   return new Promise((resolve, reject) => {
//     const data = JSON.stringify({ image });

//     const xhr = new XMLHttpRequest();
//     xhr.open("POST", `${Constants.API_URL}users/${id}/profile_image`);
//     xhr.setRequestHeader("Content-Type", "application/json");
//     xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
//     xhr.setRequestHeader("Authorization", authHeader().bearer as string);

//     xhr.send(data);

//     xhr.addEventListener("load", () => {
//       const response = JSON.parse(xhr.responseText);
//       resolve(response);
//     });
//     xhr.addEventListener("error", () => {
//       const error = JSON.parse(xhr.responseText);
//       reject(error);
//     });
//   });
// };

export default {
  userInfo,
  updateInfo,
  updatePhoto,
};
