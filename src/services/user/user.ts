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

// const updatePhoto = async (image: string, { id }: User) => {
//   const response = await axios.post(
//     Constants.API_URL + `users/${id}/profile_image`,
//     { image },
//     {
//       headers: {
//         ...(authHeader() as AxiosRequestHeaders),
//         "Access-Control-Allow-Origin": "*",
//       },
//     }
//   );
//   return response.data;
// };


const updatePhoto = async (image: string, { id }: User) => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({ image });

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${Constants.API_URL}users/${id}/profile_image`);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Bearer", authHeader().bearer as string)

    xhr.send(data);

    setTimeout(() => {
      xhr.addEventListener("readystatechange", function () {
        if (this.status === 201) {
          const response = JSON.parse(xhr.responseText);
          resolve(response);
        } else {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        }
      });
    }, 1000);
  });
};


export default {
  userInfo,
  updateInfo,
  updatePhoto,
};
