import { createStore, applyMiddleware, Middleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { combinedReducer } from "./reducer";

const bindMiddleware = (middleware: Middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(middleware));
  }
  return compose(applyMiddleware(middleware));
};

export const store = createStore(
  combinedReducer,
  bindMiddleware(thunkMiddleware)
);
