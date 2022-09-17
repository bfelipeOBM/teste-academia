import { Message } from "@/application/models/message";

export const SET_MESSAGE = "SET_MESSAGE";
export const CLEAR_MESSAGE = "CLEAR_MESSAGE";

export interface MessageState {
  data: Message;
}
