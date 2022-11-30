import { User } from "@/application/models/user";

export const GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS";
export const GET_PROFILE_FAIL = "GET_PROFILE_FAIL";
export const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
export const UPDATE_PROFILE_FAIL = "UPDATE_PROFILE_FAIL";
export const UPDATE_PROFILE_IMAGE_SUCCESS = "UPDATE_PROFILE_IMAGE_SUCCESS";
export const UPDATE_PROFILE_IMAGE_FAIL = "UPDATE_PROFILE_IMAGE_FAIL";
export const SET_PROFILE_PAGE = "SET_PROFILE_PAGE";
export const CLEAR_PROFILE = "CLEAR_PROFILE";

export interface ProfileState {
  profile: User;
  profilePage: string;
}
