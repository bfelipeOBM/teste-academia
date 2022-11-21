import { SET_MESSAGE } from "@/application/store/message/types";
import CertificatesService from "@/services/certificates/certificates";
import { Dispatch } from "redux";
import {
  CLEAR_CERTIFICATES,
  GET_CERTIFICATES_FAIL,
  GET_CERTIFICATES_SUCCESS,
} from "./types";

export const getCertificates = (userId: number) => (dispatch: Dispatch) => {
  return CertificatesService.getCertificates(userId).then(
    (data) => {
      dispatch({
        type: GET_CERTIFICATES_SUCCESS,
        payload: { data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        error?.response?.data || error.message || error.toString();

      dispatch({
        type: GET_CERTIFICATES_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const clearCertificates = () => (dispatch: Dispatch) => {
  dispatch({
    type: CLEAR_CERTIFICATES,
  });
};
