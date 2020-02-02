import { combineReducers } from "redux";

import card from "./card.reducer";
import stack from "./stack.reducer";
import lane from "./lane.reducer";

export default () =>
  combineReducers({
    card,
    stack,
    lane
  });
