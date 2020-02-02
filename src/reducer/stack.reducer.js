import { handleActions } from "redux-actions";

import { CREATE } from "/src/action/stack.action";
import { withPayload } from "/src/util/reducer.util";

import create from "./stack/create";

const initialState = {
  allStacks: {}
};

export default handleActions(
  {
    [CREATE]: withPayload(create)
  },
  initialState
);
