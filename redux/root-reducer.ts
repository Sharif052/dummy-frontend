import { combineReducers } from "redux";
import nasaImageReducer from "./nasa/reducer";

const combineReducer = combineReducers({
  nasaImageReducer
});
const rootReducer = (state:any, action:any) => {
  return combineReducer(state, action);
};
export default rootReducer;
