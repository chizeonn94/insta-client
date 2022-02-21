import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger"; //console.log 예쁘게 찍히게 하기위해
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";

export const middlewares = [thunk];
if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
