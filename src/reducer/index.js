import { combineReducers } from "redux";

import card from "./card.reducer";

export default () =>
  combineReducers({
    card
  });
