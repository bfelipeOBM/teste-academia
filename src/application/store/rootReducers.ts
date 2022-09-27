import { combineReducers } from "redux";
import message from "./message";
import profile from "./profile";
import user from "./user";

export default combineReducers({
  message,
  user,
  profile,
});
