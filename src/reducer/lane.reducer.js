import { handleActions } from "redux-actions";

import { CREATE } from "/src/action/lane.action";
import { withPayload } from "/src/util/reducer.util";

import create from "./lane/create";

const initialState = {
  allLanes: {}
};

export default handleActions(
  {
    [CREATE]: withPayload(create)
  },
  initialState
);
