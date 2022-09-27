import { User } from "@/application/models/user";

export const GET_PROFILE_SUCCESS = "REGISTER_SUCCESS";
export const GET_PROFILE_FAIL = "REGISTER_FAIL";
export const CLEAR_PROFILE = "CLEAR_PROFILE";

export interface ProfileState {
  profile: User;
}
