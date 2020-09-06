import { combineReducers } from "redux";
import common from "./common/reducer";

export const combinedReducer = combineReducers({
  common,
});
