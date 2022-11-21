import { AnyAction, applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import { BannersState } from "./banners/types";
import { CertificatesState } from "./certificates/types";
import { ClassState } from "./classes/types";
import { CoursesState } from "./courses/types";
import { MessageState } from "./message/types";
import { ProfileState } from "./profile/types";
import rootReducer from "./rootReducer";
import { UserState } from "./user/types";

const middleware = [thunk];

const persistConfig = {
  key: "root",
  storage,
};
export interface ApplicationState {
  message: MessageState;
  user: UserState;
  profile: ProfileState;
  courses: CoursesState;
  mycourses: CoursesState;
  course: CoursesState;
  classes: ClassState;
  myclasses: ClassState;
  courses_locations: CoursesState;
  banners: BannersState;
  featured_courses: CoursesState;
  certificates: CertificatesState;
}

export type RootReducer = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer<RootReducer, AnyAction>(
  persistConfig,
  rootReducer
);

const store: Store<ApplicationState> = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

const persistor = persistStore(store);

export { store, persistor };
