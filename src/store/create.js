import { createStore, applyMiddleware, compose } from "redux";

import rootReducer from "/src/reducer";
import createMiddleware from "/src/middleware/create";

import DevTools from "./dev-tools";

const createStoreWithMiddleware = () =>
  compose(
    applyMiddleware.apply(null, createMiddleware()),
    DevTools.instrument()
  )(createStore);

export default (initialState = {}) =>
  createStoreWithMiddleware()(rootReducer(), initialState);
