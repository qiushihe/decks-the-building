import thunkMiddleware from "redux-thunk";

import laneMiddleware from "./lane";
import stackMiddleware from "./stack";

export default () => [thunkMiddleware, ...laneMiddleware, ...stackMiddleware];
