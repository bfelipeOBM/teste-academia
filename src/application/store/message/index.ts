import { Message } from "@/application/models/message";
import { Reducer } from "redux";
import { CLEAR_MESSAGE, MessageState, SET_MESSAGE } from "./types";

const initialState: MessageState = { data: {} as Message };

const reducer: Reducer<MessageState> = (
  state: MessageState = initialState,
  action
) => {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { data: payload };

    case CLEAR_MESSAGE:
      return { data: "" };

    default:
      return state;
  }
};

export default reducer;
