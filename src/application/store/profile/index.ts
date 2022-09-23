import { User } from "@/application/models/user";
import { Reducer } from "redux";
import {
  CLEAR_PROFILE,
  GET_PROFILE_FAIL,
  GET_PROFILE_SUCCESS,
  ProfileState,
} from "./types";

const initialState: ProfileState = {
  profile: {} as User,
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
        profile: null,
      };
    case CLEAR_PROFILE:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
