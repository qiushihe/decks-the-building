import thunkMiddleware from "redux-thunk";

import appMiddleware from "./app";
import s3Middleware from "./s3";
import cardMiddleware from "./card";
import stackMiddleware from "./stack";
import laneMiddleware from "./lane";
import workspaceMiddleware from "./workspace";

export default () => [
  thunkMiddleware,
  ...appMiddleware,
  ...s3Middleware,
  ...cardMiddleware,
  ...stackMiddleware,
  ...laneMiddleware,
  ...workspaceMiddleware
];
