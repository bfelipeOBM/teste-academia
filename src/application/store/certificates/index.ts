import { Certificate } from "@/application/models/certificate";
import { Reducer } from "redux";
import {
  CertificatesState,
  CLEAR_CERTIFICATES,
  GET_CERTIFICATES_FAIL,
  GET_CERTIFICATES_SUCCESS,
} from "./types";

const initialState: CertificatesState = {
  certificates: [] as Certificate[],
};

const reducer: Reducer<CertificatesState> = (
  state: CertificatesState = initialState,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CERTIFICATES_SUCCESS:
      return {
        ...state,
        certificates: payload.data,
      };
    case GET_CERTIFICATES_FAIL:
      return {
        ...state,
        certificates: [],
      };
    case CLEAR_CERTIFICATES:
      return initialState;

    default:
      return state;
  }
};

export default reducer;
