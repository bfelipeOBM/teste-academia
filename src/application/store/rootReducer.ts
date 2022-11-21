import { combineReducers } from "redux";
import banners from "./banners";
import certificates from "./certificates";
import { default as classes, default as myclasses } from "./classes";
import {
  default as course,
  default as courses,
  default as courses_locations,
  default as featured_courses,
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
  courses_locations,
  banners,
  featured_courses,
  certificates,
});
