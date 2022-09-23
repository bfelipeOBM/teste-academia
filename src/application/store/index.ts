import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { MessageState } from "./message/types";
import { ProfileState } from "./profile/types";
import rootReducers from "./rootReducers";
import { UserState } from "./user/types";

const middleware = [thunk];

export interface ApplicationState {
  message: MessageState;
  user: UserState;
  profile: ProfileState;
}

const store: Store<ApplicationState> = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;