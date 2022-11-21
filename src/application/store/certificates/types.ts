import { Certificate } from "@/application/models/certificate";

export const GET_CERTIFICATES_SUCCESS = "GET_CERTIFICATES_SUCCESS";
export const GET_CERTIFICATES_FAIL = "GET_CERTIFICATES_FAIL";
export const CLEAR_CERTIFICATES = "CLEAR_CERTIFICATES";

export interface CertificatesState {
  certificates: Certificate[];
}
