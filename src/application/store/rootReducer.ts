import { combineReducers } from "redux";
import { default as classes, default as myclasses } from "./classes";
import {
  default as course,
  default as courses,
  default as mycourses,
} from "./courses";
import message from "./message";
import profile from "./profile";
import user from "./user";

export default combineReducers({
  message,
  user,
  profile,
  courses,
  mycourses,
  course,
  classes,
  myclasses,
});
