import { User } from "@/application/models/user";
import { Reducer } from "redux";
import {
  CLEAR_PROFILE,
  GET_PROFILE_FAIL,
  GET_PROFILE_SUCCESS,
  ProfileState,
  SET_PROFILE_PAGE,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_IMAGE_FAIL,
  UPDATE_PROFILE_IMAGE_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
} from "./types";

const initialState: ProfileState = {
  profile: {} as User,
  profilePage: "profile",
};

const reducer: Reducer<ProfileState> = (
  state: ProfileState = initialState,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload.data,
      };
    case GET_PROFILE_FAIL:
      return {
        ...state,
        profile: {},
      };
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload.data,
      };
    case UPDATE_PROFILE_FAIL:
      return {
        ...state,
        profile: {},
      };
    case UPDATE_PROFILE_IMAGE_SUCCESS:
      return {
        ...state,
        profile: {
          ...state.profile,
          profile_image: payload.data.profile_image,
        },
      };
    case UPDATE_PROFILE_IMAGE_FAIL:
      return {
        ...state,
        profile: { ...state.profile, profile_image: null },
      };
    case SET_PROFILE_PAGE:
      return {
        ...state,
        profilePage: payload.page,
      };
    case CLEAR_PROFILE:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
