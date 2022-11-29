import { Banner } from "@/application/models/banner";

export const GET_BANNERS_SUCCESS = "GET_BANNERS_SUCCESS";
export const GET_BANNERS_FAIL = "GET_BANNERS_FAIL";
export const GET_MOBILE_BANNERS_SUCCESS = "GET_MOBILE_BANNERS_SUCCESS";
export const GET_MOBILE_BANNERS_FAIL = "GET_MOBILE_BANNERS_FAIL";
export const CLEAR_BANNERS = "CLEAR_BANNERS";

export interface BannersState {
  banners: Banner[];
  mobilebanners: Banner[];
}
