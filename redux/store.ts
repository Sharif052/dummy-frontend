import { createStore, applyMiddleware } from "redux";
import rootReducer from "./root-reducer";

const initialState = {};

const middleware: any = [];

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

export default store;
