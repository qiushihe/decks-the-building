import thunkMiddleware from "redux-thunk";

import cardMiddleware from "./card";
import laneMiddleware from "./lane";
import stackMiddleware from "./stack";

export default () => [
  thunkMiddleware,
  ...cardMiddleware,
  ...laneMiddleware,
  ...stackMiddleware
];
