import { AccessToken } from "@/application/models/user";

export default function authHeader() {
  const { access_token }: AccessToken = JSON.parse(
    localStorage.getItem("accessToken")!
  );

  if (access_token) {
    return {
      bearer: access_token,
    };
  } else {
    return {};
  }
}
