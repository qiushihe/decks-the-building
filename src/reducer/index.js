import { combineReducers } from "redux";

import s3 from "./s3.reducer";
import card from "./card.reducer";
import stack from "./stack.reducer";
import lane from "./lane.reducer";

export default () =>
  combineReducers({
    s3,
    card,
    stack,
    lane
  });
