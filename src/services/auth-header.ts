import { User } from "@/application/models/user";

export default function authHeader() {
  const user: User = JSON.parse(localStorage.getItem("user")!);

  if (user?.access_token) {
    return { Authorization: "Bearer " + user.access_token };
  } else {
    return {};
  }
}
