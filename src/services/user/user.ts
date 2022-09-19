import axios from "axios";

const userInfo = async (userDocument: string) => {
  const response = await axios.get(
    `https://api-qa.4all.com/users/${userDocument}`
  );
  return response.data;
};

export default {
  userInfo,
};
