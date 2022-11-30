import { combineReducers } from "redux";
import { default as banners, default as mobilebanners } from "./banners";
import certificates from "./certificates";
import { default as classes, default as myclasses } from "./classes";
import {
  default as course,
  default as courses,
  default as courses_locations,
  default as featured_courses,
  default as mycourses,
} from "./courses";
import globalfilter from "./globalfilter";
import message from "./message";
import { default as profile, default as profilePage } from "./profile";
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
  globalfilter,
  mobilebanners,
  profilePage,
});
