import thunkMiddleware from "redux-thunk";

import appMiddleware from "./app";
import s3Middleware from "./s3";
import cardMiddleware from "./card";
import laneMiddleware from "./lane";
import stackMiddleware from "./stack";

export default () => [
  thunkMiddleware,
  ...appMiddleware,
  ...s3Middleware,
  ...cardMiddleware,
  ...laneMiddleware,
  ...stackMiddleware
];
