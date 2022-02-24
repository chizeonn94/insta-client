import { combineReducers } from "redux";
import notificationReducer from "../reducers/notificationReducer";
import userReducer from "../reducers/userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  notifications: notificationReducer,
});

export default rootReducer;
